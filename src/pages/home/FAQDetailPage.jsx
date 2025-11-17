import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "styles/pages/home/ServiceCenterDetailPage.scss";

import { mockQnaList } from "constants/faqList";
import QnaDetail from "components/home/QnaDetail";

const QNAStatus = ({ type, message }) => (
  <div className="qna-detail-page-container">
    <h1 className="qna-detail-title">문의 내역</h1>
    <div className={`qna-detail-${type}`}>{message}</div>
  </div>
);

const FAQDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [qna, setQna] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  const closeDetailPage = () => navigate(-1);

  useEffect(() => {
    setStatus({ loading: true, error: null });

    // mock 데이터에서 해당 id 찾기 (숫자로 변환)
    const found = mockQnaList.find((item) => item.inquiryId === Number(id));

    // 데이터 존재 여부 체크
    if (found) {
      setQna(found);
      setStatus({ loading: false, error: null });
    } else {
      setStatus({ loading: false, error: "문의 내역을 찾을 수 없습니다." });
    }
  }, [id]);

  if (status.loading) return <QNAStatus type="loading" message="로딩 중..." />;
  if (status.error) return <QNAStatus type="error" message={status.error} />;
  if (!qna) return <QNAStatus type="empty" message="문의사항이 없습니다." />;

  return (
    <QnaDetail
      type="자주 묻는 질문"
      title={qna.title}
      createdAt={qna.createdAt}
      content={qna.content}
      onClose={closeDetailPage}
    />
  );
};

export default FAQDetailPage;
