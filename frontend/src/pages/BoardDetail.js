import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Board from "../components/Board";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import ReplyForm from "../components/ReplyForm";
import ReplyList from "../components/ReplyList";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [board, setBoard] = useState({
    title: "",
    contents: "",
    nickname: "",
    createdDate: "",
    replies: [],
  });
  const [author, setAuthor] = useState(false);

  const getBoard = useCallback(async () => {
    try {
      const boardData = await axios.get(`/posts/${id}`);
      const selectedBoard = boardData.data;
      const author = selectedBoard.author || false;

      setBoard(selectedBoard || {});
      setAuthor(author);
      setLoading(false);
    } catch (err) {
      alert("게시글을 가져오는데 실패했습니다.", err);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getBoard();
  }, [getBoard]);

  useEffect(() => {
    axios
      .get("/users/validate")
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
      />
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div className="mb-10">
          <Board
            id={board?.id}
            title={board?.title}
            contents={board?.contents}
            nickname={board?.nickname}
            createdDate={board?.createdDate}
            replies={board?.replies || []}
            author={author}
            isLoggedIn={isLoggedIn}
          />
          <p className="pt-4 text-center font-bold text-lg border-buttonhover w-5/6 mx-auto">
            댓글
          </p>
          <ReplyForm id={id} />
          <ReplyList id={id} />
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
