import React, { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LetsDo = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { pageNumber } = useParams();

  const getBoardList = async (page) => {
    try {
      const resp = await axios.get(`/board/${page}`);
      setBoardList(resp.data);
      setTotalPages(resp.totalPages);
      console.log(resp.pagination);
    } catch (err) {
      console.log("게시글 목록을 가져오는데 실패했습니다.", err);
    }
  };

  const formatDate = (dateString) => {
    const currentDate = new Date();
    const postDate = new Date(
      dateString.replace(" at ", " ").replace(" KST", "")
    );

    if (currentDate.toDateString() === postDate.toDateString()) {
      return postDate.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return postDate.toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    }
  };

  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  useEffect(() => {
    const pageNumberToFetch = pageNumber || currentPage;
    getBoardList(pageNumberToFetch);
  }, [pageNumber, currentPage]);

  useEffect(() => {
    setIsPreviousDisabled(currentPage <= 1);
    setIsNextDisabled(currentPage >= totalPages);
  }, [currentPage, totalPages]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
      <div className="flex flex-col">
        <div className="flex flex-col items-center pt-10">
          {boardList.map((item) => (
            <li className="list-none w-5/6 text-center" key={item.id}>
              <Link className="cursor-pointer" to={`/posts/${item.id}`}>
                <div className="flex pt-3 pb-3 border-t-4 border-homehover">
                  <span className="flex items-center justify-start w-1/4 pl-1 font-semibold text-lg text-gray-500">
                    {item.nickname}
                  </span>
                  <span className="flex items-center justify-center w-1/2 text-xl font-bold text-orange-600 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {trimText(item.title, 11)}
                  </span>

                  <span className="flex items-center justify-end w-1/4 pr-1 font-semibold text-xm text-gray-500">
                    {formatDate(item.createdDate)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <div className="border-t-4 w-5/6 border-homehover"></div>
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

export default LetsDo;
