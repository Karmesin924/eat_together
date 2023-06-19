import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Board from "../components/Board";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  useEffect(() => {
    const getBoard = async () => {
      try {
        const resp = await axios.get(`backend/posts/board/${idx}`);
        setBoard(resp.data);
        setLoading(false);
      } catch (err) {
        console.log("게시글을 가져오는데 실패했습니다.", err);
        setLoading(false);
      }
    };

    getBoard();
  }, [idx]);

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
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          idx={board.idx}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
        />
      )}
    </div>
  );
};

export default BoardDetail;
