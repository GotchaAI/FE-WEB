import { EmptyContent } from "commons/emptyContent/EmptyContent";
import SearchIcon from "commons/svgs/SearchIcon";
import FriendList from "components/lobby/friend/FriendList";
import useFriendSocket from "hooks/lobby/useFriendSocket";
import "styles/components/lobby/friend/Friend.scss";
import FriendRequest from "./FriendRequest";

const Friend = ({ userUuid }) => {
  const {
    friendList,
    friendRequestList,
    friendActionType,
    setFriendActionType,
  } = useFriendSocket({ userUuid });

  return (
    <div className="friend-container">
      <h1>friend</h1>

      <div className="friend-option-container">
        <button
          className={`friend-list-btn ${
            friendActionType === "list" && "active"
          }`}
          type="button"
          onClick={() => setFriendActionType("list")}
        >
          친구 목록
        </button>
        <button
          className={`friend-request-btn ${
            friendActionType !== "list" && "active"
          }`}
          type="button"
          onClick={() => setFriendActionType("request")}
        >
          친구 신청
        </button>
      </div>

      {friendActionType === "list" ? (
        <div className="friend-list-container">
          <div className="friend-search-container">
            <input className="friend-search-form" placeholder="검색" />
            <SearchIcon />
          </div>
          {friendList && friendList.length === 0 ? (
            <EmptyContent />
          ) : (
            <FriendList friendList={friendList} />
          )}
        </div>
      ) : (
        <FriendRequest friendRequestList={friendRequestList} />
      )}
    </div>
  );
};

export default Friend;
