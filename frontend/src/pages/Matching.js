import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import MyContext from '../components/MyContext';
import { useContext } from 'react';
import SockJS from 'sockjs-client';

const Matching = () => {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [roomPk, setRoomPk] = useState(null);
  const [isUserInList, setIsUserInList] = useState(false);
  const [matchingFailed, setMatchingFailed] = useState(false);
  const { nickname, people, gender, age, menu, startTime, conversation, latitude, longitude } = useContext(MyContext);

  const newFilters = {
    type: 'matching_start',
    people,
    gender,
    age,
    menu,
    conversation,
    latitude,
    longitude,
    startTime,
    nickname,
  };

  // 페이지 이탈 시 경고 이벤트 : beforeunload
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '매칭이 취소 됩니다. 정말로 이 페이지를 떠나시겠습니까?';
  };

  // 뒤로 가기 버튼을 눌렀을 시 beforeunload 이벤트
  const handleGoBack = () => {
    const isConfirmed = window.confirm('매칭이 취소됩니다. 이 페이지에서 나가시겠습니까?');
    if (isConfirmed) {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      navigate('/LetsEat');
    }
  };

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected:', frame);

      stompClient.subscribe('/topic/matching/start', (message) => {
        try {
          const data = JSON.parse(message.body);

          if (data.type === 'matching_completed') {
            setMatchingComplete(true);
            setMatchedUsers(data.nickname);
            setRoomPk(data.roomPk);
            setIsUserInList(data.nickname.includes(nickname));
            stompClient.deactivate();
            console.log('매칭 완료 및 소켓 연결 해제');
          } else if (data.type === 'matching_failed' && data.nickname === nickname) {
            setMatchingFailed(true);
            stompClient.deactivate();
            console.log('매칭 실패 및 소켓 연결 해제');
          } else if (data.type === 'matching_already_exist' && data.nickname === nickname) {
            alert('이미 매칭 중입니다');
          }
          console.log('이미 매칭 중');
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      stompClient.publish({
        destination: '/app/matching/start',
        body: JSON.stringify(newFilters),
      });
    };

    stompClient.activate();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      stompClient.deactivate();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleCancelMatching = () => {
    const isConfirmed = window.confirm('매칭을 취소하시겠습니까?');
    if (isConfirmed) {
      const cancelData = {
        type: 'matching_cancelled',
        nickname,
      };

      const stompClient = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
      });

      stompClient.onConnect = () => {
        stompClient.publish({
          destination: '/app/matching/start',
          body: JSON.stringify(cancelData),
        });
        stompClient.deactivate();
      };

      stompClient.activate();

      navigate('/LetsEat');
    }
  };

  return (
    <div>
      <MyHeader headText={'매칭 중'} leftChild={<MyButton text={'뒤로가기'} onClick={handleGoBack} />} />

      {matchingComplete && isUserInList ? (
        <MatchComplete matchedUsers={matchedUsers} roomPk={roomPk} />
      ) : matchingFailed ? (
        <MatchFailed />
      ) : (
        <>
          <Loading />
          <div className="flex justify-center mt-5">
            <MyButton text="매칭 취소" onClick={handleCancelMatching} />
          </div>
        </>
      )}
    </div>
  );
};

const MatchComplete = ({ matchedUsers, roomPk }) => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mt-10 text-2xl font-bold text-center">
        {matchedUsers.length > 0 ? `${matchedUsers.join(', ')}과 매칭이 완료되었습니다.` : '매칭이 완료되었습니다.'}
      </h1>
      <div className="flex justify-center mt-5">
        <MyButton
          text="채팅 방으로 이동"
          onClick={() => {
            navigate(`/chat/${roomPk}/matching_chat/`);
          }}
        />
      </div>
    </>
  );
};

const Loading = () => (
  <h1 className="mt-10 text-2xl font-bold text-center">
    매칭 중입니다.
    <br />
    5분 정도 소요될 수 있습니다.
  </h1>
);

const MatchFailed = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mt-10 text-2xl font-bold text-center">
        매칭에 실패하였습니다.
        <br />
        다시 시도해 주세요.
      </h1>
      <div className="flex justify-center mt-5">
        <MyButton
          text="같이먹자로 이동"
          onClick={() => {
            navigate('/LetsEat');
          }}
        />
      </div>
    </>
  );
};

export default Matching;
