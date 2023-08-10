import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { useEffect, useState } from "react";

const Board = ({
  id,
  title,
  contents,
  nickname,
  currentNickname,
  createdDate,
  author,
  isLoggedIn,
}) => {
  const navigate = useNavigate();
  const [isChatButtonVisible, setIsChatButtonVisible] = useState(false);

  const handleEdit = () => {
    navigate(`/write/${id}`, { state: { isEditMode: true } });
  };

  const handleChat = () => {
    const chatData = {
      user_nicknames: [currentNickname, nickname],
    };
    axios
      .post("http://127.0.0.1:8000/chat/new_matching_room/", chatData)
      .then((resp) => {
        window.location.replace(
          `http://127.0.0.1:8000/chat/${resp.data.room_pk}/matching_chat/`
        );
      })
      .catch((err) => {
        console.log("채팅 페이지로 이동에 실패했습니다.", err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/posts/${id}`)
      .then(() => {
        alert("글이 삭제되었습니다!");
        navigate("/board/1");
      })
      .catch(() => {
        alert("글 삭제 중 오류가 발생했습니다.");
      });
  };

  useEffect(() => {
    if (isLoggedIn && currentNickname !== nickname) {
      setIsChatButtonVisible(true);
    } else {
      setIsChatButtonVisible(false);
    }
  }, [currentNickname, nickname]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mt-5 border-b-4 border-buttonhover w-5/6"></div>
        <div className="flex flex-row items-center p-2 font-bold text-2xl border-b-4 border-buttonhover w-5/6 bg-orange-100">
          <div className="flex justify-center text-start w-auto m-auto">
            <p>{title}</p>
          </div>
        </div>
        <div className="pt-2 pb-2 w-5/6 flex flex-row justify-between items-center text-left">
          <div className="flex flex-col pl-2 justify-center items-baseline gap-2">
            <p className="flex font-semibold text-base text-left text-project">
              {nickname}
            </p>
            <p className="flex font-semibold text-sm text-left text-gray-500">
              {new Date(
                createdDate.replace(" at ", " ").replace(" KST", "")
              ).toLocaleString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex pr-2">
            {author && (
              <div className="flex flex-row">
                <MyButton text={"수정"} onClick={handleEdit} />
                <span className="pl-2"></span>
                <MyButton text={"삭제"} onClick={handleDelete} />
              </div>
            )}
            {!author && isChatButtonVisible && (
              <div className="flex flex-row">
                <MyButton text={"1:1 채팅"} onClick={handleChat} />
              </div>
            )}
          </div>
        </div>
        <p className="border-b-4 border-buttonhover w-5/6 break-words text-left">
          <p className="border-t-2 border-buttonhover p-2 pt-10 pb-10 font-semibold text-lg">
            {contents}
          </p>
        </p>
      </div>
    </div>
  );
};

export default Board;
