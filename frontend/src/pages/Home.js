import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <MyHeader
        leftChild={"채팅"}
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
      <div className="Home-Lets">
        <div
          onClick={() => {
            navigate("/LetsEat");
          }}
        >
          같이
          <br />
          먹자
          <img
            src="images/LetsEat.png"
            alt="같이먹자"
            width={200}
            height={200}
          />
        </div>
        <div
          onClick={() => {
            navigate("/LetsDo");
          }}
        >
          같이
          <br />
          하자
          <img
            src="images/LetsDo.png"
            alt="같이하자"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
