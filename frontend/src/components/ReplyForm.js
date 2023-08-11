import axios from "axios";
import { useState, useEffect } from "react";
import MyButton from "./MyButton";

const ReplyForm = ({ id }) => {
  const [replycontents, setReplycontents] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const replyData = {
      contents: replycontents,
    };

    if (replycontents.trim() === "") {
      alert("댓글 내용을 입력하세요!");
      return;
    }

    try {
      if (window.confirm("댓글을 작성하시겠습니까?")) {
        axios.post(`/posts/comment/${id}/add`, replyData);

        // 성공적으로 작성되었을 때의 처리 로직
        alert("댓글이 성공적으로 작성되었습니다!");
      }
      window.location.reload(); //새로고침
    } catch (error) {
      // 오류 발생 시의 처리 로직
      alert("댓글 작성에 실패했습니다, 잠시 후에 다시 시도해주세요.");
    } finally {
      setReplycontents("");
    }
  };

  useEffect(() => {
    const fetchUserNickname = async () => {
      try {
        const response = await axios.get("/users/validate");
        const { nickname } = response.data;
        setNickname(nickname);
        setLoggedIn(true);
        setLoading(false);
      } catch (error) {
        setNickname("먼저 로그인하세요!");
        setLoggedIn(false);
        setLoading(false);
      }
    };

    fetchUserNickname();
  }, []);

  return (
    <div className="w-5/6 mx-auto">
      <div className="flex flex-col">
        <div className="flex flex-row p-4">
          <p className="font-semibold text-base">닉네임:</p>
          <input
            className="pl-2 text-base font-semibold text-project"
            type="text"
            placeholder="닉네임"
            value={loading ? "" : nickname}
            readOnly
          />
        </div>
        <div className="border-4 border-orange-200">
          <textarea
            className="p-2 w-full h-32 resize-none outline-none break-words"
            maxLength={"100"}
            value={replycontents}
            onChange={(e) => setReplycontents(e.target.value)}
            required
          />
        </div>
        <span className="pt-4 text-end">
          <MyButton text={"댓글 작성"} onClick={handleSubmit} />
        </span>
      </div>
    </div>
  );
};

export default ReplyForm;
