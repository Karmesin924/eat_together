import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReplyForm = () => {
  const navigate = useNavigate();
  const [replycontents, setReplycontents] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const { postIdx } = useParams();
  const [replies, setReplies] = useState([]);

  const handleSubmit = async (e) => {
    axios
      .get("/users/validate")
      .then((res) => {
        if (res.status === 404) {
          alert("댓글을 작성하려면 먼저 로그인을 해주세요.");
          navigate("/SignIn");
        }
      })
      .catch((err) => {
        console.log("로그인이 되어있습니다.");
      });

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
      setReplies([...replies, response.data]);
    } catch (error) {
      // 오류 발생 시의 처리 로직
      alert("댓글 작성에 실패했습니다.");
      console.log("댓글 작성에 실패했습니다.", error);
    }
    // 입력 필드 초기화
    setReplycontents("");
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임: </label>
          <input
            type="text"
            placeholder="닉네임"
            value={loading ? "" : nickname}
            readOnly
          />
        </div>
        <div>
          <h3>내용</h3>
          <textarea
            value={replycontents}
            onChange={(e) => setReplycontents(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit}>댓글 작성</button>
        <hr />
      </form>
    </div>
  );
};

export default ReplyForm;
