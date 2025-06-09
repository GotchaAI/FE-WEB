import { useToastStore } from "store/toast";
import "styles/components/lobby/friend/FriendSearchList.scss";
const FriendSearchList = ({ searchFriendList, addFriend }) => {
  const { showToast } = useToastStore.getState();

  const addFriendHandler = async (item) => {
    console.log(item);
    const res = await addFriend(item.nickname);
    if (res) showToast("alert", "친구요청 전송~");
    else showToast("alert", "요청 실패~");
  };

  console.log(searchFriendList);
  return (
    <div className="friend-search-list-container">
      <ul className="friend-search-list">
        {searchFriendList.map((item, idx) => {
          return (
            <li
              key={`friend-search-item-${idx}`}
              className="friend-search-item"
            >
              <span className="nickname">{item.nickname}</span>
              <button
                className="plus-btn"
                type="button"
                onClick={() => addFriendHandler(item)}
              >
                +
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendSearchList;
