import axios from "axios";
import { useEffect, useState } from "react";
import MyButton from "./MyButton";

const ReplyList = ({ id }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    getReplies();
  }, [id]);

  const getReplies = async () => {
    try {
      const response = await axios.get(`/posts/comment/${id}`);
      const repliesData = response.data;
      setReplies(repliesData);
    } catch (err) {
      alert("댓글을 가져오는데 실패했습니다.");
      console.log("댓글을 가져오는데 실패했습니다.", err);
    }
  };

  const handleDelete = (replyId) => {
    console.log("삭제 버튼 클릭");
    axios
      .delete(`/posts/comment/${replyId}`)
      .then((res) => {
        alert("댓글이 삭제되었습니다!");
        getReplies();
      })
      .catch((err) => {
        alert("글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="w-5/6 text-left mx-auto">
      {replies.length === 0 ? (
        <p className="pt-10 font-bold text-lg">
          아직 댓글이 없습니다. 댓글을 달아보세요!
        </p>
      ) : (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <div className="flex flex-row items-center justify-between text-center p-2 border-b-2 border-buttonhover">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center">
                    <p className="flex text-base font-bold text-project">
                      {reply.nickname}
                    </p>
                    <p className="flex p-2 text-left font-bold text-base">
                      {reply.contents}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-semibold text-sm text-gray-500 ">
                      {new Date(
                        reply.createdDate
                          .replace(" at ", " ")
                          .replace(" KST", "")
                      ).toLocaleString("ko-KR", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <p className="w-1/6 items-end">
                  {reply.author && (
                    <MyButton
                      text={"삭제"}
                      onClick={() => {
                        handleDelete(reply.id);
                      }}
                    />
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReplyList;
