import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPromptAPI } from "services/game/game2";

const useGame2 = ({ gameId }) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [gameData, setGameData] = useState({
    endTime: "",
    gameId: "",
    keyword: "",
    description: "",
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

    // MOCK DATA
    const mockData = {
      keyword: "폭죽",
      description: `어둠이 숨을 죽이고 있을 때,\n하늘에 누군가의 기분이 터지는 걸 보았어.\n반짝임이 너무 빨라서 눈이 따라가지 못했지만,\n그 짧은 순간만큼은 모두가 같은 쪽을 보고 있었지.\n그 장면, 나한테 다시 보여줄 수 있을까..?`,
    };

    const res = await fetchPromptAPI(gameId);
    console.log(res)
    setGameData((prev) => ({
      ...prev,
      gameId,
      keyword: res.keyword,
      description: res.situation,
    }));
  }, [gameId]);

  // 이미지 제출 + 평가 요청 (MOCK)
  const handleSubmitDrawing = useCallback(async (imageUrl) => {
    try {
      console.log("이미지 제출됨:", imageUrl);

      // MOCK 변환 및 평가
      const mockResult = {
        score: 85,
        feedback: "폭죽의 느낌이 잘 살아있어요!",
      };

      setGameData((prev) => ({
        ...prev,
        result: mockResult,
      }));

      return true;
    } catch (err) {
      console.error("이미지 제출/평가 실패:", err);
      return false;
    }
  }, []);

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
