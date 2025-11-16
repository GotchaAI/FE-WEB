import { EmptyContent } from "commons/emptyContent/EmptyContent";
import CheckBox from "commons/svgs/CheckBox";
import Pagination from "commons/ui/Pagination";
import HomeSearch from "components/home/HomeSearch";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getQnAListAPI } from "services/home/serviceCenter";
import "styles/pages/home/ServiceHelpPage.scss";
import { formatDate } from "utils/time";

const ServiceHelpPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [qnaList, setQnaList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // URL 파라미터에서 page, keyword 가져오기
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentKeyword = searchParams.get("keyword") || "";

  const fetchQnAList = async (keyword = "", page = 1, sort = "DATE_DESC") => {
    setLoading(true);
    setError(null);

    try {
      const res = await getQnAListAPI({
        keyword,
        page: page - 1,
        sort,
      });

      if (res?.content && res.content.length > 0) {
        setQnaList(res.content);
        setTotalPages(res.page.totalPages);
      } else {
        setQnaList([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError("QNA를 불러오는 중 오류가 발생했습니다.");
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  /** 페이지/정렬 변경 시 URL 갱신 */
  const updateSearchParams = (page = currentPage) => {
    setSearchParams({ page: String(page) });
  };

  /** 페이지 이동 핸들러 */
  const handlePageChange = (newPage) => {
    updateSearchParams(newPage);
  };

  /** URL 변경 시마다 데이터 다시 불러오기 */
  useEffect(() => {
    fetchQnAList(currentKeyword, currentPage);
  }, [currentPage, currentKeyword]);

  /** 키워드 검색 */
  const handleSearch = (keyword) => {
    setSearchParams({
      // page: 1, // 검색시 1페이지로
      keyword: keyword ?? "",
    });
  };

  return (
    <div className="servicehelp-page-container">
      <div className="servicehelp-top">
        <h1 className="servicehelp-title">도움말 검색</h1>
        <div className="servicehelp-right">
          <HomeSearch onSearch={handleSearch} />
          <div>
            <CheckBox /> 내가 쓴 글
          </div>
        </div>
      </div>

      {/* 공지 리스트 */}
      <div className="qna-list-container">
        {loading ? (
          <div className="empty">로딩 중...</div>
        ) : error ? (
          <div className="empty">{error}</div>
        ) : qnaList.length === 0 ? (
          <div className="empty">
            <EmptyContent />
          </div>
        ) : (
          qnaList.map((qna) => (
            <div key={`qna-${qna.inquiryId}`} className="qna-item">
              <div className="qna-item-left">
                <span
                  className={`status-badge ${
                    qna.isSolved ? "done" : "pending"
                  }`}
                >
                  {qna.isSolved ? "답변완료" : "답변대기"}
                </span>
                <Link className="title" to={`/service-center/${qna.inquiryId}`}>
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

      <div className="mooni-container">
        <button
          className="mooni-btn"
          onClick={() => navigate("/service-center/post")}
        >
          나도 문의하기
        </button>
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

export default ServiceHelpPage;
