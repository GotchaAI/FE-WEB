import CloseIcon from "commons/svgs/XIcon";
import "styles/components/lobby/mypage/MyPageHome.scss";
import rabbitCarrot from "assets/commons/carrot-rabbit.png";
import { useNavigate } from "react-router-dom";

export const MyPageHome = () => {
  // 예시 데이터
  const navigate = useNavigate();
  const achievements = [
    { id: 1, title: "빨리그리기 장인", desc: "3초 내로 제출" },
    { id: 2, title: "사진사", desc: "유사도 95% 이상" },
    { id: 3, title: "발로 그리기 왕", desc: "유사도 5% 미만" },
    { id: 4, title: "발로 그리기 왕", desc: "유사도 5% 미만" },
    { id: 4, title: "발로 그리기 왕", desc: "유사도 5% 미만" },
    { id: 4, title: "발로 그리기 왕", desc: "유사도 5% 미만" },
  ];
  const handleClose = () => {
    navigate("/lobby");
  };
  return (
    <div className="my-page-home-container">
      <button className="close-btn" onClick={handleClose}>
        <CloseIcon />
      </button>

      <div className="achievements-header">
        <span className="total">총 달성한 업적</span>
        <span className="current">23</span>
        <span className="divider">/64</span>
        <span className="rank">상위 55%</span>
      </div>

      <progress className="progress" value={60} max={100} />

      {/* 업적 리스트 */}
      <div className="achievements-list">
        {achievements.map((a) => (
          <div key={a.id} className="achievement-item">
            <div className="achievement-icon-wrapper">
              <img
                src={rabbitCarrot}
                alt="업적 아이콘"
                className="achievement-icon"
              />
            </div>
            <div className="achievement-texts">
              <span className="title">{a.title}</span>
              <span className="desc">{a.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
