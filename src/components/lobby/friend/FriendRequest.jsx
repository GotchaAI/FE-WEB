import { EmptyContent } from "commons/emptyContent/EmptyContent";
import SearchIcon from "commons/svgs/SearchIcon";
import CloseIcon from "commons/svgs/XIcon";
import { useState } from "react";
import { searchFriendAPI } from "services/friend/friend";
import "styles/components/lobby/friend/FriendRequest.scss";
import { isPressEnterKey } from "utils/keyDown";
import { isBlank } from "utils/validation";
import FriendRequestList from "./FriendRequestList";
import FriendSearchList from "./FriendSearchList";

const FriendRequest = ({
  friendRequestList,
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
}) => {
  const [friendRequestMode, setFriendRequestMode] = useState("request");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchFriendList, setSearchFriendList] = useState([]);

  const submitHandler = async () => {
    if (isBlank(searchInputValue)) return;

    try {
      const res = await searchFriendAPI(searchInputValue);
      setSearchFriendList(res);
    } catch (e) {
      console.error(e);
    }
  };

  const pressHandler = (e) => {
    if (isPressEnterKey(e)) {
      submitHandler();
    }
  };

  const searchHandler = () => {
    submitHandler();
  };

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
              onKeyDown={(e) => pressHandler(e)}
              placeholder="검색"
            />
            <SearchIcon onClick={searchHandler} />
          </div>
        </>
      )}

      {friendRequestMode === "request" ? (
        friendRequestList && friendRequestList.length === 0 ? (
          <EmptyContent />
        ) : (
          <FriendRequestList
            friendRequestList={friendRequestList}
            acceptFriendRequest={acceptFriendRequest}
            rejectFriendRequest={rejectFriendRequest}
          />
        )
      ) : (
        <FriendSearchList
          searchFriendList={searchFriendList}
          addFriend={addFriend}
        />
      )}
    </div>
  );
};

export default FriendRequest;
