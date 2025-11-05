import { EmptyContent } from "commons/emptyContent/EmptyContent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "styles/pages/home/AnnouncePage.scss";
import { HOME_ANNOUNCE_TABS } from "constants/home";
import AnnounceSortButtons from "components/home/AnnounceSortButton";
import { formatDate } from "utils/time";
import Pagination from "commons/ui/Pagination";
import { getAnnounceListAPI } from "services/home/announce";

const getTabClassName = (tabName, currentTab) => {
  const classes = ["tab"];
  if (tabName === currentTab) classes.push("active");
  if (tabName === "이벤트" || tabName === "업데이트") classes.push("has-dot");
  return classes.join(" ");
};

const AnnouncePage = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [sortOrder, setSortOrder] = useState("DATE_DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** ✅ 공지사항 API 호출 */
  const fetchNotices = async (page = 1, sort = sortOrder) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAnnounceListAPI({
        keyword: "",
        page: page - 1, // 서버는 0부터 시작
        sort,
      });

      console.log(res.page.totalPages);

      // ✅ 응답 데이터 안전 처리
      if (res?.content && res.content.length > 0) {
        setNotices(res.content);
        setTotalPages(res.page.totalPages);
      } else {
        setNotices([]);
        setTotalPages(0); // ✅ 페이지가 없으면 0으로
      }
    } catch (err) {
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  /** ✅ 최초 로드 및 정렬/페이지 변경 시 다시 호출 */
  useEffect(() => {
    fetchNotices(currentPage, sortOrder);
  }, [currentPage, sortOrder]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  return (
    <div className="announce-page-container">
      <h1 className="announce-title">공지사항</h1>

      {/* 🔹 탭 */}
      <nav className="announce-navbar">
        <ul>
          {HOME_ANNOUNCE_TABS.map((tabName) => (
            <li
              key={tabName}
              className={getTabClassName(tabName, activeTab)}
              onClick={() => handleTabClick(tabName)}
            >
              {tabName}
            </li>
          ))}
        </ul>
      </nav>

      {/* 🔹 공지 리스트 */}
      <div className="announce-list-container">
        <AnnounceSortButtons
          sortOrder={sortOrder}
          onChange={(order) => {
            setSortOrder(order === "DATE_DESC" ? "DATE_DESC" : "DATE_ASC");
            setCurrentPage(1);
          }}
        />

        {loading ? (
          <div className="empty">로딩 중...</div>
        ) : error ? (
          <div className="empty">{error}</div>
        ) : notices.length === 0 ? (
          <div className="empty">
            <EmptyContent />
          </div>
        ) : (
          notices.map((notice) => (
            <div key={notice.notificationId} className="announce-item">
              <Link className="title" to={`/announce/${notice.notificationId}`}>
                {notice.title}
              </Link>
              <div className="meta">
                <span className="date">{formatDate(notice.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="announce-pagination">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isDisabled={notices.length === 0}
        />
      </div>
    </div>
  );
};

export default AnnouncePage;
