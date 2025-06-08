import leftCloudImg from "assets/components/scenes/commons/left-cloud.png";
import rightCloudImg from "assets/components/scenes/commons/right-cloud.png";
import aiImg from "assets/components/scenes/game1/ai.png";
import userImg from "assets/components/scenes/game1/player.png";
import Timer from "commons/Timer";
import useBattle from "hooks/game/game1/useBattle";
import { useEffect, useState } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game1/BattleScene.scss";
import { isPressEnterKey } from "utils/keyDown";
import { isBlank } from "utils/validation";

const BattleScene = ({ roomId, drawings }) => {
  // 배틀 씬 guess 상태 관리 훅 호출
  const {
    endTime,
    guessWord,
    guessResult,
    isMyguessTurn,
    isAiguessTurn,
    aiSays,
    isSubmit,
    sendGuess,
  } = useBattle({ roomId });

  const [inputValue, setInputValue] = useState("");
  const [aiSaying, setAiSaying] = useState(true);
  useEffect(() => {
    useToastStore.getState().showToast("gamealert", "AI가 맞출 차례입니다!");
  }, []);

  useEffect(() => {
    if (!isAiguessTurn) {
      // player 턴으로 이동
      const timer = setTimeout(() => {
        setAiSaying(false); // 3초 후 ai 말풍선 삭제
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // ai 턴으로 이동
      setInputValue("");
      setAiSaying(true);
    }
  }, [isAiguessTurn]);

  useEffect(() => {
    if (guessResult === null) return;

    if (guessResult) useToastStore.getState().showToast("gameO");
    else useToastStore.getState().showToast("gameX");
  }, [guessResult]);

  const handleKeyDown = (e) => {
    if (isPressEnterKey(e)) {
      e.preventDefault();
      if (!isBlank(inputValue)) {
        sendGuess(inputValue);
      }
    }
  };

  const autoSendHandler = () => {
    if (!isMyguessTurn || isSubmit) return;
    sendGuess(inputValue);
  };

  return (
    <div className="battle-scene-container">
      {/* 플레이어 아바타 */}
      <div className="user-container">
        <div className="user">
          <img src={userImg} alt="플레이어" />
        </div>
      </div>

      {/* 말풍선 이미지 (왼쪽: 플레이어) */}

      {!isAiguessTurn ? (
        isMyguessTurn ? (
          <>
            <img
              src={leftCloudImg}
              className="left-cloud-img"
              alt="플레이어 말풍선"
            />
            <textarea
              className="player-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="정답을 입력해주세요"
            />
          </>
        ) : (
          <>
            <img
              src={leftCloudImg}
              className="left-cloud-img"
              alt="플레이어 말풍선"
            />
            <textarea className="player-input" value={guessWord} readOnly />
          </>
        )
      ) : null}

      {/* 말풍선 이미지 (오른쪽: AI) */}

      {/** ai가 틀렸을 때 대사 표시  */}
      {aiSaying && aiSays ? (
        <>
          <img
            src={rightCloudImg}
            className="right-cloud-img"
            alt="인공지능 말풍선"
          />
          <textarea className="ai-input" value={aiSays} readOnly />
        </>
      ) : null}

      {/* 그림 영역 */}
      <div className="drawing-container">
        <div className="game-header">
          {/* 타이머 ⏰ */}
          <Timer endTime={endTime} goToNextFlow={autoSendHandler} />
        </div>
        {drawings && <img src={drawings} className="drawing" alt="그림" />}
      </div>

      {/* AI 아바타 */}
      <div className="ai-container">
        <img src={aiImg} alt="인공지능" />
        <div className="ai"></div>
      </div>
    </div>
  );
};

export default BattleScene;
