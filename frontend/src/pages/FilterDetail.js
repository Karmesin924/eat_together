import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import MyContext from "../components/MyContext";

const FilterDetail = () => {
  const navigate = useNavigate();
  const handleSaveFilters = useContext(MyContext);
  const [filters, setFilters] = useState({
    people: "",
    gender: "",
    age: "",
    menu: [],
    conversation: "",
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedFilters = {
      ...filters,
      menu: checked
        ? [...filters.menu, value]
        : filters.menu.filter((item) => item !== value),
    };
    setFilters(updatedFilters);
  };

  useEffect(() => {
    if (handleSaveFilters) {
      handleSaveFilters(filters);
    }
  }, [handleSaveFilters, filters]);

  const handleApplyFilters = () => {
    handleSaveFilters(filters);
    navigate("/LetsEat");
  };

  return (
    <div>
      <MyContext.Provider value={handleSaveFilters}>
        <MyHeader
          headText={"같이 먹자"}
          leftChild={
            <MyButton
              text={"뒤로가기"}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
        />
        <h1>필터 상세 설정</h1>
        <div>
          <div>
            <label>
              <h3>인원</h3>
              <input
                type="checkbox"
                value="상관없음"
                checked={filters.people === "상관없음"}
                onChange={(event) =>
                  setFilters({ ...filters, people: event.target.value })
                }
              />
              상관없음
              <input
                type="checkbox"
                value="2인"
                checked={filters.people === "2인"}
                onChange={(event) =>
                  setFilters({ ...filters, people: event.target.value })
                }
              />
              2인
              <input
                type="checkbox"
                value="3인"
                checked={filters.people === "3인"}
                onChange={(event) =>
                  setFilters({ ...filters, people: event.target.value })
                }
              />
              3인
              <input
                type="checkbox"
                value="4인 이상"
                checked={filters.people === "4인 이상"}
                onChange={(event) =>
                  setFilters({ ...filters, people: event.target.value })
                }
              />
              4인 이상
            </label>
          </div>
          <div>
            <h3>성별</h3>
            <label>
              <input
                type="checkbox"
                value="상관없음"
                checked={filters.gender === "상관없음"}
                onChange={(event) =>
                  setFilters({ ...filters, gender: event.target.value })
                }
              />
              상관없음
              <input
                type="checkbox"
                value="동성만"
                checked={filters.gender === "동성만"}
                onChange={(event) =>
                  setFilters({ ...filters, gender: event.target.value })
                }
              />
              동성만
            </label>
          </div>
          <div>
            <h3>나이대</h3>
            <label>
              <input
                type="checkbox"
                value="상관없음"
                checked={filters.age === "상관없음"}
                onChange={(event) =>
                  setFilters({ ...filters, age: event.target.value })
                }
              />
              상관없음
              <input
                type="checkbox"
                value="또래만"
                checked={filters.age === "또래만"}
                onChange={(event) =>
                  setFilters({ ...filters, age: event.target.value })
                }
              />
              또래만
            </label>
          </div>
          <div>
            <h3>메뉴 (중복선택 가능)</h3>
            <label>
              <input
                type="checkbox"
                value="상관없음"
                checked={filters.menu === "상관없음"}
                onChange={handleCheckboxChange}
              />
              상관없음
              <input
                type="checkbox"
                value="한식"
                checked={filters.menu.includes("한식")}
                onChange={handleCheckboxChange}
              />
              한식
              <input
                type="checkbox"
                value="중식"
                checked={filters.menu.includes("중식")}
                onChange={handleCheckboxChange}
              />
              중식
              <input
                type="checkbox"
                value="일식"
                checked={filters.menu.includes("일식")}
                onChange={handleCheckboxChange}
              />
              일식
              <input
                type="checkbox"
                value="양식"
                checked={filters.menu.includes("양식")}
                onChange={handleCheckboxChange}
              />
              양식
              <input
                type="checkbox"
                value="베트남식"
                checked={filters.menu.includes("베트남식")}
                onChange={handleCheckboxChange}
              />
              베트남식
              <input
                type="checkbox"
                value="분식"
                checked={filters.menu.includes("분식")}
                onChange={handleCheckboxChange}
              />
              분식
              <input
                type="checkbox"
                value="디저트"
                checked={filters.menu.includes("디저트")}
                onChange={handleCheckboxChange}
              />
              디저트
            </label>
          </div>
          <div>
            <h3>식사 시 대화빈도</h3>
            <label>
              <input
                type="checkbox"
                value="적음"
                checked={filters.conversation === "적음"}
                onChange={(event) =>
                  setFilters({ ...filters, conversation: event.target.value })
                }
              />
              적음
              <input
                type="checkbox"
                value="보통"
                checked={filters.conversation === "보통"}
                onChange={(event) =>
                  setFilters({ ...filters, conversation: event.target.value })
                }
              />
              보통
              <input
                type="checkbox"
                value="많음"
                checked={filters.conversation === "많음"}
                onChange={(event) =>
                  setFilters({ ...filters, conversation: event.target.value })
                }
              />
              많음
            </label>
          </div>
          <button onClick={handleApplyFilters}>적용</button>
        </div>
      </MyContext.Provider>
    </div>
  );
};

export default FilterDetail;
