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
    nickname: "",
    createdDate: "",
    replies: [],
  });
  const [author, setAuthor] = useState(false);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const boardData = await axios.get(`/posts/${String(idx)}`);
        const selectedBoard = boardData.data;
        const author = selectedBoard.author || false;

        setBoard(selectedBoard || {});
        setAuthor(author);
        setLoading(false);

        console.log("idx : " + selectedBoard.idx);
        console.log("title : " + selectedBoard.title);
        console.log("contents : " + selectedBoard.contents);
        console.log("nickname : " + selectedBoard.nickname);
        console.log("createdDate : " + selectedBoard.createdDate);
        console.log("author : " + author);
      } catch (err) {
        console.log("게시글을 가져오는데 실패했습니다.", err);
        setLoading(false);
      }
    };

    const getReplies = async () => {
      try {
        const replyData = await axios.get(`/posts/${String(idx)}/comment`);
        const replies = Array.isArray(replyData.data) ? replyData.data : [];
        setBoard((prevBoard) => ({ ...prevBoard, replies: [...replies] }));
      } catch (err) {
        console.log("댓글을 가져오는데 실패했습니다.", err);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await getBoard();
      await getReplies();
    };

    fetchData();
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
          idx={board?.idx}
          title={board?.title}
          contents={board?.contents}
          nickname={board?.nickname}
          createdDate={board?.createdDate}
          replies={board?.replies || []}
          author={author}
        />
      )}
    </div>
  );
};

export default BoardDetail;
