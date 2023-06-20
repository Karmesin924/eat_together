import axios from "axios";
import { useState } from "react";

const ReplyForm = () => {
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const replyData = {
      text: replyText,
      author: replyAuthor,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post("backend/posts/reply", replyData);
      // 성공적으로 작성되었을 때의 처리 로직
      console.log("댓글이 성공적으로 작성되었습니다.", response.data);
    } catch (error) {
      // 오류 발생 시의 처리 로직
      console.log("댓글 작성에 실패했습니다.", error);
    }
    // 입력 필드 초기화
    setReplyText("");
    setReplyAuthor("");
  };

  return (
    <div>
      <h4>댓글 작성하기</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>작성자:</label>
          <input
            type="text"
            value={replyAuthor}
            onChange={(e) => setReplyAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
};

export default ReplyForm;
