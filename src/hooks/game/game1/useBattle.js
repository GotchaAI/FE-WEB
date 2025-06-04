import { SOCKET_GAME_API } from "constants/api";
import { useCallback, useEffect, useState } from "react";
import { useGameSocketStore } from "store/socket";
import { getUserUuid } from "utils/user";

const useBattle = ({ roomId, goToNextScene }) => {
  const userUuid = getUserUuid();
  const { stompClient, isConnected } = useGameSocketStore();

  const [endTime, setEndTime] = useState(null);
  const [guessWord, setGuessWord] = useState(null);
  const [guessResult, setGuessResult] = useState(null);
  const [isMyguessTurn, setIsMyguessTurn] = useState(false);
  const [isAiguessTurn, setIsAiguessTurn] = useState(true);
  const [aiSays, setAiSays] = useState(null);

  useEffect(() => {
    if (!isConnected) return;

    const sub = stompClient.subscribe(
      `/sub${SOCKET_GAME_API}/${roomId}`,
      (message) => {
        const payload = JSON.parse(message.body);
        const { eventType: type, data } = payload;
        console.log(data);
        console.log(type);
        switch (type) {
          case "GUESS_REQUEST":
            setEndTime(data.guessEndTime);
            setGuessResult(null);
            setIsMyguessTurn(data.guesserUuid === userUuid);
            setIsAiguessTurn(data.guesserUuid === "AI");
            setAiSays(payload.aiSays);
            break;
          case "GUESS_SUBMIT":
            setGuessWord(data.guessWord);
            setAiSays(payload.aiSays);
            break;
          case "GUESS_RESULT":
            setGuessResult(data.correct);
            setAiSays(payload.aiSays);
            setGuessWord(null);
            if (data.correct) goToNextScene();
            break;
          default:
            break;
        }
      }
    );

    return () => sub.unsubscribe();
  }, [isConnected, stompClient, userUuid, roomId, goToNextScene]);

  const sendGuess = useCallback(
    (guess) => {
      if (!isConnected) return;

      stompClient.publish({
        destination: `/pub${SOCKET_GAME_API}/${roomId}`,
        body: JSON.stringify({
          eventType: "GUESS_SUBMIT",
          data: { guessWord: guess },
        }),
      });
    },
    [isConnected, stompClient, roomId]
  );

  return {
    endTime,
    guessWord,
    guessResult,
    isMyguessTurn,
    isAiguessTurn,
    aiSays,
    sendGuess,
  };
};

export default useBattle;
