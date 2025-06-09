import { useState, useCallback } from "react";

const useGame2 = (initialScenes = []) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [gameData, setGameData] = useState(null); // 서버에서 받은 제시어, 게임 정보 등

  const currentScene = initialScenes[sceneIdx] || null;
  const isLastScene = sceneIdx === initialScenes.length - 1;

  const goToNextScene = useCallback(() => {
    setSceneIdx((prev) => Math.min(prev + 1, initialScenes.length - 1));
  }, [initialScenes.length]);

  const goToScene = useCallback((index) => {
    if (index >= 0 && index < initialScenes.length) {
      setSceneIdx(index);
    }
  }, [initialScenes.length]);

  const resetGame = useCallback(() => {
    setSceneIdx(0);
    setGameData(null);
  }, []);

  return {
    sceneIdx,
    currentScene,
    isLastScene,
    gameData,
    setGameData,
    goToNextScene,
    goToScene,
    resetGame,
  };
};

export default useGame2;
