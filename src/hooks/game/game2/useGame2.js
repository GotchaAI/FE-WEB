import { useState, useCallback } from "react";
import { evaluateDrawingAPI, fetchPromptAPI } from "services/game/game2";

/**
 * useGame2 커스텀 훅
 *
 * Game2의 전체 게임 흐름과 상태를 관리하는 훅입니다.
 * 게임의 씬 전환, 제시어 요청, 이미지 평가 처리 등의 로직을 캡슐화합니다.
 *
 * Params:
 * - gameId: string - URL 등에서 전달받은 게임 식별자
 *
 * Returns:
 * - sceneIdx: 현재 씬 인덱스
 * - gameData: 게임 관련 데이터 (제시어, 그림, 결과 등 포함)
 * - setGameData: 수동 게임 데이터 설정 함수
 * - goToNextScene: 다음 씬으로 전환
 * - resetGame: 씬 인덱스 초기화
 * - fetchPrompt: 게임 시작 시 제시어 데이터 요청
 * - handleSubmitDrawing: 이미지 URL 제출 및 평가 요청 처리
 */

const useGame2 = ({ gameId }) => {
  // 현재 씬 번호 상태 (0부터 시작)
  const [sceneIdx, setSceneIdx] = useState(0);

  // 게임 관련 데이터 상태
  const [gameData, setGameData] = useState({
    endTime: "",       // 종료 시간 (필요 시 사용)
    gameId: "",        // 게임 ID
    keyword: "",       // 키워드 (예: 폭죽)
    description: "",   // 상황 설명
    imageUrl: "",      // 그린 그림 이미지 URL
    result: null,      // 평가 결과 (score, feedback)
  });

  // 다음 씬으로 이동
  const goToNextScene = useCallback(() => {
    setSceneIdx((prev) => prev + 1);
  }, []);

  // 게임 초기화 (씬 인덱스를 0으로)
  const resetGame = useCallback(() => {
    setSceneIdx(0);
  }, []);

  // 게임 시작 시 키워드 + 상황 설명 요청
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

  // 그림 제출 및 평가 요청 처리
  const handleSubmitDrawing = useCallback(
    async (imageUrl) => {
      try {
        console.log("이미지 제출됨:", imageUrl, gameData.gameId);

        // API로 제출 및 평가 요청
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

