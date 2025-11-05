import AnnounceBear from "commons/svgs/AnnounceBear";
import CloseButton from "commons/ui/button/CloseButton";
import { useNavigate, useParams } from "react-router-dom";
import "styles/pages/home/AnnounceDetailPage.scss";
import { formatDate } from "utils/time";
import { useEffect, useState } from "react";
import { getAnnounceDetailAPI } from "services/home/announce";

const AnnounceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closeDetailPage = () => navigate(-1);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        setLoading(true);
        const res = await getAnnounceDetailAPI(id);
        setNotice(res);
      } catch (err) {
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchNoticeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="announce-detail-page-container">
        <h1 className="announce-detail-title">공지사항</h1>
        <div className="announce-detail-loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="announce-detail-page-container">
        <h1 className="announce-detail-title">공지사항</h1>
        <div className="announce-detail-error">{error}</div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="announce-detail-page-container">
        <h1 className="announce-detail-title">공지사항</h1>
        <div className="announce-detail-empty">
          공지사항을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

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
