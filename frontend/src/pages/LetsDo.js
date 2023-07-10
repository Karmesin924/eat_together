import React, { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const dummyData = [
  {
    idx: 1,
    title: "게시글 제목 1",
  },
  {
    idx: 2,
    title: "게시글 제목 2",
  },
  {
    idx: 3,
    title: "게시글 제목 3",
  },
];

const LetsDo = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const getBoardList = async (page) => {
    try {
      // 비동기적으로 더미 데이터 설정
      setBoardList(dummyData);
      setTotalPages(dummyData.length);
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
      <div className="flex flex-col ">
        <div className="flex flex-col items-center pt-10">
          {boardList.map((item) => (
            <li className="list-none w-3/4 text-center" key={item.idx}>
              <Link className="cursor-pointer" to={`/board/${item.idx}`}>
                <div className="pt-3 pb-3 border-t-4 border-homehover">
                  <span className="text-3xl text-orange-600">{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
          <div className="border-t-4 w-3/4  border-homehover"></div>
        </div>
        <div className="flex flex-col items-center pt-10">
          <p>
            <MyButton
              text={"이전 페이지"}
              disabled={isPreviousDisabled}
              grayedOut={isPreviousDisabled}
              onClick={goToPreviousPage}
            />
            <span className="pr-3"></span>
            <MyButton
              text={"다음 페이지"}
              disabled={isNextDisabled}
              grayedOut={isNextDisabled}
              onClick={goToNextPage}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

LetsDo.defaultProps = {
  boardList: [],
};

export default LetsDo;
