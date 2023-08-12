import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import MyContext from '../components/MyContext';
import { useContext } from 'react';
import SockJS from 'sockjs-client';
import { type } from '@testing-library/user-event/dist/type';

const Matching = () => {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [matchingComplete, setMatchingComplete] = useState(false);
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
          console.log(data.roomPk)

          if (data.type == 'matching_completed') {
            setMatchingComplete(true);
            setMatchedUsers(data.nickname.map((name) => `${name}님`));
            setRoomPk(data.roomPk);
            stompClient.deactivate();
            console.log('매칭 완료 및 소켓 연결 해제');
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
  }, []);

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
          `${matchedUsers.join(', ')}과 매칭이 완료되었습니다.`
        ) : (
          <>
            매칭 중입니다.
            <br />
            5분 정도 소요될 수 있습니다.
          </>
        )}
      </h1>
      <div className="flex justify-center mt-5">
      <MyButton
        text={matchingComplete ? '채팅 방으로 이동' : '매칭 취소'}
        onClick={() => {
          if (matchingComplete) {
          window.location.href = `http://127.0.0.1:8000/chat/${roomPk}/matching_chat/`;
    } else {
      navigate(-1);
    }
  }}
/>
      </div>
    </div>
  );
};

export default Matching;