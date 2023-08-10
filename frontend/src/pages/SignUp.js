import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
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
  const [gender, setGender] = useState("");
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

  const checkButtonEnabled = useCallback(() => {
    if (
      isName &&
      isEmail &&
      isBirth &&
      isNickname &&
      isPassword &&
      isPasswordConfirm &&
      gender !== ""
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [
    isName,
    isEmail,
    isBirth,
    isNickname,
    isPassword,
    isPasswordConfirm,
    gender,
  ]);

  useEffect(() => {
    checkButtonEnabled();
  }, [checkButtonEnabled]);

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

    const hangulConsonantVowelRegExp = /^[ㄱ-ㅎㅏ-ㅣ]+$/;

    if (currentNickname.length < 2 || currentNickname.length > 8) {
      setNicknameMessage("닉네임은 2글자 이상 8글자 이하로 입력해주세요");
      setIsNickname(false);
    } else if (hangulConsonantVowelRegExp.test(currentNickname)) {
      setNicknameMessage("닉네임에 한글 자음 또는 모음만을 사용할 수 없습니다");
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

      if (currentPassword === passwordConfirm) {
        setIsPasswordConfirm(true);
      } else {
        setIsPasswordConfirm(false);
      }
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

  const onChangeGender = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    checkButtonEnabled();
  };

  const onClickSignUp = () => {
    const userData = {
      name: name,
      email: email,
      gender: gender,
      nickname: nickname,
      birthDate: birth,
      password: password,
    };

    axios
      .post("/users/signup", userData, { withCredentials: true })
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/SignIn");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          let errorMessage = "";

          // 이메일 중복 체크
          if (error.response.data === "email") {
            errorMessage +=
              "이메일이 중복되었습니다. 다른 이메일로 회원가입해주세요!";
          }

          // 닉네임 중복 체크
          if (error.response.data === "nickname") {
            errorMessage +=
              "닉네임이 중복되었습니다. 다른 닉네임으로 회원가입해주세요!";
          }

          alert(errorMessage);
        } else {
          alert("오류로 인해 회원가입이 완료되지 않았습니다.");
        }
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
      <div className="p-5 m-0">
        <div className="flex flex-col gap-4 max-w-md mt-0 m-auto">
          <label className="text-xl font-bold" htmlFor="name">
            이름
          </label>
          <input
            className="border-2 border-gray-400 rounded-md h-9 pl-3 focus:border-project focus:font-bold outline-none"
            type="text"
            id="name"
            value={name}
            onChange={onChangeName}
          />
          <span className="text-sm font-semibold text-signupmessage">
            {nameMessage}
          </span>

          <label className="text-xl font-bold" htmlFor="email">
            이메일
          </label>
          <input
            className="border-2 border-gray-400 rounded-md h-9 pl-3 focus:border-project focus:font-bold outline-none"
            type="text"
            id="email"
            value={email}
            onChange={onChangeEmail}
          />
          <span className="text-sm font-semibold text-signupmessage">
            {emailMessage}
          </span>

          <label className="text-xl font-bold" htmlFor="gender">
            성별
          </label>
          <div className="font-semibold text-xl flex gap-4">
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                value="man"
                checked={gender === "man"}
                onChange={onChangeGender}
              />
              남성
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                value="woman"
                checked={gender === "woman"}
                onChange={onChangeGender}
              />
              여성
            </label>
          </div>

          <label className="text-xl font-bold" htmlFor="birth">
            생년월일
          </label>
          <input
            className="border-2 border-gray-400 rounded-md h-9 pl-3 focus:border-project focus:font-bold outline-none"
            type="date"
            id="birth"
            value={birth}
            onChange={onChangeBirth}
          />
          <span className="text-sm font-semibold text-signupmessage">
            {birthMessage}
          </span>

          <label className="text-xl font-bold" htmlFor="nickname">
            닉네임
          </label>
          <input
            className="border-2 border-gray-400 rounded-md h-9 pl-3 focus:border-project focus:font-bold outline-none"
            type="text"
            id="nickname"
            value={nickname}
            onChange={onChangeNickname}
          />
          <span className="text-sm font-semibold text-signupmessage">
            {nicknameMessage}
          </span>

          <label className="text-xl font-bold" htmlFor="password">
            비밀번호
          </label>
          <input
            className="border-2 border-gray-400 rounded-md h-9 pl-3 focus:border-project  focus:font-bold outline-none"
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
          <span className="text-sm font-semibold text-signupmessage">
            {passwordMessage}
          </span>

          <label className="text-xl font-bold" htmlFor="passwordConfirm">
            비밀번호 확인
          </label>
          <input
            className="border-2 border-gray-400 rounded-md h-9 pl-3 focus:border-project focus:font-bold outline-none"
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <span className="text-sm font-semibold text-signupmessage">
            {passwordConfirmMessage}
          </span>

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
