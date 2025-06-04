import useFriendSocket from "hooks/lobby/useFriendSocket";
import "styles/components/lobby/friend/FriendList.scss";
const FriendList = ({ userUuid }) => {
  const { friendList } = useFriendSocket({ userUuid });
  return (
    <ul className="friend-list">
      {friendList.map((item) => (
        <li className="friend-item" key={item.id}>
          <div className="friend-status">
            <div className={`status ${item.status}`} />
          </div>
          <span className="friend-nickname">{item.nickname}</span>
          <div className="sticker" />
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
