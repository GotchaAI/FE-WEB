import roomKingIcon from "assets/components/lobby/room-king-icon.png";
import roomKingRabbit from "assets/components/lobby/room-king-rabbit.png";
import preparingRabbit from "assets/components/lobby/room-preparing-rabbit.png";
import readyRabbit from "assets/components/lobby/room-ready-rabbit.png";
import ContextMenu from "commons/contextMenu/ContextMenu";
import useContextMenu from "hooks/contextmenu/useContextMenu";

import "styles/components/lobby/waiting/PlayerSlot.scss";

const PlayerSlot = ({
  index,
  ownerUuid,
  userUuid,
  isOwner,
  player,
  ownerChange,
  kickPlayer,
}) => {
  const rabbitImage =
    ownerUuid === player?.userUuid
      ? roomKingRabbit
      : player?.ready
      ? readyRabbit
      : preparingRabbit;

  const altText =
    ownerUuid === player?.userUuid
      ? "방장 말풍선"
      : player?.ready
      ? "준비 완료 말풍선"
      : "준비 중 말풍선";

  // 컨텍스트 메뉴
  const { isOpen, menus, position, closeMenu, openMenu } = useContextMenu();

  const roomOptionHandler = (e) => {
    e.preventDefault();

    if (userUuid === player?.userUuid) return;
    const baseMenus = [
      {
        label: "귓속말x",
        action: () => console.log("아직 없엉 ㅎ"),
      },
      {
        label: "차단하기x",
        action: () => console.log("아직 없엉 ㅎ"),
      },
    ];

    if (isOwner) {
      baseMenus.splice(
        1,
        0, // 차단하기x 앞에 삽입
        {
          label: "방장위임",
          action: changeOwnerHandler,
        },
        {
          label: "방 강퇴",
          action: kickPlayerHandler,
        }
      );
    }

    openMenu(e.clientX, e.clientY, baseMenus);
  };

  const changeOwnerHandler = () => {
    const data = {
      eventType: "OWNER_CHANGE",
      content: player.userUuid,
    };
    ownerChange(data);
  };

  const kickPlayerHandler = () => {
    const data = {
      eventType: "KICK",
      content: player.userUuid,
    };
    kickPlayer(data);
  };

  return (
    <>
      <div className={`player-slot ${!player ? "empty" : ""}`}>
        {player ? (
          <div className="player" onClick={roomOptionHandler}>
            <div className="slot-header">
              <div className="icon-wrapper">
                {player.isOwner ? (
                  <img src={roomKingIcon} alt="방장" className="leader-icon" />
                ) : (
                  <div className="default-icon">{index + 1}</div>
                )}
              </div>
              <span className="nickname">{player.nickname}</span>
            </div>

            <div className="slot-body">
              <img src={rabbitImage} width="135" height="70" alt={altText} />
            </div>
          </div>
        ) : (
          // 플레이어가 들어오지 못하는 슬롯
          <div className="slot-number empty">
            <div className="slot-header">
              <div className="icon-wrapper">
                <div className="blocked-icon">{index + 1}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <ContextMenu menus={menus} position={position} onClose={closeMenu} />
      )}
    </>
  );
};

export default PlayerSlot;
