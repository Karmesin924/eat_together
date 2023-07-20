import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <MyHeader
        leftChild={
          <MyButton
            text={"채팅"}
            onClick={() => {
              navigate("/ChatList");
            }}
          />
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
      <div className="flex flex-row justify-center items-center pt-24 p-1 gap-5">
        <div
          className="pt-5 text-center font-light rounded-3xl border-4 border-solid border-project w-1/5 h-1/5 cursor-pointer hover:bg-homehover"
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
          className="pt-5 text-center font-light rounded-3xl border-4 border-solid border-project w-1/5 h-1/5 cursor-pointer hover:bg-homehover"
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
    </div>
  );
};

export default Home;
