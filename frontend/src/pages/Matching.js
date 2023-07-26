import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import MyContext from '../components/MyContext';

const Matching = () => {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]); // 백에서주는 매칭유저 정보? 배열로 받음
  const [matchedCount, setMatchedCount] = useState(0); // 매칭된 사용자 수
  const [socket, setSocket] = useState(null);
  const [matchingLimit, setMatchingLimit] = useState(5);
  const { people } = useContext(MyContext);

  useEffect(() => {
    // 백엔드와 소켓 연결 설정
    const newSocket = io('localhost:8080');

    // 연결 성공 시 이벤트 핸들러
    newSocket.on('connect', () => {
      console.log('소켓 연결 성공');
    });

    // 백엔드에서 매칭 정보를 받아오는 이벤트 핸들러
    newSocket.on('matchingData', (data) => {
      setMatchedUsers(data);
      setMatchedCount(data.length);
    });

    // 연결 해제 시 이벤트 핸들러
    newSocket.on('disconnect', () => {
      console.log('소켓 연결 해제');
    });

    setSocket(newSocket);

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // 일정한 간격으로 백엔드에 요청 보내기
    const interval = setInterval(() => {
      if (socket) {
        socket.emit('requestMatchingData');
      }
    }, 5000); // 5초마다 요청 보냄

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 요청 간격 해제
    };
  }, [socket]);

  useEffect(() => {
    if (people === '2') {
      setMatchingLimit(2);
    } else if (people === '3') {
      setMatchingLimit(3);
    } else if (people === '4') {
      setMatchingLimit(4);
    } else {
      setMatchingLimit(5); //아 상관없음은 또 어떻게 해야하냐 미친~
    }
  }, [people]);

  useEffect(() => {
    if (matchedUsers.length === matchingLimit) {
      alert('매칭이 완료되었습니다.');
      setTimeout(() => {
        navigate('/ChatList');
      }, 2000); // 2초 후에 페이지 이동
    }
  }, [matchedUsers, matchingLimit, navigate]);

  // useEffect(() => {
  //   // 테스트용 더미 데이터 생성
  //   const dummyData = [
  //     { id: 1, name: 'User 1' },
  //     { id: 2, name: 'User 2' },
  //     { id: 3, name: 'User 3' },
  //     { id: 4, name: 'User 4' },
  //     // { id: 5, name: 'User 5' },
  //   ];

  //   setMatchedUsers(dummyData);
  //   setMatchedCount(dummyData.length);
  // }, []);

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
      <h1>매칭 결과</h1>
      <p>매칭된 사용자 수: {matchedCount}</p>

      {/* 회색 동그라미를 보여주는 부분 */}
      <div>
        {Array.from({ length: matchingLimit }, (_, index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: index < matchedCount ? 'orange' : 'gray',
              margin: '5px',
            }}
          ></div>
        ))}
      </div>

      {/* 매칭된 사용자 목록을 보여주는 부분 */}
      <ul>
        {matchedUsers.map((user) => (
          <li key={user.id}>{user.name}</li> // 이부분 우리거에 맞게 수정해야 될듯?
        ))}
      </ul>
    </div>
  );
};

export default Matching;
