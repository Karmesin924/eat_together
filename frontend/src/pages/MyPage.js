import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const MyPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BackButton />
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
