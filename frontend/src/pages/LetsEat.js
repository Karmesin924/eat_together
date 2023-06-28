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

const LetsEat = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default LetsEat;
