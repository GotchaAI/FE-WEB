import "styles/components/home/SideRankingList.scss";

const SideRankingList = ({ title, list, highlightRank }) => {
  return (
    <div className="side-ranking">
      <h2 className="side-title">{title}</h2>

      <div className="side-list">
        {list.map((item) => (
          <div
            key={item.rank}
            className={
              "side-item " + (item.rank === highlightRank ? "highlight" : "")
            }
          >
            <span className="rank">{item.rank}.</span>
            <span className="name">{item.name}</span>
            <span className="dashed-line"></span>
            <span className="score">{item.score}점</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideRankingList;
