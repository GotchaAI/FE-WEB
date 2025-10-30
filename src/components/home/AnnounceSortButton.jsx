import "styles/components/home/AnnounceSortButtons.scss";

export default function AnnounceSortButtons({ sortOrder, onChange }) {
  return (
    <div className="announce-sort">
      <button
        className={sortOrder === "old" ? "active" : ""}
        onClick={() => onChange("old")}
      >
        오래된 순
      </button>
      <button
        className={sortOrder === "new" ? "active" : ""}
        onClick={() => onChange("new")}
      >
        최신 순
      </button>
    </div>
  );
}
