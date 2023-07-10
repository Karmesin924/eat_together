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
  const [totalPages, setTotalPages] = useState(0);

  const getBoardList = async (page) => {
    try {
      const resp = await axios.get(`/posts/board/${page}`);
      setBoardList(resp.data);
      setTotalPages(resp.pagination.totalPages);
      console.log(resp.pagination);
    } catch (err) {
      console.log("게시글 목록을 가져오는데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    getBoardList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setIsPreviousDisabled(currentPage === 1);
    setIsNextDisabled(currentPage === totalPages);
  }, [currentPage, totalPages]);

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
          <Link to={`/board/${item.idx}`}>{item.title}</Link>
        </li>
      ))}

      <div>
        <MyButton
          text={"이전 페이지"}
          disabled={isPreviousDisabled}
          grayedOut={isPreviousDisabled}
          onClick={goToPreviousPage}
        />
        <MyButton
          text={"다음 페이지"}
          disabled={isNextDisabled}
          grayedOut={isNextDisabled}
          onClick={goToNextPage}
        />
      </div>
    </div>
  );
};

LetsDo.defaultProps = {
  boardList: [],
};
export default LetsDo;
