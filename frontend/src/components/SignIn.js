import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "./BackButton";
import MyHeader from "./MyHeader";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const navigate = useNavigate();

  const handleinputEmail = (e) => {
    setinputEmail(e.target.value);
  };

  const handleinputPassword = (e) => {
    setinputPassword(e.target.value);
  };

  const onClickSignIn = (e) => {
    e.preventDefault();
    try {
      const data = { email: inputEmail, password: inputPassword };
      console.log("click SignIn");
      console.log("ID : ", inputEmail);
      console.log("PW : ", inputPassword);
      axios
        .post("API", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          console.log("res.data.userId :: ", res.data.userId);
          console.log("res.data.msg :: ", res.data.msg);
          if (res.data.userId === undefined) {
            // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            console.log("======================", res.data.msg);
            alert("입력하신 id 가 일치하지 않습니다.");
          } else if (res.data.userId === null) {
            // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
            console.log(
              "======================",
              "입력하신 비밀번호 가 일치하지 않습니다."
            );
            alert("입력하신 비밀번호 가 일치하지 않습니다.");
          } else if (res.data.userId === inputEmail) {
            // id, pw 모두 일치 userId = userId1, msg = undefined
            console.log("======================", "로그인 성공");
            sessionStorage.setItem("user_id", inputEmail);
          }
          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = "/";
        })
        .catch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signin">
      <MyHeader headText={"같이 먹자"} leftChild={<BackButton />} />
      <div className="signin-together">
        같이
        <br />
        먹자
      </div>
      <div className="signin-together2">외로운 혼밥러들을 위해</div>

      <div className="signin-forms">
        <input
          className="signin-id"
          type="text"
          value={inputEmail}
          onChange={handleinputEmail}
          placeholder="이메일"
        />

        <input
          className="signin-pw"
          type="password"
          value={inputPassword}
          onChange={handleinputPassword}
          placeholder="비밀번호"
        />
      </div>

      <div className="signin-submit">
        <button type="button" onClick={onClickSignIn}>
          로그인
        </button>
      </div>

      <p
        onClick={() => {
          navigate("/SignUp");
        }}
      >
        회원 가입
      </p>
      <p>비밀번호를 잊어버리셨나요?</p>
      <button>카카오로그인</button>
      <button>네이버로그인</button>
    </div>
  );
}

export default SignIn;
