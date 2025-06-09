import ContextMenu from "commons/contextMenu/ContextMenu";
import useContextMenu from "hooks/contextmenu/useContextMenu";
import { useToastStore } from "store/toast";
import "styles/components/lobby/friend/FriendList.scss";
import { isFuture } from "utils/time";

const FriendList = ({
  friendList,
  deleteFriendRequest,
  setWhisperNickname,
}) => {
  const { showToast } = useToastStore.getState();

  // 온라인/오프라인 여부 반환
  const isOnline = (lastLogout) => {
    if (!lastLogout) return false;
    return isFuture(lastLogout);
  };

  // 컨텍스트 메뉴
  const { isOpen, menus, position, closeMenu, openMenu } = useContextMenu();

  const friendOptionHandler = (e, friend) => {
    e.preventDefault();

    openMenu(e.clientX, e.clientY, [
      {
        label: "채팅하기",
        action: () => whisperHandler(friend.nickname),
      },
      {
        label: "따라가기",
        action: () => console.log("따라가기"), // TODO: 따라가기
      },
      {
        label: "친구삭제",
        action: () => deleteFriendHandler(friend.uuid),
      },
    ]);
  };

  const whisperHandler = (nickname) => {
    setWhisperNickname(nickname);
  };

  const deleteFriendHandler = async (uuid) => {
    const res = await deleteFriendRequest(uuid);
    if (res) showToast("alert", "친구가 삭제되었습니다.");
    else showToast("alert", "친구 삭제 실패!");
  };

  return (
    <ul className="friend-list">
      {friendList.map((item) => (
        <li
          className="friend-item"
          key={`friend-item-${item.id}`}
          onClick={(e) => friendOptionHandler(e, item)}
        >
          <div className="friend-status">
            <div
              className={`status ${
                isOnline(item.lastLogout) ? "online" : "offline"
              }`}
            />
          </div>
          <span className="friend-nickname">{item.nickname}</span>
          <div className="sticker" />
        </li>
      ))}
      {isOpen && (
        <ContextMenu menus={menus} position={position} onClose={closeMenu} />
      )}
    </ul>
  );
};

export default FriendList;
