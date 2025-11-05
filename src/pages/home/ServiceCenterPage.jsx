import "styles/pages/home/ServiceCenterPage.scss";

const ServiceCenter = () => {
  return (
    <div className="servicecenter-page-container">
      <h1 className="servicecenter-title">고객 문의</h1>

      <div className="qna-box-tabs">
        <button className="qna-box">자주묻는 질문</button>
        <button className="qna-box">도움말 검색</button>
      </div>
    </div>
  );
};

export default ServiceCenter;
