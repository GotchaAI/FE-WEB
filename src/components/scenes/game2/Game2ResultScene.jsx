import fail_rabbit from "assets/components/scenes/game2/result-rabbit1.png";
import pass_rabbit from "assets/components/scenes/game2/result-rabbit2.png";
import { useEffect } from "react";
import "styles/components/scenes/game2/Game2ResultScene.scss";
import { passSFX, failSFX } from "constants/audio";
import useAudio from "hooks/audio/useAudio";

/**
 * Game2ResultScene 컴포넌트
 *
 * 게임2의 마지막 결과 화면을 구성하는 컴포넌트입니다.
 * - 유저의 그림이 AI로부터 평가된 후, 점수 및 피드백을 시각적으로 보여줍니다.
 * - 점수가 30점 이상이면 "합격" 상태로 표시되며, 그 외에는 "실패" 상태로 보여집니다.
 * - 성공/실패 여부에 따라 문구, 이미지, 스타일 클래스가 달라집니다.
 *
 * Props:
 * - gameData: {
 *     ...
 *     imageUrl: string,          // 유저가 그린 그림의 URL
 *     result: {
 *       score: number,          // AI 평가 점수
 *       feedback: string        // AI 피드백
 *     }
 *   }
 * - onExit: 나가기 버튼 클릭 시 호출되는 함수
 *
 * - Todo: 합격 점수 기준 정하기
 */

const Game2ResultScene = ({ gameData, onExit }) => {
  const score = gameData.result?.score;
  const feedback = gameData.result?.feedback;
  const imageUrl = gameData.imageUrl;

  const { playTrack } = useAudio();
  const isPass = score >= 50;

  useEffect(() => {
    if (score !== undefined && feedback && imageUrl) {
      playTrack(isPass ? passSFX : failSFX);
    }
  }, [score, feedback, imageUrl]);

  // 필요한 데이터가 하나라도 없으면 렌더링 생략
  if (score === undefined || !imageUrl || !feedback)
    return (
      <div className="game2-result-container">
        <span className="game2-loading">채점 중입니다...</span>
      </div>
    );

  return (
    <div className={`game2-result-container ${isPass ? "pass" : "fail"}`}>
      {/* 제목 및 결과 문구 */}
      <span className="result-title">축하합니다!</span>
      <span className="result-subtitle">
        {isPass ? "떴다 합격각ㅋ" : "와! 재수 확정!"}
      </span>

      {/* 결과에 따른 토끼 이미지 */}
      <img
        src={isPass ? pass_rabbit : fail_rabbit}
        alt="Rabbit"
        className="result-rabbit"
      />

      {/* 사용자가 그린 그림 */}
      <div className="game2-result-drawing">
        <img
          src={imageUrl}
          alt="내가 그린 그림"
          className="game2-drawing-img"
        />
      </div>

      {/* 점수 및 피드백 */}
      <div className={`result-content ${isPass ? "pass" : "fail"}`}>
        <div className="result-score-box">
          <div className="score-title">SCORE</div>
          <div className="score-value">{score}</div>
        </div>

        <div className="result-feedback-box">{feedback}</div>
      </div>

      {/* 종료 버튼 */}
      <button className="exit-button" onClick={onExit}>
        나가기
      </button>
    </div>
  );
};

export default Game2ResultScene;
