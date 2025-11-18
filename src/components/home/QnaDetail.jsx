import { formatDate } from "utils/time";
import "styles/pages/home/ServiceCenterDetailPage.scss";

const QnaDetail = ({ type, title, createdAt, content, onClose }) => {
  return (
    <div className="qna-page-container">
      <div className="qna-top">
        <h1 className="qna-title">{type}</h1>
      </div>

      <article className="qna-detail-container">
        <header className="qna-detail-header">
          <span className="detail-title">{title}</span>
          <span className="detail-date">{formatDate(createdAt)}</span>
        </header>

        <section className="qna-detail-body">
          <div className="detail-content-box">{content}</div>
        </section>

        <div className="qna-detail-footer">
          <button className="btn-exit" onClick={onClose}>
            나가기
          </button>
        </div>
      </article>
    </div>
  );
};

export default QnaDetail;
