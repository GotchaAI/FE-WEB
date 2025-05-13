import "styles/components/lobby/friend/FriendList.scss";

const FriendList = () => {
  const friendList = [
    { id: "f-1", status: "online", nickname: "집가고싶어요" },
    { id: "f-2", status: "online", nickname: "집가고싶어요" },
    { id: "f-3", status: "away", nickname: "집가고싶어요" },
    { id: "f-4", status: "away", nickname: "집가고싶어요" },
    { id: "f-5", status: "offline", nickname: "집가고싶어요" },
    { id: "f-6", status: "offline", nickname: "집가고싶어요" },
    { id: "f-7", status: "offline", nickname: "집가고" },
    { id: "f-8", status: "offline", nickname: "집가고싶" },
    { id: "f-9", status: "offline", nickname: "집가고싶어" },
    { id: "f-10", status: "offline", nickname: "집가고싶어요" },
    { id: "f-11", status: "offline", nickname: "집가고싶어요" },
    { id: "f-12", status: "offline", nickname: "집가고싶" },
    { id: "f-13", status: "offline", nickname: "집가고싶어" },
    { id: "f-14", status: "offline", nickname: "집가고싶어요" },
    { id: "f-15", status: "offline", nickname: "집가고싶어요" },
  ];

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
