import { useEffect, useState } from "react";
import { getQnAListAPI } from "services/home/serviceCenter";
import "styles/pages/home/ServiceCenterPage.scss";

const ServiceCenter = () => {
  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQnAList = async () => {
      try {
        const res = await getQnAListAPI({
          page: 0,
          sort: "DATE_DESC",
        });
        setQnaList(res.data.content || []);
      } catch (err) {
        console.error("❌ QnA 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQnAList();
  }, []);

  if (loading)
    return <div className="servicecenter-page-container">로딩 중...</div>;

  return (
    <div className="servicecenter-page-container">
      <h1 className="servicecenter-title">고객 문의</h1>

      <div className="qna-box-tabs">
        <button className="qna-box">자주묻는 질문</button>
        <button className="qna-box second">도움말 검색</button>
      </div>

      <div className="qna-list">
        {qnaList.map((item) => (
          <div key={item.inquiryId} className="qna-item">
            <div className="qna-header">
              <h3>{item.title}</h3>
              <span
                className={`qna-status ${
                  item.isSolved ? "solved" : "unsolved"
                }`}
              >
                {item.isSolved ? "답변 완료" : "처리 중"}
              </span>
            </div>
            <div className="qna-meta">
              <span>{item.writer}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCenter;
