import { useState, useCallback } from "react";
import { evaluateDrawingAPI, fetchPromptAPI } from "services/game/game2";

const useGame2 = ({ gameId }) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [gameData, setGameData] = useState({
    endTime: "",
    gameId: "",
    keyword: "",
    description: "",
    imageUrl: "",
    result: null,
  });

  // 다음 씬으로 이동
  const goToNextScene = useCallback(() => {
    setSceneIdx((prev) => prev + 1);
  }, []);

  // 씬 초기화
  const resetGame = useCallback(() => {
    setSceneIdx(0);
  }, []);

  // 첫 씬에서 호출: 제시어 요청 (MOCK)
  const fetchPrompt = useCallback(async () => {
    if (!gameId) return;

    const res = await fetchPromptAPI(gameId);
    console.log(res);
    setGameData((prev) => ({
      ...prev,
      gameId: gameId,
      keyword: res.keyword,
      description: res.situation,
    }));
  }, [gameId]);

  // 이미지 제출 + 평가 요청 (MOCK)
  const handleSubmitDrawing = useCallback(
    async (imageUrl) => {
      try {
        console.log("이미지 제출됨:", imageUrl, gameData.gameId);

        // 실제 API 요청
        const res = await evaluateDrawingAPI(gameData.gameId, imageUrl);

        const { score, feedback } = res;

        setGameData((prev) => ({
          ...prev,
          imageUrl,
          result: { score, feedback },
        }));

        return true;
      } catch (err) {
        console.error("이미지 제출/평가 실패:", err);
        return false;
      }
    },
    [gameData.gameId]
  );

  return {
    sceneIdx,
    gameData,
    setGameData,
    goToNextScene,
    resetGame,
    fetchPrompt,
    handleSubmitDrawing,
  };
};

export default useGame2;
