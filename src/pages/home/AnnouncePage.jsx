import { EmptyContent } from "commons/emptyContent/EmptyContent";
import { useState } from "react";
import { Link } from "react-router-dom";
import "styles/pages/home/AnnouncePage.scss";
import { HOME_ANNOUNCE_TABS } from "constants/home";
import AnnounceSortButtons from "components/home/AnnounceSortButton";
import { formatDate } from "utils/time";
import Pagination from "commons/ui/Pagination";

const MOCK_NOTICES = [
  {
    notificationId: 1,
    title: "상대방에게 욕설, 비난이 담긴 채팅 신고",
    createdAt: "2025-06-21",
    type: "전체",
    writer: "묘묘",
  },
  {
    notificationId: 2,
    title: "2025. 07. 21 업데이트 안내",
    createdAt: "2025-06-21",
    type: "업데이트",
    writer: "묘묘",
  },
  {
    notificationId: 3,
    title: "AI 업그레이드 안내",
    createdAt: "2025-06-21",
    type: "이벤트",
    writer: "묘묘",
  },
  {
    notificationId: 4,
    title: "2026. 08. 21 점검 안내",
    createdAt: "2025-06-21",
    type: "업데이트",
    writer: "묘묘",
  },
  {
    notificationId: 5,
    title: "상대방에게 욕설, 비난이 담긴 채팅 신고",
    createdAt: "2025-06-21",
    type: "전체",
    writer: "묘묘",
  },
  {
    notificationId: 6,
    title: "서비스 정책 변경 안내",
    createdAt: "2025-05-30",
    type: "이벤트",
    writer: "묘묘",
  },
  {
    notificationId: 7,
    title: "시스템 안정화 패치",
    createdAt: "2025-05-01",
    type: "업데이트",
    writer: "묘묘",
  },
];

const PAGE_SIZE = 5;

const getTabClassName = (tabName, currentTab) => {
  const classes = ["tab"];
  if (tabName === currentTab) classes.push("active");
  if (tabName === "이벤트" || tabName === "업데이트") classes.push("has-dot");
  return classes.join(" ");
};

const AnnouncePage = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [sortOrder, setSortOrder] = useState("old");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNotices =
    activeTab === "전체"
      ? MOCK_NOTICES
      : MOCK_NOTICES.filter((notice) => notice.type === activeTab);

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (sortOrder === "new")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const totalPages = Math.max(1, Math.ceil(sortedNotices.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentItems = sortedNotices.slice(startIndex, startIndex + PAGE_SIZE);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

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

      <div className="announce-list-container">
        <AnnounceSortButtons sortOrder={sortOrder} onChange={setSortOrder} />

        {currentItems.length === 0 ? (
          <div className="empty">
            <EmptyContent />
          </div>
        ) : (
          currentItems.map((notice, idx) => (
            <div
              key={`${notice.notificationId}-${idx}`}
              className="announce-item"
            >
              <Link className="title" to={`/announce/${notice.notificationId}`}>
                {notice.title}
              </Link>
              <div className="date">{formatDate(notice.createdAt)}</div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="announce-pagination">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isDisabled={currentItems.length === 0}
        />
      </div>
    </div>
  );
};

export default AnnouncePage;
