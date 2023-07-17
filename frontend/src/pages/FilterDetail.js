import { useContext, useState } from "react";
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
    const isUnchecked = !checked;

    if (value === "상관없음") {
      const updatedFilters = {
        ...filters,
        menu: isUnchecked ? [] : [value],
      };
      setFilters(updatedFilters);
    } else {
      const hasUncheckedNone = filters.menu.includes("상관없음") && isUnchecked;
      const updatedFilters = {
        ...filters,
        menu: hasUncheckedNone
          ? [value]
          : isUnchecked
          ? filters.menu.filter((item) => item !== value)
          : [...filters.menu.filter((item) => item !== "상관없음"), value],
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
    const updatedFilters = {
      ...filters,
      people: filters.people || "상관없음",
      gender: filters.gender || "상관없음",
      age: filters.age || "상관없음",
      menu: filters.menu.length === 0 ? ["상관없음"] : filters.menu,
      conversation: filters.conversation || "상관없음",
    };
    handleSaveFilters(updatedFilters);
    navigate("/LetsEat");
  };

  return (
    <div>
      <MyHeader
        headText={"필터 상세 설정"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div className="flex p-4 pt-10 justify-center items-center">
        <div className="flex flex-col w-1/2 p-4 items-center border-4 border-project rounded-xl">
          <div className="flex flex-col">
            <div className="flex flex-row text-lg font-medium">
              <p className=" text-2xl font-bold p-5">인원</p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="상관없음"
                  name="people"
                  checked={filters.people === "상관없음"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="2인"
                  name="people"
                  checked={filters.people === "2인"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">2인</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="3인"
                  name="people"
                  checked={filters.people === "3인"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">3인</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="4인"
                  name="people"
                  checked={filters.people === "4인"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">4인</span>
              </label>
            </div>
            <div className="flex flex-row text-lg font-medium">
              <p className=" text-2xl font-bold p-5">성별</p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="상관없음"
                  name="gender"
                  checked={filters.gender === "상관없음"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="동성만"
                  name="gender"
                  checked={filters.gender === "동성만"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">동성만</span>
              </label>
            </div>
            <div className="flex flex-row text-lg font-medium">
              <p className=" text-2xl font-bold p-5">나이대</p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="상관없음"
                  name="age"
                  checked={filters.age === "상관없음"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="또래만"
                  name="age"
                  checked={filters.age === "또래만"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">또래만</span>
              </label>
            </div>
            <div className="flex flex-row text-lg font-medium">
              <p className=" text-2xl font-bold p-5">
                메뉴<span className="text-xl pl-1">(중복선택가능)</span>
              </p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="상관없음"
                  checked={filters.menu.includes("상관없음")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="한식"
                  checked={filters.menu.includes("한식")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">한식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="중식"
                  checked={filters.menu.includes("중식")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">중식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="일식"
                  checked={filters.menu.includes("일식")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">일식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="양식"
                  checked={filters.menu.includes("양식")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">양식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="베트남식"
                  checked={filters.menu.includes("베트남식")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">베트남식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="분식"
                  checked={filters.menu.includes("분식")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">분식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="디저트"
                  checked={filters.menu.includes("디저트")}
                  onChange={handleCheckboxMenuChange}
                />
                <span className="ml-1 mr-1">디저트</span>
              </label>
            </div>
            <div className="flex flex-row text-lg font-medium">
              <p className=" text-2xl font-bold p-5">식사 시 대화빈도</p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="적음"
                  name="conversation"
                  checked={filters.conversation === "적음"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">적음</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="보통"
                  name="conversation"
                  checked={filters.conversation === "보통"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">보통</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="많음"
                  name="conversation"
                  checked={filters.conversation === "많음"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">많음</span>
              </label>
            </div>
          </div>
          <MyButton text={"적용하기"} onClick={handleApplyFilters} />
        </div>
      </div>
    </div>
  );
};

export default FilterDetail;
