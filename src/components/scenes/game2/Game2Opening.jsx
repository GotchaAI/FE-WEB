import { useEffect } from "react";
import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit from "assets/components/scenes/game2/midae-rabbit0.png";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game2/Game2Opening.scss";
import { openingSFX } from "constants/audio";
import useAudio from "hooks/audio/useAudio";

/**
 * Game2Opening:
 * - 진입 시 토스트 알림
 * - 일정시간 후 자동으로 다음 씬으로 전환
 */
const Game2Opening = ({ onNext }) => {
  const { playTrack } = useAudio();

  useEffect(() => {
    playTrack(openingSFX);

    // 토스트 표시
    useToastStore
      .getState()
      .showToast("gamealert", "루루가 원하는 것을 그려주세요!", 3000);

    setTimeout(() => {
      onNext(); // 자동 이동
    }, 3000); // 토스트 끝나자마자 살짝 여유 주기
  }, [onNext]);

  return (
    <div className="game2-opening-container">
      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img src={midae_rabbit} alt="Rabbit" className="rabbit-img" />
    </div>
  );
};

export default Game2Opening;
