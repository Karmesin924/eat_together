import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // useEffect(() => {
  //   let isMounted = true;
  //   const source = axios.CancelToken.source();

  //   axios
  //     .get("/users/validate", { cancelToken: source.token })
  //     .then((res) => {
  //       if (isMounted && res.status !== 404) {
  //         const {
  //           name: userName,
  //           email: userEmail,
  //           nickname: userNickname,
  //         } = res.data;
  //         setName(userName);
  //         setEmail(userEmail);
  //         setNickname(userNickname);
  //       }
  //     })
  //     .catch((error) => {
  //       if (axios.isCancel(error)) {
  //         // Request was canceled
  //         return;
  //       }
  //       console.log("Failed to validate user:", error);
  //       alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
  //       navigate("/SignIn");
  //     });

  //   return () => {
  //     isMounted = false;
  //     source.cancel("Request canceled");
  //   };
  // }, [navigate]);

  useEffect(() => {
    // 더미 데이터 생성
    const dummyData = {
      name: "John Doe",
      email: "johndoe@example.com",
      nickname: "johndoe123",
    };

    // 더미 데이터 설정
    setName(dummyData.name);
    setEmail(dummyData.email);
    setNickname(dummyData.nickname);
  }, []);

  const onClickLogout = () => {
    axios
      .post("/users/logout", null, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        alert("로그아웃 되었습니다.");
        navigate("/SignIn"); // 로그아웃 성공 시 이동할 경로를 설정해주세요
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const onClickLogout = () => { // 로그아웃 시뮬레이션
  //   console.log("로그아웃 요청");

  //   // 로그아웃 성공 시 수행될 동작
  //   const handleLogoutSuccess = () => {
  //     console.log("로그아웃 성공");
  //     alert("로그아웃 되었습니다.");
  //     navigate("/SignIn"); // 로그아웃 성공 시 이동할 경로를 설정해주세요
  //   };

  //   // 로그아웃 요청을 시뮬레이션하기 위한 딜레이
  //   setTimeout(() => {
  //     handleLogoutSuccess();
  //   }, 2000);
  // };

  return (
    <div>
      <MyHeader
        headText={"마이페이지"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate("/");
            }}
          />
        }
      />
      <div className="title-ex">내 프로필</div>
      <div>
        <h4>이름</h4>
        {name}
      </div>
      <div>
        <h4>이메일</h4>
        {email}
      </div>
      <div>
        <h4>닉네임</h4>
        {nickname}
      </div>
      <div className="title-ex">기타 및 설정</div>
      <div>이용 약관</div>

      <br />
      <MyButton text={"로그아웃"} onClick={onClickLogout} />
    </div>
  );
};

export default MyPage;
