import { EmptyContent } from "commons/emptyContent/EmptyContent";
import SearchIcon from "commons/svgs/SearchIcon";
import FriendList from "components/lobby/friend/FriendList";
import useFriendSocket from "hooks/lobby/useFriendSocket";
import { useState } from "react";
import "styles/components/lobby/friend/Friend.scss";

const Friend = ({ userUuid }) => {
  const [friendActionType, setFriendActionType] = useState("list");
  const { friendList } = useFriendSocket({ userUuid });
  return (
    <div className="friend-container">
      <h1>friend</h1>

      <div className="friend-option-container">
        <button
          className="friend-list-btn"
          onClick={() => setFriendActionType("list")}
        >
          친구 목록
        </button>
        <button
          className="friend-request-btn"
          onClick={() => setFriendActionType("apply")}
        >
          친구 신청
        </button>
      </div>

      <div className="friend-search-container">
        <input className="friend-search-form" placeholder="검색" />
        <SearchIcon />
      </div>
      {friendActionType === "list" ? (
        <div className="friend-list-container">
          {friendList && friendList.length === 0 ? (
            <EmptyContent />
          ) : (
            <FriendList friendList={friendList} />
          )}
        </div>
      ) : (
        <div className="friend-list-container">ㅎㅇ</div>
      )}
    </div>
  );
};

export default Friend;
