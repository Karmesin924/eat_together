import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Write = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const isEditMode = location.state && location.state.isEditMode;

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    axios
      .get("/users/validate", { cancelToken: source.token })
      .then((res) => {
        if (isMounted && res.status !== 404) {
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        alert("글을 작성하시려면 먼저 로그인해주세요!");
        navigate("/SignIn");
      });

    return () => {
      isMounted = false;
      source.cancel("Request canceled");
    };
  }, [navigate]);

  useEffect(() => {
    // 서버에서 유저 정보를 가져와서 닉네임 고정
    const fetchUserNickname = async () => {
      try {
        const response = await axios.get("/users/validate");
        const { nickname } = response.data;
        setNickname(nickname);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("글을 쓰기 위해서 로그인이 필요합니다!");
          navigate("/SignIn");
        } else {
          setLoading(false);
        }
      }
    };

    fetchUserNickname();
  }, [navigate]);

  useEffect(() => {
    // 수정 모드인 경우 기존 글의 내용을 불러옴
    if (isEditMode && id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/posts/${id}`);
          const { title, contents, nickname } = response.data;
          setTitle(title);
          setContents(contents);
          setNickname(nickname);
        } catch (error) {
          alert("글을 불러올 수 없습니다, 잠시 후에 시도해주세요.");
        }
      };

      fetchPost();
    }
  }, [isEditMode, id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        const shouldUpdate = window.confirm("수정하시겠습니까?");
        if (shouldUpdate) {
          // 글 수정 요청 처리
          const response = await axios.put(`/posts/${id}`, {
            title,
            contents,
          });
          alert("글이 성공적으로 수정되었습니다.");
          navigate(`/posts/${id}`);
        }
      } else {
        const shouldSubmit = window.confirm("작성하시겠습니까?");
        if (shouldSubmit) {
          // 글 작성 요청 처리
          const response = await axios.post("/posts/add", {
            title,
            contents,
          });
          alert("글이 성공적으로 저장되었습니다.");
          navigate("/LetsDo");
        }
      }
    } catch (error) {
      alert("글 저장에 실패했습니다..");
      if (isEditMode) {
        navigate(`/posts/${id}`);
      } else {
        navigate("/LetsDo");
      }
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
              navigate(-1);
            }}
          />
        }
      />
      <div className="flex flex-col pt-10 items-center justify-center">
        <div className="p-4 w-5/6 border-4 border-project rounded-lg">
          <div>
            <input
              className="pt-4 px-4 font-bold text-2xl w-full"
              type="text"
              placeholder="제목을 작성하세요!"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="p-4 flex flex-row justify-between border-b-4 border-orange-100">
              <div>
                <input
                  className=" w-full text-left font-semibold text-lg text-project"
                  type="text"
                  placeholder="닉네임"
                  value={loading ? "" : nickname}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className=" mt-10 border-4 border-orange-300 rounded-lg">
            <textarea
              className="p-2 w-full h-80 resize-none outline-none"
              placeholder="본문을 입력하세요!"
              maxLength={"1000"}
              value={contents}
              onChange={handleContentsChange}
              required
            />
          </div>
          <div className=" pt-6">
            <MyButton
              text={isEditMode ? "수정하기" : "작성하기"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
