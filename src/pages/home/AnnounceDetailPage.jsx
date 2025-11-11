import AnnounceBear from "commons/svgs/AnnounceBear";
import CloseButton from "commons/ui/button/CloseButton";
import { useNavigate, useParams } from "react-router-dom";
import "styles/pages/home/AnnounceDetailPage.scss";
import { formatDate } from "utils/time";
import { useEffect, useState } from "react";
import { getAnnounceDetailAPI } from "services/home/announce";

/** 🔹 공통 상태 컴포넌트 */
const AnnounceStatus = ({ type, message }) => (
  <div className="announce-detail-page-container">
    <h1 className="announce-detail-title">공지사항</h1>
    <div className={`announce-detail-${type}`}>{message}</div>
  </div>
);

const AnnounceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  const closeDetailPage = () => navigate(-1);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        setStatus({ loading: true, error: null });
        const res = await getAnnounceDetailAPI(id);
        setNotice(res);
      } catch {
        setStatus({
          loading: false,
          error: "공지사항을 불러오는 중 오류가 발생했습니다.",
        });
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchNoticeDetail();
  }, [id]);

  if (status.loading)
    return <AnnounceStatus type="loading" message="로딩 중..." />;

  if (status.error)
    return <AnnounceStatus type="error" message={status.error} />;

  if (!notice)
    return (
      <AnnounceStatus type="empty" message="공지사항을 찾을 수 없습니다." />
    );

  return (
    <div className="announce-detail-page-container">
      <h1 className="announce-detail-title">공지사항</h1>

      <article className="announce-detail-container">
        <header className="announce-detail-header">
          <span className="meta-date">{formatDate(notice.createdAt)}</span>
          <CloseButton onClick={closeDetailPage} />
        </header>

        <div className="announce-detail-content">
          <div className="content-title">
            <AnnounceBear />
            {notice.title}
          </div>
          <div className="content-description">{notice.content}</div>
        </div>
      </article>
    </div>
  );
};

export default AnnounceDetailPage;
