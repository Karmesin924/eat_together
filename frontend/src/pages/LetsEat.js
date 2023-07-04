import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "../components/MyContext";

const LetsEat = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");

  const { people, gender, age, menu, conversation, handleSaveFilters } =
    useContext(MyContext);

  const handleStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const handleMatching = () => {
    alert("matching start!!");
    console.log("Selected Filters:", {
      people,
      gender,
      age,
      menu,
      conversation,
    });
  };

  const handleShowFilter = () => {
    // 나의 필터 버튼을 눌렀을 때, 서버에서 받은 최근 저장 정보를 입력해줌
    axios
      .get("/api/filters")
      .then((res) => {
        const filters = res.data;
        handleSaveFilters(filters);
      })
      .catch((err) => {
        alert("기존 선택항목을 불러오는데 오류가 발생했습니다.");
        console.log(err);
      });
  };

  const handleSelectFilter = () => {
    navigate("/FilterDetail");
  };

  //로그인 정보 확인
  useEffect(() => {
    axios
      .get("/users/validate")
      .then((res) => {
        if (res.status === 404) {
          alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
          navigate("/SignIn");
        }
      })
      .catch((err) => {
        console.log("로그인이 되어있습니다.");
      });
  }, [navigate]);

  // 자동 시간 설정
  useEffect(() => {
    const now = new Date();
    const nearestHour = Math.ceil(now.getMinutes() / 60) + now.getHours();

    const formattedStartTime = `${
      nearestHour < 10 ? "0" : ""
    }${nearestHour}:00`;

    setStartTime(formattedStartTime);
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
      <h3>모임 날짜</h3>
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

        <h3>시간 선택</h3>
        <label>
          모임 시간:
          <input type="time" value={startTime} onChange={handleStartTime} />
        </label>
      </div>

      <h3>필터 선택</h3>
      <div>
        <button onClick={handleShowFilter}>불러오기</button>
        <button onClick={handleSelectFilter}>필터선택</button>
      </div>

      <h3>현재 선택한 필터</h3>
      <div>
        <p>인원: {people}</p>
        <p>성별: {gender}</p>
        <p>나이대: {age}</p>
        <p>메뉴: {menu.join(", ")}</p>
        <p>대화 주제: {conversation}</p>
      </div>

      <button onClick={handleMatching}>매칭</button>
    </div>
  );
};

export default LetsEat;
