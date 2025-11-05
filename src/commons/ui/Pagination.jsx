import PageArrowButton from "commons/svgs/PageArrowButton";
import "styles/commons/ui/Pagination.scss";

/**
 * 공통 페이지네이션 컴포넌트
 * @param {number} page - 현재 페이지
 * @param {number} totalPages - 전체 페이지 수
 * @param {(newPage: number) => void} onPageChange - 페이지 변경 함수
 * @param {boolean} [isDisabled=false] - 데이터가 없거나 비활성화 상태일 때
 */
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  isDisabled = false,
}) {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const disabledAll = isDisabled || totalPages === 0;

  return (
    <div className="pagination">
      <PageArrowButton
        direction="left"
        disabled={disabledAll || page === 1}
        onClick={handlePrev}
      />

      <span className="page-index">{disabledAll ? 0 : page}</span>

      <PageArrowButton
        direction="right"
        disabled={disabledAll || page === totalPages}
        onClick={handleNext}
      />
    </div>
  );
}
