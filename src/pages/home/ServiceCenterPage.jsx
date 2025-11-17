import { useNavigate } from "react-router-dom";
import "styles/pages/home/ServiceCenterPage.scss";

const ServiceCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="servicecenter-page-container">
      <h1 className="servicecenter-title">고객 문의</h1>

      <div className="qna-box-tabs">
        <button
          className="qna-box"
          onClick={() => navigate("/service-center/FAQ")}
        >
          자주묻는 질문
        </button>
        <button
          className="qna-box second"
          onClick={() => navigate("/service-center/help")}
        >
          문의 내역
        </button>
      </div>
    </div>
  );
};

export default ServiceCenter;
