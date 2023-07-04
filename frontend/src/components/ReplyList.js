import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReplyList = ({ author }) => {
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);
  const { postIdx } = useParams();

  useEffect(() => {
    const getReplies = async () => {
      try {
        const repliesData = await axios.get(`/posts/${String(postIdx)}`).data;
        setReplies(repliesData);
      } catch (err) {
        alert.log("댓글을 가져오는데 실패했습니다.");
        console.log("댓글을 가져오는데 실패했습니다.", err);
      }
    };

    getReplies();
  });

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
    axios
      // 동우야 도와줘
      .delete(`/posts/${postIdx}`)
      .then((res) => {
        alert("댓글이 삭제되었습니다!");
        navigate(`board/${postIdx}}`);
      })
      .catch((err) => {
        alert("글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      {replies.length === 0 ? (
        <p>아직 댓글이 없습니다.댓글을 달아보세요!</p>
      ) : (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <p>작성자: {reply.nickname}</p>
              <p>
                {new Date(reply.createdDate).toLocaleDateString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "short",
                })}
              </p>
              {/* 조건부 삭제 */}
              {author && (
                <div>
                  <button text="삭제" onClick={handleDelete} />
                </div>
              )}
              <p>{reply.contents}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReplyList;
