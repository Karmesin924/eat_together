import React, { useState } from "react";
import axios from "axios";
import MyHeader from "../components/MyHeader";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";

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
        .post("/users/login", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);

          if (res.status === 404) {
            console.log("======================", res.data.msg);
            alert("입력하신 이메일과 비밀번호가 일치하지 않습니다.");
          } else if (res.status === 200) {
            console.log("======================", "로그인 성공");
            alert("로그인 성공!");
            navigate("/MyPage");
          }
          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = "/";
        })
        .catch((ex) => {
          alert("로그인 요청이 실패했습니다.");
          console.log("login request fail: " + ex);
        })
        .finally(() => console.log("login request end"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <MyHeader
        headText={"로그인"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate("/");
            }}
          />
        }
      />
      <div className=" pt-8 pb-3 text-6xl text-center">
        같이
        <span className=" leading-normal">
          <br />
        </span>
        먹자
      </div>
      <div className=" mt-3 h-14 text-center text-lg font-normal">
        외로운 혼밥러들을 위해
      </div>
      <div className="flex flex-col justify-center items-center clear-both">
        <input
          className=" mt-1 mb-3 w-80 h-10 pl-3 text-base border-buttonhover border-4 border-solid rounded-xl placeholder:text-base focus:border-project focus:text-inputfocus outline-none"
          type="text"
          value={inputEmail}
          onChange={handleinputEmail}
          placeholder="이메일"
        />

        <input
          className=" mt-3 mb-3 w-80 h-10 pl-3 text-base border-buttonhover border-4 border-solid rounded-xl placeholder:text-base focus:border-project focus:text-inputfocus outline-none"
          type="password"
          value={inputPassword}
          onChange={handleinputPassword}
          placeholder="비밀번호"
        />
      </div>

      <div className="flex m-auto mt-3 w-80 h-10">
        <button
          className=" pl-2 pr-2 pt-2 pb-2 w-full bg-project text-white rounded-xl cursor-pointer hover:bg-buttonhover hover:text-buttonhovercolor hover:font-bold"
          onClick={onClickSignIn}
        >
          로그인
        </button>
      </div>
      <div className="m-auto mt-11 mb-8 text-projectthick text-base font-semibold cursor-pointer">
        <p
          className="pb-3"
          onClick={() => {
            navigate("/SignUp");
          }}
        >
          회원 가입
        </p>
        <p>비밀번호를 잊어버리셨나요?</p>
      </div>
      <div className="flex m-auto">
        <MyButton text={"카카오로그인"} onClick={() => {}} />
        <span className="pl-2"></span>
        <MyButton text={"네이버로그인"} onClick={() => {}} />
      </div>
    </div>
  );
}

export default SignIn;
