import "styles/components/scenes/game2/DrawingWaiting.scss";

const DrawingWaiting = () => {
  return (
    <div className="drawing-waiting-overlay">
      <div className="waiting-box">
        <p>AI가 당신의 그림을 평가 중입니다...</p>
      </div>
    </div>
  );
};

export default DrawingWaiting;
