import { EmptyContent } from "commons/emptyContent/EmptyContent";
import Pagination from "commons/ui/Pagination";
import { mockQnaList } from "constants/faqList";
import { SERVICE_CENTER_FAQ_URL } from "constants/url";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "styles/pages/home/ServiceHelpPage.scss";
import { formatDate } from "utils/time";

// 한 페이지 5개 기준
const PAGE_SIZE = 5;

const ServiceFAQPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [qnaList, setQnaList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // URL 파라미터에서 page, keyword
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentKeyword = searchParams.get("keyword") || "";

  // ------------------------
  // Mock 데이터 페이징 처리
  // ------------------------
  const fetchQnAList = (keyword = "", page = 1) => {
    setLoading(true);

    // 1. 키워드 필터링
    let filtered = mockQnaList;
    if (keyword.trim() !== "") {
      filtered = mockQnaList.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // 2. 총 페이지 계산
    const pages = Math.ceil(filtered.length / PAGE_SIZE);
    setTotalPages(pages);

    // 3. 페이지 슬라이싱
    const startIdx = (page - 1) * PAGE_SIZE;
    const pagedData = filtered.slice(startIdx, startIdx + PAGE_SIZE);

    setQnaList(pagedData);
    setLoading(false);
  };

  // URL 변경 시마다 mock 데이터 로드
  useEffect(() => {
    fetchQnAList(currentKeyword, currentPage);
  }, [currentPage, currentKeyword]);

  // 페이지 이동
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="servicehelp-page-container">
      <div className="servicehelp-top">
        <h1 className="servicehelp-title">자주 묻는 질문</h1>
      </div>

      <div className="qna-list-container">
        {loading ? (
          <div className="empty">로딩 중...</div>
        ) : qnaList.length === 0 ? (
          <div className="empty">
            <EmptyContent />
          </div>
        ) : (
          qnaList.map((qna) => (
            <div key={`qna-${qna.inquiryId}`} className="qna-item">
              <div className="qna-item-left">
                <Link
                  className="title"
                  to={`${SERVICE_CENTER_FAQ_URL}/${qna.inquiryId}`}
                >
                  {qna.title}
                </Link>
              </div>

              <div className="meta">
                <span className="date">{formatDate(qna.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="qna-pagination">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isDisabled={qnaList.length === 0}
        />
      </div>
    </div>
  );
};

export default ServiceFAQPage;
