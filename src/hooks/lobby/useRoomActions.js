import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "store/modal";
import { useToastStore } from "store/toast";

export const useRoomActions = ({ roomList, enterRoom, enterRoomId }) => {
  const navigate = useNavigate();

  // 룸아이디가 반환되면 대기방으로 이동
  useEffect(() => {
    if (enterRoomId) {
      console.log("✅ 방 입장 성공! 이동 →", enterRoomId);
      navigate(`/lobby/waiting?roomId=${enterRoomId}`);
    }
  }, [enterRoomId, navigate]);

  const handleEnterRoom = async (room) => {
    // 방이 존재하고, 공개방일시 입장 시도
    if (room.roomId) {
      enterRoom(room.roomId, "");
    } else {
      console.log("공개방 입장 실패")
    }
  };

  const handleEnterSecretRoom = async (room) => {
    const modalPayload = {
      roomType:
        room.gameType === "TRICK_MYOMYO"
          ? "묘묘를 속여라!"
          : "루루의 미대입시",
      hostName: room.owner,
      roomName: room.title,
    };

    useModalStore.getState().openModal(
      "roomEnter",
      modalPayload,
      async (password) => {
        console.log("입력한 비밀번호:", password);

        // 방이 존재하고, 비밀방일시 입장 시도
        if (room.roomId) {
          enterRoom(room.roomId, password);
        } else {
          console.log("비밀방 입장 실패")
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
    const modalPayload = { title: "코드 입력" };
    new Promise((resolve) => {
      useModalStore.getState().openModal("codeInput", modalPayload, resolve);
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
