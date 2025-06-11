import leftCloudImg from "assets/components/scenes/commons/left-cloud.png";
import rightCloudImg from "assets/components/scenes/commons/right-cloud.png";
import aiImg from "assets/components/scenes/game1/ai.png";
import userImg from "assets/components/scenes/game1/player.png";
import Timer from "commons/Timer";
import useBattle from "hooks/game/game1/useBattle";
import { useEffect, useRef, useState } from "react";
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

  const { showToast } = useToastStore.getState();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [aiSaying, setAiSaying] = useState(true);

  useEffect(() => {
    showToast("gamealert", "AI가 맞출 차례입니다!");
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

  // 플레이어 턴일 때 input 포커스
  useEffect(() => {
    if (!isAiguessTurn && isMyguessTurn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAiguessTurn, isMyguessTurn]);

  useEffect(() => {
    if (guessResult === null) return;

    if (guessResult) showToast("gameO");
    else showToast("gameX");
  }, [guessResult]);

  const handleKeyDown = (e) => {
    if (isSubmit) return;
    if (isPressEnterKey(e)) {
      e.preventDefault();
      if (!isBlank(inputValue)) {
        inputRef.current?.blur();
        sendGuess(inputValue);
      }
    }
  };

  const autoSendHandler = () => {
    if (!isMyguessTurn || isSubmit) return;
    inputRef.current?.blur();
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

      {!isAiguessTurn &&
        (isMyguessTurn ? (
          <div className="bubble-container">
            <svg
              className="left-cloud-img"
              width="104"
              height="136"
              viewBox="0 0 104 136"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.7013 127.007C40.5337 128.714 40.489 132.668 40.8447 134.356C40.8447 135.101 41.4177 132.801 42.3416 132.001C43.5652 130.942 44.178 130.146 45.1445 128.852C45.7753 128.007 45.6389 126.911 46.8326 126.911C47.4236 126.911 48.0836 127.131 48.6501 127.32L48.7117 127.341C49.8716 127.727 51.4675 127.538 52.6612 127.42C55.1575 127.173 57.8779 126.825 60.3372 126.338C62.1288 125.984 63.7146 124.233 65.1307 123.141C68.199 120.775 71.0068 119.08 73.5233 116.046C75.7381 113.376 78.3479 110.974 80.9764 108.713C84.0254 106.09 87.0823 103.879 89.799 100.855C92.2112 98.1694 93.9919 94.6865 95.7232 91.5331C101.041 81.8465 103.276 71.2665 102.348 60.2275C101.674 52.2036 100.624 43.9297 97.4749 36.4619C95.4698 31.7071 93.1582 27.1133 90.866 22.4953C87.0623 14.8321 82.5625 7.93549 73.7781 5.6971C69.1426 4.51589 64.282 4.22043 59.6046 3.19964C54.7568 2.14165 49.9251 1.49756 44.9534 1.49756C34.7811 1.49756 23.149 2.70695 16.2879 11.0102C12.1099 16.0662 8.75843 22.3881 6.74864 28.6037C4.91632 34.2704 3.0609 40.1196 2.27363 46.0381C1.25808 53.6729 1.07739 61.7368 2.30549 69.3424C4.13448 80.6694 11.6981 90.9751 18.4856 99.9322C22.9303 105.798 27.7258 111.36 33.7738 115.649C35.6015 116.945 37.5294 117.753 39.6025 118.544C40.0015 118.696 40.8916 118.897 41.0676 119.403C41.7656 121.407 40.9069 124.912 40.7013 127.007Z"
                fill="#E9FF9F"
                stroke="black"
                strokeWidth="1.08134"
                strokeLinecap="round"
              />
            </svg>
            <textarea
              className="player-input"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="정답을 입력해주세요"
            />
          </div>
        ) : (
          <>
            <img
              src={leftCloudImg}
              className="left-cloud-img"
              alt="플레이어 말풍선"
            />
            <textarea className="player-input" value={guessWord} readOnly />
          </>
        ))}

      {/* 말풍선 이미지 (오른쪽: AI) */}

      {/** ai가 틀렸을 때 대사 표시  */}
      {aiSaying && aiSays && (
        <>
          <img
            src={rightCloudImg}
            className="right-cloud-img"
            alt="인공지능 말풍선"
          />
          <textarea className="ai-input" value={aiSays} readOnly />
        </>
      )}

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
