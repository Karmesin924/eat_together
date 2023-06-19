import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { useEffect } from "react";

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = sessionStorage.getItem("email");
    if (!getSession) {
      navigate("/SignIn");
    }
  }, []);

  return (
    <div>
      <MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />
      <h2>마이페이지</h2>
      <button
        onClick={() => {
          navigate("/SignIn");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          navigate("/SignUp");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default MyPage;
