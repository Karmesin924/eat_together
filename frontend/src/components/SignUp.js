import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  // 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 오류메세지 상태 저장
  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isname, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      setIsId(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  const onClickSignUp = () => {
    axios.post(
      "API",
      {
        user_id: id,
        user_email: email,
        user_password: password,
        user_name: name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <>
      <h3>회원가입</h3>
      <div className="form">
        <div className="form-el">
          <label htmlFor="id">아이디</label> <br />
          <input id="id" name="id" value={id} onChange={onChangeId} />
          <p className="message"> {idMessage} </p>
        </div>
        <div className="form-el">
          <label htmlFor="email">이메일</label> <br />
          <input
            id="email"
            name="name"
            value={email}
            onChange={onChangeEmail}
          />
          <p className="message">{emailMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="name">닉네임</label> <br />
          <input id="name" name="name" value={name} onChange={onChangeName} />
          <p className="message">{nameMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="password">비밀번호</label> <br />
          <input
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          <p className="message">{passwordMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="passwordConfirm">비밀번호 확인</label> <br />
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <p className="message">{passwordConfirmMessage}</p>
        </div>

        <br />
        <br />
        <button type="submit" onClick={onClickSignUp}>
          가입하기
        </button>
      </div>
    </>
  );
};

export default SignUp;
