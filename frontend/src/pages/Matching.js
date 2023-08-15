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
  const [matchingFailed, setMatchingFailed] = useState(false);
  const [roomPk, setRoomPk] = useState(null);

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
          console.log(data);
          console.log(data.type);

          if (data.type === 'matching_completed') {
            setMatchingComplete(true);
            setMatchedUsers(data.nickname.split(', ').map((nickname) => `${nickname}님`));
            setRoomPk(data.roomPk);
            stompClient.deactivate();
            console.log('매칭 완료 및 소켓 연결 해제');
          } else if (data.type === 'matching_failed' && data.nickname === nickname) {
            setMatchingFailed(true);
          }
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

    return () => {
      stompClient.deactivate();
    };
  }, [nickname]); // useEffect dependency에 nickname 추가

  return (
    <div>
      <MyHeader
        headText={'매칭 중'}
        leftChild={
          <MyButton
            text={'뒤로가기'}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <h1 className="mt-10 text-2xl font-bold text-center">
        {matchingComplete ? (
          <>
            {matchedUsers.join(', ')}과
            <br />
            매칭이 완료되었습니다.
          </>
        ) : matchingFailed ? (
          <>
            매칭에 실패하였습니다. <br />
            다시 시도해주십시오.
          </>
        ) : (
          <>
            매칭 중입니다.
            <br />
            5분 정도 소요될 수 있습니다.
          </>
        )}
      </h1>
      <div className="flex justify-center mt-5">
        {matchingFailed ? (
          <MyButton
            text="같이 먹자 페이지로 이동하기"
            onClick={() => {
              navigate('/LetsEat');
            }}
          />
        ) : (
          <MyButton
            text={matchingComplete ? '채팅 방으로 이동' : '매칭 취소'}
            onClick={() => {
              if (matchingComplete) {
                navigate(`http://127.0.0.1:8000/chat/${roomPk}/matching_chat/`);
              } else {
                navigate(-1);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Matching;
