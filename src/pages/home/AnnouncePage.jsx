import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "styles/pages/home/AnnouncePage.scss";
import { HOME_ANNOUNCE_TABS } from "constants/home";
import { formatDate } from "utils/time";
import Pagination from "commons/ui/Pagination";
import { getAnnounceListAPI } from "services/home/announce";
import { EmptyContent } from "commons/emptyContent/EmptyContent";
import AnnounceSortButtons from "commons/ui/button/AnnounceSortButton";
import useUserInformationStore from "store/userInformation";
import { getAnnounceDetailLink } from "utils/user";

const getTabClassName = (tabName, currentTab) => {
  const classes = ["tab"];
  if (tabName === currentTab) classes.push("active");
  if (tabName === "이벤트" || tabName === "업데이트") classes.push("has-dot");
  return classes.join(" ");
};

const AnnouncePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState("전체");
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL 파라미터에서 page, sort 가져오기
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortOrder = searchParams.get("sort") || "DATE_DESC";

  const profile = useUserInformationStore((state) => state.profile);
  const isAdminMode =
    profile?.role === "ADMIN" && window.location.href.includes("admin");

  /** 공지사항 API 호출 */
  const fetchNotices = async (page = 1, sort = "DATE_DESC") => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAnnounceListAPI({
        keyword: "",
        page: page - 1, // 서버는 0부터 시작
        sort,
      });

      if (res?.content && res.content.length > 0) {
        setNotices(res.content);
        setTotalPages(res.page.totalPages);
      } else {
        setNotices([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  /** 페이지/정렬 변경 시 URL 갱신 */
  const updateSearchParams = (page = currentPage, sort = sortOrder) => {
    setSearchParams({ page: String(page), sort });
  };

  /** 페이지 이동 핸들러 */
  const handlePageChange = (newPage) => {
    updateSearchParams(newPage, sortOrder);
  };

  /** 정렬 변경 핸들러 */
  const handleSortChange = (order) => {
    const newOrder = order === "DATE_DESC" ? "DATE_DESC" : "DATE_ASC";
    updateSearchParams(1, newOrder); // 정렬 바꾸면 1페이지로 이동
  };

  /** 탭 클릭 시 1페이지로 리셋 */
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    updateSearchParams(1, sortOrder);
  };

  /** URL 변경 시마다 데이터 다시 불러오기 */
  useEffect(() => {
    fetchNotices(currentPage, sortOrder);
  }, [currentPage, sortOrder]);

  return (
    <div className="announce-page-container">
      <h1 className="announce-title">공지사항</h1>

      {/* 탭 */}
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

      {/* 공지 리스트 */}
      <div className="announce-list-container">
        <AnnounceSortButtons
          sortOrder={sortOrder}
          onChange={handleSortChange}
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
            <div
              key={`notice-${notice.notificationId}`}
              className="announce-item"
            >
              <Link
                className="title"
                to={getAnnounceDetailLink(isAdminMode, notice.notificationId)}
              >
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
          onPageChange={handlePageChange}
          isDisabled={notices.length === 0}
        />
      </div>
    </div>
  );
};

export default AnnouncePage;
