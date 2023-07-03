import { useLocation, useNavigate } from "react-router-dom";

const FilterDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSaveFilters = location.state?.handleSaveFilters;

  const handleApplyFilters = () => {
    const filters = {
      // 필터 내용을 수집하는 로직 작성
    };
    if (handleSaveFilters) {
      handleSaveFilters(filters);
    }
    navigate("/LetsEat");
  };

  return (
    <div>
      <h3>필터 상세 설정</h3>
      {/* 필터 설정 컴포넌트들 */}
      <button onClick={handleApplyFilters}>적용</button>
    </div>
  );
};

export default FilterDetail;
