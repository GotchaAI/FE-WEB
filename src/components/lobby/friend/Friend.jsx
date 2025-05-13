import SearchIcon from "commons/svgs/SearchIcon";
import FriendList from "components/lobby/friend/FriendList";
import "styles/components/lobby/friend/Friend.scss";

const Friend = () => {
  return (
    <div className="friend-container">
      <h1>friend</h1>

      <div className="friend-option-container">
        <button className="friend-list-btn">친구 목록</button>
        <button className="friend-request-btn">친구 신청</button>
      </div>

      <div className="friend-search-container">
        <input className="friend-search-form" placeholder="검색" />
        <SearchIcon />
      </div>
      <div className="friend-list-container">
        <FriendList />
      </div>
    </div>
  );
};

export default Friend;
