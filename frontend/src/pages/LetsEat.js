import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useEffect, useState } from "react";
import axios from "axios";

const LetsEat = () => {
  const navigate = useNavigate("");
  const [people, setPeople] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [menu, setMenu] = useState([]);
  const [conversation, setConversation] = useState("");

  const handlePeople = (event) => {
    setPeople(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  const handleMenu = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setMenu(selectedOptions);
  };

  const handleConversation = (event) => {
    setConversation(event.target.value);
  };

  const handleMatching = () => {
    alert("mathcing start!!");
    console.log("Selected Filters:", {
      people,
      gender,
      age,
      menu,
      conversation,
    });
  };

  useEffect(() => {
    axios
      .get("/users/validate")
      .then((res) => {
        if (res.status === 404) {
          alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
          navigate("/SignIn");
        }
      })
      .catch((error) => {
        console.log("로그인이 되어있음.");
      });
  });
  return (
    <div>
      <MyHeader
        headText={"같이 먹자"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate("/");
            }}
          />
        }
      />
      <div>
        <h1>Filter Page</h1>
        <div>
          <label htmlFor="numberOfPeople">인원:</label>
          <select id="numberOfPeople" value={people} onChange={handlePeople}>
            <option value="상관없음">상관없음</option>
            <option value="2인">2인</option>
            <option value="3인">3인</option>
            <option value="4인 이상">4인 이상</option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">성별:</label>
          <select id="gender" value={gender} onChange={handleGender}>
            <option value="상관없음">상관없음</option>
            <option value="동성만">동성만</option>
          </select>
        </div>
        <div>
          <label htmlFor="ageGroup">나이대:</label>
          <select id="ageGroup" value={age} onChange={handleAge}>
            <option value="상관없음">상관없음</option>
            <option value="또래만">또래만</option>
          </select>
        </div>
        <div>
          <label htmlFor="menu">메뉴:</label>
          <select id="menu" multiple value={menu} onChange={handleMenu}>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="베트남식">베트남식</option>
            <option value="분식">분식</option>
            <option value="디저트">디저트</option>
            <option value="상관없음">상관없음</option>
          </select>
        </div>
        <div>
          <label htmlFor="conversationFrequency">식사시 대화 빈도:</label>
          <select
            id="conversationFrequency"
            value={conversation}
            onChange={handleConversation}
          >
            <option value="">상관없음</option>
            <option value="적음">적음</option>
            <option value="보통">보통</option>
            <option value="많음">많음</option>
          </select>
        </div>
        <button onClick={handleMatching}>매칭하기</button>
      </div>
    </div>
  );
};

export default LetsEat;
