import "styles/components/home/RankingPreview.scss";
export const RankingPreview = ({ rankingData }) => {
  return (
    <div className="ranking-preview-conatiner">
      <h2>랭킹 </h2>
      <ul className="ranking-list">
        {rankingData && rankingData.length > 0 ? (
          rankingData.slice(0, 4).map((item, index) => (
            <li key={index} className="ranking-item">
              <span className="user-rank-info">
                {index + 1}. {item.username}
              </span>
              <div className="dots" />
              <span className="score">{item.score} 점</span>
            </li>
          ))
        ) : (
          <p>빈집이네요? 당신이 차지하세요!</p>
        )}
      </ul>
      <div className="my-score-container">
        <span className="my-score-header">내 점수</span>
        <div className="my-score-dots" />
        <div className="my-score-box">
          <div className="my-score-background">
            <div className="my-score-edge" />
            <span className="my-score">9ssssss 점</span>
          </div>
        </div>
      </div>
    </div>
  );
};
