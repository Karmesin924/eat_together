import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyButton from "./MyButton";

const ReplyForm = () => {
  const navigate = useNavigate();
  const [replycontents, setReplycontents] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const { postIdx } = useParams();
  const [replies, setReplies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/users/validate");
      if (response.status === 404) {
        alert("댓글을 작성하려면 먼저 로그인을 해주세요.");
        navigate("/SignIn");
        return; // 함수 실행 중단
      }
    } catch (err) {
      console.log("로그인이 되어있습니다.");
    }

    const replyData = {
      contents: replycontents,
    };

    try {
      const response = await axios.post(
        `/posts/comment/${postIdx}/add`,
        replyData
      );
      // 성공적으로 작성되었을 때의 처리 로직
      console.log("댓글이 성공적으로 작성되었습니다.", response.data);
      alert("댓글이 성공적으로 작성되었습니다.");
      setReplies((prevReplies) => [...prevReplies, response.data]);
    } catch (error) {
      // 오류 발생 시의 처리 로직
      alert("댓글 작성에 실패했습니다.");
      console.log("댓글 작성에 실패했습니다.", error);
    } finally {
      setReplycontents("");
    }
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
    <div className="w-4/5 mx-auto">
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
        <span className="pt-4">
          <MyButton text={"댓글 작성"} onClick={handleSubmit} />
        </span>
      </div>
    </div>
  );
};

export default ReplyForm;
