import AnnounceBear from "commons/svgs/AnnounceBear";
import CloseButton from "commons/ui/button/CloseButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQnADetailAPI } from "services/home/serviceCenter";
import "styles/pages/home/ServiceCenterDetailPage.scss";
import { formatDate } from "utils/time";

const QNAStatus = ({ type, message }) => (
  <div className="qna-detail-page-container">
    <h1 className="qna-detail-title">공지사항</h1>
    <div className={`qna-detail-${type}`}>{message}</div>
  </div>
);

const ServiceCenterDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  const closeDetailPage = () => navigate(-1);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        setStatus({ loading: true, error: null });
        const res = await getQnADetailAPI(id);
        setQna(res);
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

  if (status.loading) return <QNAStatus type="loading" message="로딩 중..." />;

  if (status.error) return <QNAStatus type="error" message={status.error} />;

  if (!qna)
    return <QNAStatus type="empty" message="공지사항을 찾을 수 없습니다." />;

  return (
    <div className="qna-page-container">
      <div className="qna-top">
        <h1 className="qna-title">자주 묻는 질문</h1>
      </div>

      <article className="qna-detail-container">
        <header className="qna-detail-header">
          <span className="meta-date">{formatDate(qna.createdAt)}</span>
          <CloseButton onClick={closeDetailPage} />
        </header>

        <div className="qna-detail-content">
          <div className="content-title">
            <AnnounceBear />
            {qna.title}
          </div>
          <div className="content-description">{qna.content}</div>
        </div>
      </article>
    </div>
  );
};

export default ServiceCenterDetailPage;
