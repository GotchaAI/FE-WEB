import { useEffect, useState } from "react";
import { getMyRankingAPI, getRankingListAPI } from "services/home/ranking";
import "styles/components/home/RankingPreview.scss";
export const RankingPreview = () => {
  const [rankingData, setRankingData] = useState([]);
  const [myScore, setMyScore] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // 🔹 내 랭킹 먼저 가져오기
        const myRes = await getMyRankingAPI();
        const me = myRes?.data || myRes;

        if (me) {
          setMyScore(me.exp);
        }

        // 🔹 전체 랭킹 가져오기
        const listRes = await getRankingListAPI();
        const list = listRes?.data || listRes || [];
        setRankingData(list);
      } catch (e) {
        console.error("랭킹 프리뷰 조회 실패:", e);
      }
    };

    fetchRanking();
  }, []);
  console.log(rankingData);
  return (
    <div className="ranking-preview-container">
      <h2>랭킹 </h2>
      <ul className="ranking-list">
        {rankingData && rankingData.length > 0 ? (
          rankingData.slice(0, 4).map((item, index) => (
            <li key={index} className="ranking-item">
              <span className="user-rank-info">
                {item.rank}. {item.nickname}
              </span>
              <div className="dots" />
              <span className="score">{item.exp} 점</span>
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
            <span className="my-score">{myScore ?? 0} 점</span>
          </div>
        </div>
      </div>
    </div>
  );
};
