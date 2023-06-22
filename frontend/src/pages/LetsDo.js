import React, { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LetsDo = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const getBoardList = async (page) => {
    try {
      const resp = await axios.get(`/posts/board/${page}`);
      setBoardList(resp.data);
      console.log(resp.pagination);
    } catch (err) {
      console.log("게시글 목록을 가져오는데 실패했습니다.", err);
    }
  };

  // useEffect(() => {
  //   getBoardList(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    // 더미 데이터 생성
    const dummyData = [
      { idx: 1, title: "첫 번째 게시글" },
      { idx: 2, title: "두 번째 게시글" },
      { idx: 3, title: "세 번째 게시글" },
    ];

    setBoardList(dummyData);
  }, []);

  useEffect(() => {
    setIsPreviousDisabled(currentPage === 1);
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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
      {boardList.map((item) => (
        <li key={item.idx}>
          <Link to={`/posts/${item.idx}`}>{item.title}</Link>
        </li>
      ))}

      <div>
        {isPreviousDisabled ? (
          <button disabled style={{ backgroundColor: "gray" }}>
            이전 페이지
          </button>
        ) : (
          <button onClick={goToPreviousPage}>이전 페이지</button>
        )}
        {isNextDisabled ? (
          <button disabled style={{ backgroundColor: "gray" }}>
            다음 페이지
          </button>
        ) : (
          <button onClick={goToNextPage}>다음 페이지</button>
        )}
      </div>
    </div>
  );
};

LetsDo.defaultProps = {
  boardList: [],
};
export default LetsDo;
