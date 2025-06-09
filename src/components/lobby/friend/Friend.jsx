import { EmptyContent } from "commons/emptyContent/EmptyContent";
import SearchIcon from "commons/svgs/SearchIcon";
import FriendList from "components/lobby/friend/FriendList";
import useFriendSocket from "hooks/lobby/useFriendSocket";
import "styles/components/lobby/friend/Friend.scss";
import FriendRequest from "./FriendRequest";

const Friend = ({ userUuid, setWhisperNickname }) => {
  const {
    friendList,
    friendRequestList,
    friendActionType,
    setFriendActionType,
    addFriend,
    acceptFriendRequest,
    deleteFriendRequest,
    rejectFriendRequest,
  } = useFriendSocket({ userUuid });
  console.log(friendRequestList);

  const searchFriendHandler = () => {
    // TODO: 나중에 하자 ㅇㅇ
  };

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

      {/** list:친구 목록, request: 친구 신청 */}
      {friendActionType === "list" ? (
        <div className="friend-list-container">
          {/** 검색창 */}
          <div className="friend-search-container">
            <input className="friend-search-form" placeholder="검색" />
            <SearchIcon onClick={searchFriendHandler} />
          </div>

          {/** 친구 유무 */}
          {friendList && friendList.length === 0 ? (
            <EmptyContent />
          ) : (
            <FriendList
              friendList={friendList}
              deleteFriendRequest={deleteFriendRequest}
              setWhisperNickname={setWhisperNickname}
            />
          )}
        </div>
      ) : (
        <FriendRequest
          friendRequestList={friendRequestList}
          addFriend={addFriend}
          acceptFriendRequest={acceptFriendRequest}
          rejectFriendRequest={rejectFriendRequest}
        />
      )}
    </div>
  );
};

export default Friend;
