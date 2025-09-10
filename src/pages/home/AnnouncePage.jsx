import { EmptyContent } from "commons/emptyContent/EmptyContent";
import PageArrowButton from "commons/svgs/PageArrowButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import "styles/pages/home/AnnouncePage.scss";

const MOCK_NOTICES = [
  {
    id: 1,
    title: "상대방에게 욕설, 비난이 담긴 채팅 신고",
    date: "2025-06-21",
    type: "전체",
  },
  {
    id: 2,
    title: "2025. 07. 21 업데이트 안내",
    date: "2025-06-21",
    type: "업데이트",
  },
  { id: 3, title: "AI 업그레이드 안내", date: "2025-06-21", type: "이벤트" },
  {
    id: 4,
    title: "2026. 08. 21 점검 안내",
    date: "2025-06-21",
    type: "업데이트",
  },
  {
    id: 5,
    title: "상대방에게 욕설, 비난이 담긴 채팅 신고",
    date: "2025-06-21",
    type: "전체",
  },
  { id: 6, title: "서비스 정책 변경 안내", date: "2025-05-30", type: "이벤트" },
  { id: 7, title: "시스템 안정화 패치", date: "2025-05-01", type: "업데이트" },
];

const TABS = ["전체", "이벤트", "업데이트"];
const PAGE_SIZE = 5;

const AnnouncePage = () => {
  const [tab, setTab] = useState("전체");
  const [sort, setSort] = useState("old");
  const [page, setPage] = useState(1);

  // UI 확인용 임시 필터링
  // api로 대체 예정
  const base =
    tab === "전체" ? MOCK_NOTICES : MOCK_NOTICES.filter((n) => n.type === tab);
  const totalPages = Math.max(1, Math.ceil(base.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const items = base.slice(start, start + PAGE_SIZE);

  const handleTab = (next) => {
    setTab(next);
    setPage(1);
  };

  const toPrev = () => setPage((p) => Math.max(1, p - 1));
  const toNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="announce-page-container">
      <h1 className="announce-title">공지사항</h1>

      {/* 탭 */}
      <nav className="announce-navbar">
        <ul>
          {TABS.map((t) => (
            <li
              key={t}
              className={[
                "tab",
                t === tab ? "active" : "",
                t === "이벤트" || t === "업데이트" ? "has-dot" : "",
              ].join(" ")}
              onClick={() => handleTab(t)}
            >
              {t}
            </li>
          ))}
        </ul>
      </nav>

      {/* 리스트 + 정렬 */}
      <div className="announce-list-container">
        <div className="announce-sort">
          <button
            className={sort === "old" ? "active" : ""}
            onClick={() => setSort("old")}
          >
            오래된 순
          </button>
          <button
            className={sort === "new" ? "active" : ""}
            onClick={() => setSort("new")}
          >
            최신 순
          </button>
        </div>

        {items.length === 0 && (
          <div className="empty">
            <EmptyContent />
          </div>
        )}

        {items.map((n) => (
          <div key={n.id} className="announce-item">
            <Link className="title" to={`${n.id}`}>
              {n.title}
            </Link>
            <div className="date">{(n.date || "").replaceAll("-", ".")}</div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="announce-pagination">
        <PageArrowButton
          direction="left"
          disabled={current === 1}
          onClick={toPrev}
        />
        <span className="page-index">{current}</span>
        <PageArrowButton
          direction="right"
          disabled={current === totalPages}
          onClick={toNext}
        />
      </div>
    </div>
  );
};

export default AnnouncePage;
