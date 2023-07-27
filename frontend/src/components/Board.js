import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const Board = ({ id, title, contents, nickname, createdDate, author }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("수정 버튼 클릭");
    navigate(`/write/${id}`, { state: { isEditMode: true } });
  };

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
    axios
      .delete(`/posts/${id}`)
      .then((res) => {
        alert("글이 삭제되었습니다!");
        navigate("/board/1");
      })
      .catch((err) => {
        alert("글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mt-5 border-b-4 border-buttonhover w-4/5"></div>
        <div className="flex flex-row items-center p-2 font-bold text-2xl border-b-4 border-buttonhover w-4/5 bg-orange-100 justify-between">
          <div className="w-1/6">
            <p className="font-semibold text-base text-center">{nickname}</p>
            <p className="font-semibold text-base text-center text-inputfocus">
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
          <p className="flex ">{title}</p>
          {author && (
            <div className="flex">
              <MyButton text={"수정"} onClick={handleEdit} />
              <span className="pl-2"></span>
              <MyButton text={"삭제"} onClick={handleDelete} />
            </div>
          )}
        </div>
        <p className="p-4 pt-10 pb-10 font-semibold text-lg border-b-4 border-buttonhover w-4/5 break-words text-left">
          {contents}
        </p>
      </div>
    </div>
  );
};

export default Board;
