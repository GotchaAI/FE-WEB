import { useEffect } from "react";
import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit from "assets/components/scenes/game2/midae-rabbit0.png";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game2/Game2Opening.scss";

/**
 * Game2Opening:
 * - 진입 시 토스트 알림
 * - 제시어/설명 fetch 완료되면 자동으로 다음 씬으로 전환
 */
const Game2Opening = ({ fetchPrompt, onNext }) => {
  useEffect(() => {
    // 토스트 표시
    useToastStore
      .getState()
      .showToast("gamealert", "AI를 속여 제시어를 그려주세요!", 5000);

    const startTransition = async () => {
      await fetchPrompt(); // 제시어 요청

      // 약간의 모달 종료 타이밍을 흉내
      setTimeout(() => {
        onNext(); // 자동 이동
      }, 5000); // 토스트 끝나자마자 살짝 여유 주기
    };

    startTransition();
  }, [fetchPrompt, onNext]);

  return (
    <div className="game2-opening-container">
      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img src={midae_rabbit} alt="Rabbit" className="rabbit-img" />
    </div>
  );
};

export default Game2Opening;
