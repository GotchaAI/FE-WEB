import { SOCKET_GAME_API } from "constants/api";
import { useCallback, useEffect, useState } from "react";
import { useGameSocketStore } from "store/socket";
import { useToastStore } from "store/toast";

const useDrawSocket = ({
  roomId,
  isDrawingDisabled,
  setIsDrawingDisabled,
  getImageUrl,
}) => {
  const { stompClient, isConnected } = useGameSocketStore();
  const [flow, setFlow] = useState(1); // 1:게임시작 2:게임종료 3: 제출 및 다음 씬 이동

  // 그림 제출
  const sendDrawing = useCallback(
    (imageUrl) => {
      if (!isConnected) return;

      const imageData = JSON.stringify({ imageURL: imageUrl });

      // 🚀 그림 제출 publish
      stompClient.publish({
        destination: `/pub${SOCKET_GAME_API}/${roomId}`,
        body: JSON.stringify({
          eventType: "DRAWING_SUBMIT",
          data: imageData,
        }),
      });
    },
    [isConnected, roomId, stompClient]
  );

  // 제출 핸들러
  const submitHandler = useCallback(async () => {
    useToastStore.getState().showToast("alert", "제출 완료!!!");
    const imageUrl = await getImageUrl();
    sendDrawing(imageUrl);
    setIsDrawingDisabled(true);
  }, [getImageUrl, setIsDrawingDisabled, sendDrawing]);

  // ⏹️ 게임 종료
  useEffect(() => {
    if (flow < 3) return;

    // 아직 제출 안 한 경우
    if (!isDrawingDisabled) {
      submitHandler(); // 그림 자동 제출 로직
    }
  }, [flow, isDrawingDisabled, setIsDrawingDisabled, submitHandler]);

  return { flow, setFlow, sendDrawing, submitHandler };
};

export default useDrawSocket;
