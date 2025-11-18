import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "styles/pages/home/ServiceCenterDetailPage.scss";
import { getQnADetailAPI } from "services/home/serviceCenter";
import QnaDetail from "components/home/QnaDetail";

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
    const fetchDetail = async () => {
      try {
        setStatus({ loading: true, error: null });
        const res = await getQnADetailAPI(id);
        setQna(res);
      } catch {
        setStatus({
          loading: false,
          error: "문의사항을 불러오는 중 오류가 발생했습니다.",
        });
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchDetail();
  }, [id]);

  if (status.loading) return <QNAStatus type="loading" message="로딩 중..." />;
  if (status.error) return <QNAStatus type="error" message={status.error} />;
  if (!qna) return <QNAStatus type="empty" message="문의사항이 없습니다." />;

  return (
    <QnaDetail
      type={"문의 내역"}
      title={qna.title}
      createdAt={qna.createdAt}
      content={qna.content}
      onClose={closeDetailPage}
    />
  );
};

export default ServiceCenterDetailPage;
