import "styles/commons/ui/button/AnnounceSortButtons.scss";

export default function AnnounceSortButtons({ sortOrder, onChange }) {
  return (
    <div className="announce-sort">
      <button
        className={sortOrder === "DATE_ASC" ? "active" : ""}
        onClick={() => onChange("DATE_ASC")}
      >
        오래된 순
      </button>
      <button
        className={sortOrder === "DATE_DESC" ? "active" : ""}
        onClick={() => onChange("DATE_DESC")}
      >
        최신 순
      </button>
    </div>
  );
}
