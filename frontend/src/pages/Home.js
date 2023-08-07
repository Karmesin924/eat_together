import { Link, useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [isSignInButtonVisible, setIsSignInButtonVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const goToSignInPage = () => {
    navigate("/SignIn");
  };

  useEffect(() => {
    axios
      .get("/users/validate")
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsSignInButtonVisible(true);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        setIsSignInButtonVisible(true);
      });
  }, []); // 로그인 체크는 최초 한 번만 수행

  return (
    <div className="w-auto">
      <MyHeader
        leftChild={
          <Link to="http://127.0.0.1:8000">
            <MyButton text={"채팅"} />
          </Link>
        }
        headText={"같이 먹자"}
        rightChild={
          <MyButton
            text={"마이 페이지"}
            onClick={() => {
              navigate("/MyPage");
            }}
          />
        }
      />
      <div className="flex flex-row justify-center items-center pt-24 p-1 gap-2 ">
        <div
          className="ml-3 pt-2 text-center font-light rounded-3xl border-4 border-solid border-project min-w-0 cursor-pointer hover:bg-homehover"
          onClick={() => {
            navigate("/LetsEat");
          }}
        >
          <p className="text-6xl pt-6">
            같이 <br />
            먹자
          </p>
          <img
            className="m-auto"
            src="images/LetsEat.png"
            alt="같이먹자"
            width={200}
            height={200}
          />
        </div>
        <div
          className="mr-3 pt-2 text-center font-light rounded-3xl border-4 border-solid border-project min-w-0 cursor-pointer hover:bg-homehover"
          onClick={() => {
            navigate("/LetsDo");
          }}
        >
          <p className="text-6xl pt-6">
            같이 <br />
            하자
          </p>
          <img
            className="m-auto"
            src="images/LetsDo.png"
            alt="같이하자"
            width={200}
            height={200}
          />
        </div>
      </div>
      {!isLoggedIn && isSignInButtonVisible && (
        <div className="flex justify-center items-center mt-4">
          <MyButton text={"로그인 하러가기"} onClick={goToSignInPage} />
        </div>
      )}
    </div>
  );
};

export default Home;
