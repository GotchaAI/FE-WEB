import { EmptyContent } from "commons/emptyContent/EmptyContent";
import SearchIcon from "commons/svgs/SearchIcon";
import CloseIcon from "commons/svgs/XIcon";
import { useState } from "react";
import "styles/components/lobby/friend/FriendRequest.scss";

const FriendRequest = ({ friendRequestList }) => {
  const [friendRequestMode, setFriendRequestMode] = useState("request");
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <div className="friend-request-container">
      {friendRequestMode === "request" ? (
        <button
          className="friend-add-btn"
          type="button"
          onClick={() => setFriendRequestMode("add")}
        >
          친구 추가 <span>+</span>
        </button>
      ) : (
        <>
          <div className="close-add-btn">
            <button
              type="button"
              onClick={() => setFriendRequestMode("request")}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="friend-search-container">
            <input
              className="friend-search-form"
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.target.value);
              }}
              placeholder="검색"
            />
            <SearchIcon />
          </div>
        </>
      )}

      {friendRequestMode === "request" ? (
        friendRequestList && friendRequestList.length === 0 ? (
          <EmptyContent />
        ) : (
          <FriendRequest />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default FriendRequest;
