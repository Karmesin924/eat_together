import React, { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { Link, useNavigate } from "react-router-dom";
import MyFooter from "../components/MyFooter";
import axios from "axios";

const LetsDo = () => {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  // const getBoardList = async () => {
  //   try {
  //     const resp = (await axios.get("backend/posts/board")).data;
  //     setBoardList(resp.data);
  //     console.log(resp.pagniation);
  //   } catch (err) {
  //     console.log("게시글 목록을 가져오는데 실패했습니다.", err);
  //   }
  // };

  // useEffect(() => {
  //   getBoardList();
  // }, []);
  useEffect(() => {
    // 더미 데이터 생성
    const dummyData = [
      { idx: 1, title: "첫 번째 게시글" },
      { idx: 2, title: "두 번째 게시글" },
      { idx: 3, title: "세 번째 게시글" },
    ];

    setBoardList(dummyData);
  }, []);

  return (
    <div>
      <MyHeader
        headText={"같이 하자"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          <MyButton
            text={"글 쓰기"}
            onClick={() => {
              navigate("/write");
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
