import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyButton from "./MyButton";

const ReplyList = ({ author }) => {
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);
  const { postIdx } = useParams();

  useEffect(() => {
    const getReplies = async () => {
      try {
        const response = await axios.get(`/posts/comment/${String(postIdx)}`);
        const repliesData = response.data;
        setReplies(repliesData);
      } catch (err) {
        alert("댓글을 가져오는데 실패했습니다.");
        console.log("댓글을 가져오는데 실패했습니다.", err);
      }
    };

    getReplies();
  }, [postIdx]);

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
    axios
      .delete(`/posts/${postIdx}`)
      .then((res) => {
        alert("댓글이 삭제되었습니다!");
        navigate(`posts/${postIdx}`);
      })
      .catch((err) => {
        alert("글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="w-2/5 text-left">
      {replies.length === 0 ? (
        <p>아직 댓글이 없습니다. 댓글을 달아보세요!</p>
      ) : (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <div className="flex flex-row p-4 border-b-2 border-buttonhover">
                <p className="w-1/5">{reply.nickname}</p>
                <p className="w-3/5">{reply.contents}</p>
                <p className="w-1/5">
                  {new Date(reply.createdDate).toLocaleDateString("ko-KR", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "short",
                  })}
                </p>
              </div>
              {author && <MyButton text={"삭제"} onClick={handleDelete} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReplyList;
