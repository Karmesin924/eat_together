import React from "react";
import { useNavigate } from "react-router-dom";

const MyFooter = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => {
          navigate("/MyPage");
        }}
      >
        마이페이지로가는그림
      </div>
      <div>채팅그림</div>
    </div>
  );
};

export default MyFooter;
