import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import MyContext from "../components/MyContext";

const FilterDetail = () => {
  const navigate = useNavigate();
  const { handleSaveFilters } = useContext(MyContext);
  const [filters, setFilters] = useState({
    people: "",
    gender: "",
    age: "",
    menu: [],
    conversation: "",
  });

  const handleCheckboxMenuChange = (event) => {
    const { value, checked } = event.target;

    if (value === "상관없음") {
      // '상관없음'을 선택한 경우, 모든 메뉴 옵션의 체크 여부를 업데이트합니다.
      const updatedFilters = {
        ...filters,
        menu: checked ? ["상관없음"] : [],
      };
      setFilters(updatedFilters);
    } else {
      // 다른 메뉴 옵션을 선택한 경우, 해당 옵션을 추가 또는 제거합니다.
      const updatedFilters = {
        ...filters,
        menu: checked
          ? [...filters.menu.filter((item) => item !== "상관없음"), value]
          : filters.menu.filter((item) => item !== value),
      };
      setFilters(updatedFilters);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? value : "",
    }));
  };

  const handleApplyFilters = () => {
    handleSaveFilters(filters);
    navigate("/LetsEat");
  };

  return (
    <div>
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
              name="people"
              checked={filters.people === "상관없음"}
              onChange={handleCheckboxChange}
            />
            상관없음
          </label>
          <label>
            <input
              type="checkbox"
              value="2인"
              name="people"
              checked={filters.people === "2인"}
              onChange={handleCheckboxChange}
            />
            2인
          </label>
          <label>
            <input
              type="checkbox"
              value="3인"
              name="people"
              checked={filters.people === "3인"}
              onChange={handleCheckboxChange}
            />
            3인
          </label>
          <label>
            <input
              type="checkbox"
              value="4인 이상"
              name="people"
              checked={filters.people === "4인 이상"}
              onChange={handleCheckboxChange}
            />
            4인 이상
          </label>
        </div>
        <div>
          <label>
            <h3>성별</h3>
            <input
              type="checkbox"
              value="상관없음"
              name="gender"
              checked={filters.gender === "상관없음"}
              onChange={handleCheckboxChange}
            />
            상관없음
          </label>
          <label>
            <input
              type="checkbox"
              value="동성만"
              name="gender"
              checked={filters.gender === "동성만"}
              onChange={handleCheckboxChange}
            />
            동성만
          </label>
        </div>
        <div>
          <label>
            <h3>나이대</h3>
            <input
              type="checkbox"
              value="상관없음"
              name="age"
              checked={filters.age === "상관없음"}
              onChange={handleCheckboxChange}
            />
            상관없음
          </label>
          <label>
            <input
              type="checkbox"
              value="또래만"
              name="age"
              checked={filters.age === "또래만"}
              onChange={handleCheckboxChange}
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
              onChange={handleCheckboxMenuChange}
            />
            상관없음
          </label>
          <label>
            <input
              type="checkbox"
              value="한식"
              checked={filters.menu.includes("한식")}
              onChange={handleCheckboxMenuChange}
            />
            한식
          </label>
          <label>
            <input
              type="checkbox"
              value="중식"
              checked={filters.menu.includes("중식")}
              onChange={handleCheckboxMenuChange}
            />
            중식
          </label>
          <label>
            <input
              type="checkbox"
              value="일식"
              checked={filters.menu.includes("일식")}
              onChange={handleCheckboxMenuChange}
            />
            일식
          </label>
          <label>
            <input
              type="checkbox"
              value="양식"
              checked={filters.menu.includes("양식")}
              onChange={handleCheckboxMenuChange}
            />
            양식
          </label>
          <label>
            <input
              type="checkbox"
              value="베트남식"
              checked={filters.menu.includes("베트남식")}
              onChange={handleCheckboxMenuChange}
            />
            베트남식
          </label>
          <label>
            <input
              type="checkbox"
              value="분식"
              checked={filters.menu.includes("분식")}
              onChange={handleCheckboxMenuChange}
            />
            분식
          </label>
          <label>
            <input
              type="checkbox"
              value="디저트"
              checked={filters.menu.includes("디저트")}
              onChange={handleCheckboxMenuChange}
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
              name="conversation"
              checked={filters.conversation === "적음"}
              onChange={handleCheckboxChange}
            />
            적음
          </label>
          <label>
            <input
              type="checkbox"
              value="보통"
              name="conversation"
              checked={filters.conversation === "보통"}
              onChange={handleCheckboxChange}
            />
            보통
          </label>
          <label>
            <input
              type="checkbox"
              value="많음"
              name="conversation"
              checked={filters.conversation === "많음"}
              onChange={handleCheckboxChange}
            />
            많음
          </label>
        </div>
        <button onClick={handleApplyFilters}>적용</button>
      </div>
    </div>
  );
};

export default FilterDetail;
