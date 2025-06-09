import { useNavigate } from "react-router-dom";
import { useModalStore } from "store/modal";
import { useToastStore } from "store/toast";

export const useRoomActions = ({ roomList, enterRoom }) => {
  const navigate = useNavigate();

  const handleEnterRoom = async (room) => {
    if (room.roomId) {
      enterRoom(room.roomId, "");
    }
  };

  const handleEnterSecretRoom = async (room) => {
    useModalStore.getState().openModal(
      "roomEnter",
      {
        roomType: room.gameType === "TRICK_MYOMYO" ? "묘묘를 속여라!" : "루루의 미대입시",
        hostName: room.owner,
        roomName: room.title,
      },
      async (password) => {
        if (room.roomId) {
          enterRoom(room.roomId, password);
        }
      }
    );
  };

  const handleQuickJoin = () => {
    const publicRooms = roomList.filter((room) => !room.hasPassword);
    if (publicRooms.length === 0) {
      useToastStore.getState().showToast("alert", "입장 가능한 방이 존재하지 않아요!", 3000);
      return;
    }

    const randomIndex = Math.floor(Math.random() * publicRooms.length);
    const selectedRoom = publicRooms[randomIndex];
    handleEnterRoom(selectedRoom);
  };

  const handleCreateRoom = () => {
    navigate("/lobby/game1/create");
  };

  const handleEnterCode = () => {
    new Promise((resolve) => {
      useModalStore.getState().openModal("codeInput", { title: "코드 입력" }, resolve);
    }).then((code) => {
      const targetRoom = roomList.find((room) => room.roomId === code);
      if (!targetRoom) {
        useToastStore.getState().showToast("alert", "방이 존재하지 않아요!", 3000);
        return;
      }

      if (targetRoom.hasPassword) {
        handleEnterSecretRoom(targetRoom);
      } else {
        handleEnterRoom(targetRoom);
      }
    });
  };

  const handleRoomClick = (room) => {
    if (room.hasPassword) {
      handleEnterSecretRoom(room);
    } else {
      handleEnterRoom(room);
    }
  };

  return {
    handleEnterRoom,
    handleEnterSecretRoom,
    handleQuickJoin,
    handleCreateRoom,
    handleEnterCode,
    handleRoomClick,
  };
};
