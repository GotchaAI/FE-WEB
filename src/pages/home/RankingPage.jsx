import SideRankingList from "components/home/SideRankingList";
import { useEffect, useState } from "react";
import { getMyRankingAPI, getRankingListAPI } from "services/home/ranking";
import { getAuthToken } from "utils/token"; // 🔹 토큰 가져오는 함수
import "styles/pages/home/RankingPage.scss";

const RankingPage = () => {
  const [rankingList, setRankingList] = useState([]);
  const [myRank, setMyRank] = useState("-");
  const [myScore, setMyScore] = useState("-");
  const [topList, setTopList] = useState([]);
  const [nearList, setNearList] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // 전체 랭킹 조회 (상위 7명)
        const fullRes = await getRankingListAPI();
        const list = fullRes?.data || fullRes || [];
        setRankingList(list);
        setTopList(list.slice(0, 7));

        // 액세스 토큰이 없으면 여기서 종료 → "-" 유지
        const { accessToken } = getAuthToken();
        if (!accessToken) {
          setNearList([]); // 근처 랭킹 없음
          return;
        }

        // 내 랭킹 조회
        const myRes = await getMyRankingAPI();
        const me = myRes?.data || myRes;

        if (!me) return;

        setMyRank(me.rank);
        setMyScore(me.exp);

        // 🔹 근처 랭킹 계산
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

  // 바로 위 등수와의 점수 차이 (1등이거나 토큰 없음 또는 내 정보 없으면 0)
  const diffScore =
    typeof myRank === "number" && myRank > 1 && rankingList.length >= myRank - 1
      ? rankingList[myRank - 2].exp - myScore
      : 0;

  return (
    <div className="ranking-page-wrapper">
      <div className="ranking-page">
        {/* 상위 랭킹 */}
        <SideRankingList title="상위 랭킹" list={topList} />

        {/* 내 랭킹 영역 */}
        <div className="ranking-center">
          <div className="rank-label">내 등수</div>
          <div className="my-rank">
            <span className="rank-number">{myRank}</span>
            <span className="rank-unit">등</span>
          </div>

          <div className="score-row">
            <span className="score-label">내 점수</span>
            <span className="dashed-line"></span>
            <span className="my-score">
              {myScore === "-" ? "-" : `${myScore} 점`}
            </span>
          </div>
        </div>

        {/* 내 근처 랭킹 (- 일 때도 자동 처리됨) */}
        <SideRankingList
          title="내 근처 랭킹"
          list={myRank === "-" ? [] : nearList}
          highlightRank={myRank}
        />
      </div>

      {/* 하단 배너 */}
      <div className="bottom-banner">
        {myRank === "-" ? (
          <p>개인 랭킹 정보가 없어요!</p>
        ) : myRank === 1 ? (
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
