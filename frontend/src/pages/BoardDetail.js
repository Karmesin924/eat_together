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
  const [board, setBoard] = useState({
    title: "",
    contents: "",
    author: "",
    createdDate: "",
    replies: [],
  });

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
            author: "작성자 1",
            createdDate: "2023-06-20",
            replies: [
              {
                id: 1,
                text: "댓글 내용 1",
                author: "작성자 1",
                createdDate: "2023-06-20T12:34:56Z",
              },
              {
                id: 2,
                text: "댓글 내용 2",
                author: "작성자 2",
                createdDate: "2023-06-21T09:12:34Z",
              },
            ],
          },
          {
            idx: 2,
            title: "게시글 제목 2",
            contents: "게시글 내용입니다 2.",
            author: "작성자 2",
            createdDate: "2023-06-21",
            replies: [],
          },
          {
            idx: 3,
            title: "게시글 제목 3",
            contents: "게시글 내용입니다 3.",
            author: "작성자 3",
            createdDate: "2023-06-22",
            replies: [
              {
                id: 3,
                text: "댓글 내용 3",
                author: "작성자 3",
                createdDate: "2023-06-22T15:45:00Z",
              },
            ],
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
          author={board.author}
          createdDate={board.createdDate}
          replies={board.replies}
        />
      )}
    </div>
  );
};

export default BoardDetail;
