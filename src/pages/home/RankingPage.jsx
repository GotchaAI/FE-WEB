import SideRankingList from "components/home/SideRankingList";
import "styles/pages/home/RankingPage.scss";

const leftList = [
  { rank: 1, name: "엉덩이가려워", score: 9157 },
  { rank: 2, name: "나똥굳다", score: 8000 },
  { rank: 3, name: "삼위일체", score: 7658 },
  { rank: 4, name: "삼위일체", score: 7658 },
  { rank: 5, name: "삼위일체", score: 7658 },
  { rank: 6, name: "삼위일체", score: 7658 },
  { rank: 7, name: "삼위일체", score: 7658 },
];

const rightList = [
  { rank: 134, name: "난 아님", score: 698 },
  { rank: 136, name: "난 아님", score: 698 },
  { rank: 137, name: "난 아님", score: 698 },
  { rank: 138, name: "나야", score: 356 },
  { rank: 139, name: "난 아님", score: 698 },
  { rank: 140, name: "난 아님", score: 698 },
  { rank: 141, name: "안녕", score: 698 },
];

const RankingPage = () => {
  return (
    <div className="ranking-page">
      {/* LEFT LIST */}
      <SideRankingList title="상위 랭킹" list={leftList} />

      {/* CENTER */}
      <div className="ranking-center">
        <div className="my-rank">138 등</div>

        <div className="my-score-wrapper">
          <div className="my-score">356 점</div>
        </div>

        <p className="desc">50명만 더 높으면 등수를 앞지를 수 있어요!</p>
      </div>

      {/* RIGHT LIST */}
      <SideRankingList
        title="내 근처 랭킹"
        list={rightList}
        highlightRank={138}
      />
    </div>
  );
};

export default RankingPage;
