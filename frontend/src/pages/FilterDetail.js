import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import MyContext from "../components/MyContext";

const FilterDetail = () => {
  const navigate = useNavigate();
  const { handleSaveFilters } = useContext(MyContext);
  const [isFormComplete, setFormComplete] = useState(false);
  const [filters, setFilters] = useState({
    people: "",
    gender: "",
    age: "",
    menu: "",
    conversation: "",
  });

  //필터 모두 선택 확인
  useEffect(() => {
    setFormComplete(Object.values(filters).every((value) => value !== ""));
  }, [filters]);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? value : "",
    }));
  };

  const handleApplyFilters = () => {
    if (!isFormComplete) {
      alert("모든 필터를 선택해 주세요");
      return;
    }

    const updatedFilters = {
      ...filters,
      people: filters.people || "상관없음",
      gender: filters.gender || "상관없음",
      age: filters.age || "상관없음",
      menu: filters.menu || "상관없음",
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
        <div className="flex flex-col w-full md:w-1/2 p-4 items-center border-4 border-project rounded-xl">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center text-lg font-medium">
              <p className=" text-xl font-bold p-5">인원</p>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.people === "any"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="any"
                  name="people"
                  checked={filters.people === "any"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.people === "2"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="2"
                  name="people"
                  checked={filters.people === "2"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">2인</span>
              </label>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.people === "3"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="3"
                  name="people"
                  checked={filters.people === "3"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">3인</span>
              </label>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.people === "4"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="4"
                  name="people"
                  checked={filters.people === "4"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">4인</span>
              </label>
            </div>
            <div className="flex flex-row text-lg font-medium items-center gap-2">
              <p className=" text-xl font-bold p-5">성별</p>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.gender === "any"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="any"
                  name="gender"
                  checked={filters.gender === "any"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.gender === "same"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="same"
                  name="gender"
                  checked={filters.gender === "same"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">동성만</span>
              </label>
            </div>
            <div className="flex flex-row text-lg font-medium items-center gap-2">
              <p className=" text-xl font-bold p-5 pr-1">나이대</p>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.age === "any"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="any"
                  name="age"
                  checked={filters.age === "any"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">상관없음</span>
              </label>
              <label
                className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                  filters.age === "peer"
                    ? "border-none bg-project text-white"
                    : ""
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  value="peer"
                  name="age"
                  checked={filters.age === "peer"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1 mr-1">또래만(±2)</span>
              </label>
            </div>

            <div className="flex flex-row items-center pl-2 font-medium text-lg">
              <p className="text-xl font-bold p-5 pl-3 whitespace-nowrap">
                메뉴
              </p>
              <div className="flex flex-wrap gap-2">
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "any"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="any"
                    name="menu"
                    checked={filters.menu === "any"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">상관없음</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Korean"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Korean"
                    name="menu"
                    checked={filters.menu === "Korean"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">한식</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Chinese"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Chinese"
                    name="menu"
                    checked={filters.menu === "Chinese"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">중식</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Japanese"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Japanese"
                    name="menu"
                    checked={filters.menu === "Japanese"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">일식</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Western"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Western"
                    name="menu"
                    checked={filters.menu === "Western"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">양식</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Vietnamese"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Vietnamese"
                    name="menu"
                    checked={filters.menu === "Vietnamese"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">베트남식</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Bunsik"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Bunsik"
                    name="menu"
                    checked={filters.menu === "Bunsik"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">분식</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.menu === "Dessert"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Dessert"
                    name="menu"
                    checked={filters.menu === "Dessert"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">디저트</span>
                </label>
              </div>
            </div>

            <div className="flex flex-row text-lg font-medium items-center">
              <p className=" text-xl font-bold p-5">
                대화
                <br />
                빈도
              </p>
              <div className="flex flex-wrap gap-2">
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.conversation === "Little"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Little"
                    name="conversation"
                    checked={filters.conversation === "Little"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">적음</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.conversation === "Normal"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Normal"
                    name="conversation"
                    checked={filters.conversation === "Normal"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">보통</span>
                </label>
                <label
                  className={`flex h-auto rounded-2xl cursor-pointer m-0 border-2 border-project bg-orange-100${
                    filters.conversation === "Many"
                      ? "border-none bg-project text-white"
                      : ""
                  }`}
                >
                  <input
                    className="hidden"
                    type="checkbox"
                    value="Many"
                    name="conversation"
                    checked={filters.conversation === "Many"}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1 mr-1">많음</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <MyButton text={"적용하기"} onClick={handleApplyFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterDetail;
