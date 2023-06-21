import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

const Board = ({
  idx,
  title,
  contents,
  author,
  createdDate,
  replies,
  isAuthor,
}) => {
  const handleEdit = () => {
    console.log("수정 버튼 클릭");
    // TODO: 수정 버튼 동작 구현
  };

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
    // TODO: 삭제 버튼 동작 구현
  };

  return (
    <div>
      <h2>{title}</h2>
      <h5>{author}</h5>
      <p>
        작성일시:{" "}
        {new Date(createdDate).toLocaleDateString("ko-KR", {
          weekday: "short",
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <hr />
      <p>{contents}</p>
      <br />
      {isAuthor && (
        <div>
          <button text="수정" onClick={handleEdit} />
          <button text="삭제" onClick={handleDelete} />
        </div>
      )}

      <h3>댓글</h3>
      <ReplyList replies={replies} />
      <ReplyForm />
    </div>
  );
};

export default Board;
