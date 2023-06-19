import React, { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { Link, useNavigate } from "react-router-dom";
import MyFooter from "../components/MyFooter";
import axios from "axios";

const LetsDo = () => {
  const [boardList, setBoardList] = useState([
    {
      idx: 1,
      title: "첫 번째 게시글",
      contents: "첫 번째 게시글 내용",
      createdBy: "User1",
    },
    {
      idx: 2,
      title: "두 번째 게시글",
      contents: "두 번째 게시글 내용",
      createdBy: "User2",
    },
    // 추가 데이터
    {
      idx: 3,
      title: "세 번째 게시글",
      contents: "세 번째 게시글 내용",
      createdBy: "User3",
    },
    {
      idx: 4,
      title: "네 번째 게시글",
      contents: "네 번째 게시글 내용",
      createdBy: "User4",
    },
  ]); //dummyData 시험 후에는 useState([]);로 다시 변경
  const navigate = useNavigate();
  const getBoardList = async () => {
    try {
      const resp = (await axios.get("backend/posts/board")).data;
      setBoardList(resp.data);
      console.log(resp.pagniation);
    } catch (err) {
      console.log("게시글 목록을 가져오는데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div>
      <MyHeader
        headText={"같이 하자"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate("/");
            }}
          />
        }
      />
      {boardList.map((board) => (
        <li key={board.idx}>
          <Link to={`/board/${board.idx}`}>{board.title}</Link>
        </li>
      ))}
    </div>
  );
};

LetsDo.defaultProps = {
  boardList: [],
};
export default LetsDo;
