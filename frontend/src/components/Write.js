import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [author, setAuthor] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatDateForDisplay = (dateString) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = weekdays[date.getDay()];
    return `${year}-${month}-${day} (${weekday})`;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/posts/add", {
        title,
        contents,
      });
      console.log("글이 성공적으로 저장되었습니다.", response.data);
      navigate("/");
    } catch (error) {
      console.log("글 저장에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <MyHeader
        headText={"글 쓰기"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate("/");
            }}
          />
        }
      />
      <div>
        <input
          type="text"
          placeholder="닉네임"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="제목을 작성하세요!"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <input
          type="text"
          value={formatDateForDisplay(getCurrentDateTime())}
          readOnly
        />
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요!"
          value={contents}
          onChange={handleContentsChange}
        />
      </div>
      <div>
        <MyButton text={"작성하기"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Write;
