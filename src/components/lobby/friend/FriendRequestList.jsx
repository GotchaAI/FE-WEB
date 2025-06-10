import ContextMenu from "commons/contextMenu/ContextMenu";
import useContextMenu from "hooks/contextmenu/useContextMenu";
import { useToastStore } from "store/toast";
import "styles/components/lobby/friend/FriendRequestList.scss";

const FriendRequestList = ({
  friendRequestList,
  acceptFriendRequest,
  rejectFriendRequest,
}) => {
  const { showToast } = useToastStore.getState();

  // 컨텍스트 메뉴
  const { isOpen, menus, position, closeMenu, openMenu } = useContextMenu();

  // 컨텍스트 메뉴 생성
  const friendRequestOptionHandler = (e, friend) => {
    e.preventDefault();

    openMenu(e.clientX, e.clientY, [
      {
        label: "수락하기",
        action: () => acceptFriendRequestAction(friend),
      },
      {
        label: "거절하기",
        action: () => rejectFriendRequestAction(friend),
      },
    ]);
  };

  // 수락 액션
  const acceptFriendRequestAction = async (friend) => {
    const res = await acceptFriendRequest(friend.id);
    if (res) showToast("alert", `${friend.nickname}님과 친구가 되었습니다`);
    else showToast("alert", `수락 실패!!`);
  };

  // 거절 액션
  const rejectFriendRequestAction = async (friend) => {
    const res = await rejectFriendRequest(friend.id);
    if (res)
      showToast("alert", `${friend.nickname}님의 친구 요청을 거절하였습니다`);
    else showToast("alert", `거절 실패!!`);
  };

  return (
    <div className="friend-request-list-container">
      <ul className="friend-request-list">
        {friendRequestList.map((item, idx) => {
          return (
            <li
              key={`friend-request-item-${idx}`}
              className="friend-request-item"
              onClick={(e) => friendRequestOptionHandler(e, item)}
            >
              <span className="nickname">{item.nickname}</span>
              <div className="sticker" />
            </li>
          );
        })}
      </ul>
      {isOpen && (
        <ContextMenu menus={menus} position={position} onClose={closeMenu} />
      )}
    </div>
  );
};

export default FriendRequestList;
