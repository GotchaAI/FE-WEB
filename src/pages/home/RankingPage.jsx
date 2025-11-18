import SideRankingList from "components/home/SideRankingList";
import { useEffect, useState } from "react";
import { getMyRankingAPI, getRankingListAPI } from "services/home/ranking";
import "styles/pages/home/RankingPage.scss";

const RankingPage = () => {
  const [rankingList, setRankingList] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [myScore, setMyScore] = useState(null);
  const [topList, setTopList] = useState([]);
  const [nearList, setNearList] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // ② 내 랭킹 조회
        const myRes = await getMyRankingAPI();
        const me = myRes?.data || myRes;

        if (!me) return;

        // 전체 랭킹 조회 (7명까지)
        const fullRes = await getRankingListAPI();
        const list = fullRes?.data || fullRes || [];
        setRankingList(list);
        setTopList(list.slice(0, 7));

        setMyRank(me.rank);
        setMyScore(me.exp);

        // 내 근처 랭킹 계산 (위 아래 3명)
        const myIndex = list.findIndex((item) => item.rank === me.rank);
        const start = Math.max(myIndex - 3, 0);
        const end = Math.min(myIndex + 4, list.length);
        setNearList(list.slice(start, end));
      } catch (err) {
        console.error("랭킹 조회 실패:", err);
      }
    };

    fetchRanking();
  }, []);

  // 바로 위 등수와의 점수 차이
  const diffScore =
    myRank > 1 && rankingList.length >= myRank - 1
      ? rankingList[myRank - 2].exp - myScore
      : 0;

  return (
    <div className="ranking-page-wrapper">
      <div className="ranking-page">
        <SideRankingList title="상위 랭킹" list={topList} />

        <div className="ranking-center">
          <div className="rank-label">내 등수</div>
          <div className="my-rank">
            <span className="rank-number">{myRank ?? "-"}</span>
            <span className="rank-unit">등</span>
          </div>

          <div className="score-row">
            <span className="score-label">내 점수</span>
            <span className="dashed-line"></span>
            <span className="my-score">{myScore ?? 0} 점</span>
          </div>
        </div>

        <SideRankingList
          title="내 근처 랭킹"
          list={nearList}
          highlightRank={myRank}
        />
      </div>
      <div className="bottom-banner">
        {myRank === 1 ? (
          <p>현재 1등입니다!</p>
        ) : (
          <p>
            <span className="banner-score">{diffScore}</span>점만 더 높으면
            등수를 앞지를 수 있어요!
          </p>
        )}
      </div>
    </div>
  );
};

export default RankingPage;
