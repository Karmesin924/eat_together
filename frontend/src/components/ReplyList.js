const ReplyList = ({ replies }) => {
  return (
    <div>
      {replies.length === 0 ? (
        <p>아직 댓글이 없습니다.댓글을 달아보세요!</p>
      ) : (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <p>
                {new Date(reply.createdDate).toLocaleDateString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "short",
                })}
              </p>
              <p>{reply.author}</p>
              <p>{reply.text}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReplyList;
