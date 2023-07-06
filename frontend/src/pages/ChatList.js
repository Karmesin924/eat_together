import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import axios from "axios";

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <input>왜 안돼</input>
      {/* <MyHeader
        headText={"채팅 목록"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      /> */}
    </div>

  );
};

export default ChatList;