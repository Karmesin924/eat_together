import { useNavigate } from "react-router-dom";
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <MyHeader headText={"같이 먹자"} />

      <br />
      <br />

      <div
        className="Home-LetsEat"
        onClick={() => {
          navigate("/LetsEat");
        }}
      >
        같이
        <br />
        먹자
      </div>
      <div
        className="Home-LetsDo"
        onClick={() => {
          navigate("/LetsDo");
        }}
      >
        같이
        <br />
        하자
      </div>
      <MyFooter />
    </div>
  );
};

export default Home;
