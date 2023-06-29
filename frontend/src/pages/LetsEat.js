import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useEffect, useState } from "react";
import axios from "axios";

const LetsEat = () => {
  const navigate = useNavigate("");
  const [editTime, setEditTime] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [people, setPeople] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [menu, setMenu] = useState([]);
  const [conversation, setConversation] = useState("");

  const handleStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTime = (event) => {
    setEndTime(event.target.value);
  };

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

  useEffect(() => {
    const now = new Date();
    const nearestHour = Math.ceil(now.getMinutes() / 60) + now.getHours();
    const nextHour = nearestHour + 1;

    const formattedStartTime = `${
      nearestHour < 10 ? "0" : ""
    }${nearestHour}:00`;
    const formattedEndTime = `${nextHour < 10 ? "0" : ""}${nextHour}:00`;

    setStartTime(formattedStartTime);
    setEndTime(formattedEndTime);
  }, []);

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
      <h4>만남 일시</h4>
      <div>
        <input
          type="text"
          placeholder="닉네임"
          value={new Date()
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              weekday: "short",
            })
            .replace(/\./g, " /")}
          readOnly
        />

        <h4>시간 선택</h4>
        <div>
          <label>
            시작 시간:
            <input type="time" value={startTime} onChange={handleStartTime} />
          </label>
          <label>
            종료 시간:
            <input type="time" value={endTime} onChange={handleEndTime} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LetsEat;
