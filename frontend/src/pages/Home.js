import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
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
      <div className=" pt-24">
        <div
          className=" inline-block align-middle ml-3 pt-5 ml-5 mr-5 text-center font-light rounded-3xl border-4 border-solid border-project w-64 h-96 cursor-pointer hover:bg-homehover"
          onClick={() => {
            navigate("/LetsEat");
          }}
        >
          <p className=" text-6xl pt-6">
            같이 <br />
            먹자
          </p>
          <img
            className="  m-auto"
            src="images/LetsEat.png"
            alt="같이먹자"
            width={200}
            height={200}
          />
        </div>
        <div
          className=" inline-block align-middle ml-3 pt-5 ml-5 mr-5 text-center font-light rounded-3xl border-4 border-solid border-project w-64 h-96 cursor-pointer hover:bg-homehover"
          onClick={() => {
            navigate("/LetsDo");
          }}
        >
          <p className=" text-6xl pt-6">
            같이 <br />
            하자
          </p>
          <img
            className=" m-auto"
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
