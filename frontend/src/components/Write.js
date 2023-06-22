import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Write = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [nickname, setnickname] = useState("");
  const isEditMode = location.state && location.state.isEditMode;

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

  useEffect(() => {
    // 수정 모드인 경우 기존 글의 내용을 불러옴
    if (isEditMode && idx) {
      axios
        .get(`/posts/${idx}`)
        .then((res) => {
          const { title, contents, nickname } = res.data;
          setTitle(title);
          setContents(contents);
          setnickname(nickname);
        })
        .catch((err) => {
          console.log("글 불러오기에 실패했습니다.", err);
        });
    }
  }, [isEditMode, idx]);

  // useEffect(() => {
  //   // 더미 데이터
  //   const dummyData = {
  //     title: "더미 제목",
  //     contents: "더미 내용",
  //     nickname: "더미 작성자",
  //   };

  //   // 수정 모드인 경우 기존 글의 내용을 불러옴
  //   if (isEditMode) {
  //     // 더미 데이터를 사용하여 값 설정
  //     setTitle(dummyData.title);
  //     setContents(dummyData.contents);
  //     setnickname(dummyData.nickname);
  //   }
  // }, [isEditMode]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setnickname(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // 수정 요청 처리
        const response = await axios.put(`/posts/${idx}`, {
          title,
          contents,
        });
        console.log("글이 성공적으로 수정되었습니다.", response.data);
        navigate(`/board/${idx}`);
      } else {
        // 글 작성 요청 처리
        const response = await axios.post("/posts/add", {
          title,
          contents,
        });
        console.log("글이 성공적으로 저장되었습니다.", response.data);
        navigate("/LetsDo");
      }
    } catch (error) {
      console.log("글 저장 또는 수정에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <MyHeader
        headText={isEditMode ? "글 수정" : "글 쓰기"}
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
          value={nickname}
          onChange={handleNicknameChange}
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
        <MyButton
          text={isEditMode ? "수정하기" : "작성하기"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Write;
