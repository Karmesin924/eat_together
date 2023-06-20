import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Board from "../components/Board";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  // useEffect(() => {
  //   const getBoard = async () => {
  //     try {
  //       const resp = await axios.get(`backend/posts/board/${idx}`);
  //       setBoard(resp.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log("게시글을 가져오는데 실패했습니다.", err);
  //       setLoading(false);
  //     }
  //   };

  //   getBoard();
  // }, [idx]);
  useEffect(() => {
    const getBoard = async () => {
      try {
        // 더미 데이터 배열 생성
        const dummyData = [
          {
            idx: 1,
            title: "게시글 제목 1",
            contents: "게시글 내용입니다 1.",
            createdBy: "작성자 1",
          },
          {
            idx: 2,
            title: "게시글 제목 2",
            contents: "게시글 내용입니다 2.",
            createdBy: "작성자 2",
          },
          {
            idx: 3,
            title: "게시글 제목 3",
            contents: "게시글 내용입니다 3.",
            createdBy: "작성자 3",
          },
        ];

        // 비동기적으로 더미 데이터 설정
        setLoading(true);
        const selectedBoard = dummyData.find(
          (item) => item.idx === parseInt(idx)
        );
        setBoard(selectedBoard || {});
        setLoading(false);
      } catch (err) {
        console.log("게시글을 가져오는데 실패했습니다.", err);
        setLoading(false);
      }
    };

    getBoard();
  }, [idx]);

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
      />
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          idx={board.idx}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
        />
      )}
    </div>
  );
};

export default BoardDetail;
