import BattleScene from "components/scenes/game1/BattleScene";
import DrawScene from "components/scenes/game1/DrawScene";
import Game1Opening from "components/scenes/game1/Game1Opening";
import ResultScene from "components/scenes/game1/ResultScene";
import { SOCKET_GAME_API, SOCKET_GAME_ERROR_API } from "constants/api";
import { useCallback, useEffect, useState } from "react";
import { useGameSocketStore } from "store/socket";
import { getUserUuid } from "utils/user";

/**
 * useGame1Socket 커스텀 훅
 *
 */

const useGame1Socket = () => {
  const userUuid = getUserUuid(); // UUID
  const { stompClient, isConnected } = useGameSocketStore(); // 소켓 정보
  const [gameInfo, setGameInfo] = useState(null); // 게임 정보(START 정보)
  const [sceneIdx, setSceneIdx] = useState(0); // 씬 idx

  const [endTime, setEndTime] = useState(null); // 타이머 종료 시간
  const [drawings, setDrawings] = useState([]); // 그림 이미지
  const [answerResults, setAnswerResults] = useState(
    Array(gameInfo?.totalRounds).fill([null, null])
  ); // 라운드 별 결과
  const [gameResultInfo, setGameResultInfo] = useState({}); // 게임 결과(ROUND_END 결과)

  // gameInfo로 할당받은 정보를 토대로 게임 씬을 생성한다
  const renderScenes = useCallback(() => {
    if (!gameInfo) return [];

    const scenes = [];
    scenes.push(<Game1Opening key="game1-opening" />);

    for (let round = 0; round < gameInfo.totalRounds; round++) {
      const roundData = gameInfo.rounds[round];
      const myRoundData = roundData.words.find(
        (wordObj) => wordObj.drawerUuid === userUuid
      );
      const topic = myRoundData ? myRoundData.word : "";

      // DrawScene
      scenes.push(
        <DrawScene
          key={`draw-${round}`}
          topic={topic}
          roomId={gameInfo.roomId}
          endTime={endTime}
        />
      );

      // BattleScene (첫 번째 배틀)
      scenes.push(
        <BattleScene
          key={`battle1-${round}`}
          roomId={gameInfo.roomId}
          drawings={drawings}
          isMyBattleTurn={gameInfo.gamePlayers[1].playerUuid === userUuid}
        />
      );

      // BattleScene (두 번째 배틀)
      scenes.push(
        <BattleScene
          key={`battle2-${round}`}
          roomId={gameInfo.roomId}
          drawings={drawings}
          isMyBattleTurn={gameInfo.gamePlayers[0].playerUuid === userUuid}
        />
      );
    }

    // 마지막에 보상 장면
    scenes.push(<ResultScene key="reward" gameResultInfo={gameResultInfo} />);
    return scenes;
  }, [gameInfo, userUuid, drawings, endTime, gameResultInfo]);

  // 게임 구독
  useEffect(() => {
    if (!isConnected) return;

    // 🔔 에러 구독
    const gameErrorSub = stompClient.subscribe(
      `${SOCKET_GAME_ERROR_API}/${userUuid}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("게임 에러 발생!!!", payload);
      }
    );

    // 🔔 게임 상태 구독
    const gamePlaySub = stompClient.subscribe(
      `/sub${SOCKET_GAME_API}/${gameInfo?.roomId}`,
      (message) => {
        const payload = JSON.parse(message.body);
        const { eventType: type, data } = payload;
        console.log(type);
        console.log(data);

        switch (type) {
          case "ROUND_START":
            setSceneIdx((prev) => prev + 1);
            setEndTime(data.drawingEndTime);
            break;
          case "GUESS_START":
            setSceneIdx((prev) => prev + 1);
            setDrawings(data.imageURL);
            break;
          case "BATTLE_END":
            // TODO: API 변경되면 확인
            // 문자열 "null" → 실제 null로 바꿔줌
            const answerResults = [];
            for (let i = 0; i < data.length; i += 2) {
              const pair = [
                data[i] === "null" ? null : data[i],
                data[i + 1] === "null" ? null : data[i + 1],
              ];
              answerResults.push(pair);
            }
            setAnswerResults(answerResults);

            break;
          case "GAME_END":
            setGameResultInfo(data);
            setSceneIdx((prev) => prev + 1);
            break;
          default:
            break;
        }
      }
    );

    return () => {
      gameErrorSub.unsubscribe();
      gamePlaySub.unsubscribe();
    };
  }, [stompClient, isConnected, gameInfo, userUuid]);

  return {
    sceneIdx,
    gameInfo,
    answerResults,
    setGameInfo,
    renderScenes,
  };
};

export default useGame1Socket;
