import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Board from "../components/Board";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import ReplyForm from "../components/ReplyForm";
import ReplyList from "../components/ReplyList";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
        const boardData = await axios.get(`/posts/${String(id)}`);
        const selectedBoard = boardData.data;
        const author = selectedBoard.author || false;

        setBoard(selectedBoard || {});
        setAuthor(author);
        setLoading(false);

        console.log("id : " + selectedBoard.id);
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
        const replyData = await axios.get(`/posts/${String(id)}/comment`);
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
  }, [id]);

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
        <div>
          <Board
            id={board?.id}
            title={board?.title}
            contents={board?.contents}
            nickname={board?.nickname}
            createdDate={board?.createdDate}
            replies={board?.replies || []}
            author={author}
          />
          <p className="p-4 font-bold text-xl border-b-4 border-buttonhover w-2/5 bg-orange-100">
            댓글
          </p>
          <ReplyForm />
          <ReplyList id={board?.id} />
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
