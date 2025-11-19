import "styles/components/home/SideRankingList.scss";

const SideRankingList = ({ title, list, highlightRank }) => {
  return (
    <div className="side-ranking">
      <h2 className="side-title">{title}</h2>

      <div className="side-list">
        {list.map((item) => (
          <div
            key={`rank-${item.rank}-${item.nickname}`}
            className={
              "side-item " + (item.rank === highlightRank ? "highlight" : "")
            }
          >
            <span className="rank">{item.rank}.</span>
            <span className="name">{item.nickname}</span>
            <span className="dashed-line"></span>
            <span className="score">{item.exp}점</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideRankingList;
