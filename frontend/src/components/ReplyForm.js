import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReplyForm = () => {
  const [replycontents, setReplycontents] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const { postIdx } = useParams();
  const [replies, setReplies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const replyData = {
      contents: replycontents,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`/posts/comment/${postIdx}/add`, replyData);
      // 성공적으로 작성되었을 때의 처리 로직
      console.log("댓글이 성공적으로 작성되었습니다.", response.data);
      setReplies([...replies, response.data]);
    } catch (error) {
      // 오류 발생 시의 처리 로직
      console.log("댓글 작성에 실패했습니다.", error);
    }
    // 입력 필드 초기화
    setReplycontents("");
    // setReplyAuthor("");
  };

  useEffect(() => {
    // 서버에서 유저 정보를 가져와서 닉네임 고정
    const fetchUserNickname = async () => {
      try {
        const response = await axios.get("/users/validate");
        const { nickname } = response.data;
        setNickname(nickname);
        setLoading(false);
      } catch (error) {
        console.log("유저 정보를 가져오는데 실패했습니다.", error);
        setLoading(false);
      }
    };

    fetchUserNickname();
  }, []);

  return (
    <div>
      <h4>댓글 작성하기</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>작성자: </label>
          <input
            type="text"
            placeholder="닉네임"
            value={loading ? "" : nickname}
            readOnly
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            value={replycontents}
            onChange={(e) => setReplycontents(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit} >
          댓글 작성</button>
      </form>
      <h4>댓글 목록</h4>
      <ul>
        {replies.map((reply, index) => (
          <li key={index}>
            <p>작성자: {reply.author}</p>
            <p>내용: {reply.contents}</p>
            <p>작성일시: {reply.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplyForm;
