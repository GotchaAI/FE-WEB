import { SERVICE_CENTER_FAQ_URL, SERVICE_CENTER_HELP_URL } from "constants/url";
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
          onClick={() => navigate(`${SERVICE_CENTER_FAQ_URL}`)}
        >
          자주묻는 질문
        </button>
        <button
          className="qna-box second"
          onClick={() => navigate(`${SERVICE_CENTER_HELP_URL}`)}
        >
          문의 내역
        </button>
      </div>
    </div>
  );
};

export default ServiceCenter;
