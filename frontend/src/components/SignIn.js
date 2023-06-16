import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "./BackButton";

function SignIn() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickSignIn = () => {
    console.log("click SignIn");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post("API", null, {
        params: {
          user_id: inputId,
          user_pw: inputPw,
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
        } else if (res.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
      })
      .catch();
  };

  // useEffect(() => {
  //   axios
  //     .get("/user_inform/SignIn")
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  return (
    <div className="signin">
      <BackButton />
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
          value={inputId}
          onChange={handleInputId}
          placeholder="아이디"
        />

        <input
          className="signin-pw"
          type="password"
          value={inputPw}
          onChange={handleInputPw}
          placeholder="비밀번호"
        />
      </div>

      <div className="signin-submit">
        <button type="button" onClick={onClickSignIn}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default SignIn;
