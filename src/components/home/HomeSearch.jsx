import SearchIcon from "commons/svgs/SearchIcon";
import { useState } from "react";
import "styles/components/home/HomeSearch.scss";

export default function HomeSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <div className="searchbar-wrapper">
      <input
        className="search-input"
        placeholder="검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={() => onSearch(keyword)}>
        <span>찾기</span>
        <SearchIcon />
      </button>
    </div>
  );
}
