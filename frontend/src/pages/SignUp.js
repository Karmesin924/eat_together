import axios from "axios";
import React, { useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const checkButtonEnabled = () => {
    if (
      isName &&
      isEmail &&
      isBirth &&
      isNickname &&
      isPassword &&
      isPasswordConfirm
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요");
      setIsName(false);
    } else {
      setNameMessage("올바른 형식입니다");
      setIsName(true);
    }

    checkButtonEnabled();
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일입니다");
      setIsEmail(true);
    }

    checkButtonEnabled();
  };

  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);

    if (!currentBirth) {
      setBirthMessage("생년월일을 선택해주세요");
      setIsBirth(false);
    } else {
      setIsBirth(true);
    }

    checkButtonEnabled();
  };

  const onChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if (currentNickname.length < 2 || currentNickname.length > 5) {
      setNicknameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요");
      setIsNickname(false);
    } else {
      setNicknameMessage("올바른 형식입니다");
      setIsNickname(true);
    }

    checkButtonEnabled();
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if (currentPassword.length < 6) {
      setPasswordMessage("비밀번호는 6자리 이상으로 입력해주세요");
      setIsPassword(false);
    } else {
      setPasswordMessage("올바른 형식입니다");
      setIsPassword(true);
    }

    checkButtonEnabled();
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    if (currentPasswordConfirm !== password) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다");
      setIsPasswordConfirm(true);
    }

    checkButtonEnabled();
  };

  const onClickSignUp = () => {
    const userData = {
      name: name,
      email: email,
      nickname: nickname,
      date: birth,
      password: password,
    };

    axios
      .post("/users/signup", userData, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        alert("회원가입이 완료되었습니다.");
        navigate("/SignIn"); // 가입 성공 시 이동할 경로를 설정해주세요
      })
      .catch((error) => {
        alert("오류로 인해 회원가입이 완료되지 않았습니다.");
        console.error(error);
      });
  };

  return (
    <div className="signup">
      <MyHeader
        headText={"회원가입"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div className="signup-container">
        <div className="signup-form">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={name} onChange={onChangeName} />
          <span className="message">{nameMessage}</span>

          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={onChangeEmail}
          />
          <span className="message">{emailMessage}</span>

          <label htmlFor="birth">생년월일</label>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={onChangeBirth}
          />
          <span className="message">{birthMessage}</span>

          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={onChangeNickname}
          />
          <span className="message">{nicknameMessage}</span>

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
          <span className="message">{passwordMessage}</span>

          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <span className="message">{passwordConfirmMessage}</span>

          <MyButton
            text="가입하기"
            onClick={onClickSignUp}
            disabled={!isButtonEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
