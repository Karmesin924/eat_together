import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

const Board = ({ idx, title, contents, author, createdDate, replies }) => {
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
      <h3>댓글</h3>
      <ReplyList replies={replies} />
      <ReplyForm />
    </div>
  );
};

export default Board;
