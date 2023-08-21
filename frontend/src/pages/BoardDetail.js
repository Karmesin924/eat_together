import { useEffect, useState } from "react";
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
  const [currentNickname, setCurrentNickname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [board, setBoard] = useState({
    title: "",
    contents: "",
    nickname: "",
    createdDate: "",
    replies: [],
  });
  const [author, setAuthor] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchBoardAndUser = async () => {
      try {
        const boardResponse = await axios.get(`/posts/${id}`);
        const selectedBoard = boardResponse.data;
        const author = selectedBoard.author || false;

        setBoard(selectedBoard || {});
        setAuthor(author);
        setLoading(false);
      } catch (boardErr) {
        alert("게시글을 가져오는데 실패했습니다.", boardErr);
        setLoading(false);
      }

      try {
        const userResponse = await axios.get("/users/validate");
        const fetchedNickname = userResponse.data.nickname;
        setCurrentNickname(fetchedNickname);
        setIsLoggedIn(true);
      } catch (userErr) {
        console.log("닉네임 불러오기 오류");
      }
    };

    fetchBoardAndUser();
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
        <div className="mb-10">
          <Board
            id={board?.id}
            title={board?.title}
            contents={board?.contents}
            nickname={board?.nickname}
            currentNickname={currentNickname}
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
