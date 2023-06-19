import React, { useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

function LetsDo() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "사용자1",
      content: "첫 번째 게시글입니다.",
      comments: [
        { id: 1, author: "사용자2", content: "첫 번째 답변입니다." },
        { id: 2, author: "사용자3", content: "두 번째 답변입니다." },
      ],
    },
    {
      id: 2,
      author: "사용자4",
      content: "두 번째 게시글입니다.",
      comments: [],
    },
  ]);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글을 추적합니다.
  const [showForm, setShowForm] = useState(false); // 게시글 작성 폼 표시 여부를 추적합니다.
  const [newPost, setNewPost] = useState("");
  const [nickname, setNickname] = useState("");

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
  };

  const handleWriteButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPostObject = {
      id: posts.length + 1,
      author: nickname,
      content: newPost,
      comments: [],
    };

    setPosts([...posts, newPostObject]);
    setNewPost("");
    setNickname("");
    setShowForm(false);
  };

  return (
    <div>
      <MyHeader
        headText={"같이 하자"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate("/");
            }}
          />
        }
      />
      {/* 게시글 작성 버튼 */}
      {!showForm && <button onClick={handleWriteButtonClick}>글쓰기</button>}

      {/* 게시글 작성 폼 */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="글을 작성해주세요"
          />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />
          <button type="submit">글 작성</button>
        </form>
      )}

      {/* 게시글 목록 */}
      {posts.map((post) => (
        <div key={post.id} onClick={() => handlePostClick(post.id)}>
          <h3>{post.author}</h3>
          <p>{post.content}</p>
        </div>
      ))}

      {/* 선택된 게시글 내용 및 답변 */}
      {selectedPost && (
        <div>
          <h3>{posts[selectedPost - 1].author}</h3>
          <p>{posts[selectedPost - 1].content}</p>

          {/* 답변 목록 */}
          {posts[selectedPost - 1].comments.map((comment) => (
            <div key={comment.id}>
              <h4>{comment.author}</h4>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LetsDo;
