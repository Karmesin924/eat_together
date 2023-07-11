import axios from "axios";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const Board = ({ idx, title, contents, nickname, createdDate, author }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("수정 버튼 클릭");
    navigate(`/write/${idx}`, { state: { isEditMode: true } });
  };

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
    axios
      .delete(`/posts/${idx}`)
      .then((res) => {
        alert("글이 삭제되었습니다!");
        navigate("/posts/board/1");
      })
      .catch((err) => {
        alert("글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="flex p-4 flex-row border-b-4 border-buttonhover w-2/5 justify-between">
          <div></div>
          <div className="flex">
            <p className="font-semibold text-xl m-auto">글쓴이 : {nickname}</p>
            <p className="pl-4 font-semibold text-xl text-inputfocus m-auto">
              {new Date(createdDate).toLocaleDateString("ko-KR", {
                weekday: "short",
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
          <div>
            {author && (
              <div>
                <MyButton text={"수정"} onClick={handleEdit} />
                <span className="pl-2"></span>
                <MyButton text={"삭제"} onClick={handleDelete} />
              </div>
            )}
          </div>
        </div>
        <p className="p-4  font-bold text-2xl border-b-4 border-buttonhover w-2/5 bg-orange-100">
          {title}
        </p>
        <p className="p-4 font-semibold text-lg border-b-4 border-buttonhover w-2/5 h-auto break-words text-left">
          {contents}
        </p>

        <p className="p-4 font-bold text-xl border-b-4 border-buttonhover w-2/5 bg-orange-100">
          댓글
        </p>
        <ReplyForm />
        <ReplyList />
      </div>
    </div>
  );
};

export default Board;
