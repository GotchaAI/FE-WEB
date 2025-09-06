import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit5 from "assets/components/scenes/game2/midae-rabbit5.png";
import midae_rabbit3 from "assets/components/scenes/game2/midae-rabbit3.png";
import midae_rabbit4 from "assets/components/scenes/game2/midae-rabbit4.png";
import "styles/components/scenes/game2/DrawingDescription.scss";
import { useState } from "react";
import useAudio from "hooks/audio/useAudio";
import { game2DescriptionBGM, huhSFX } from "constants/audio";
import { randomIdxSelect } from "utils/random";

/**
 * DrawingDescription 컴포넌트
 *
 * Game2에서 AI가 생성한 설명(description)을 사용자에게 보여주는 화면입니다.
 * - `description`이 있을 경우 설명과 함께 '오케이', '네?' 버튼을 표시합니다.
 * - '오케이' 버튼 클릭 시 다음 씬으로 넘어갑니다.
 * - '네?' 버튼 클릭 시 콘솔에 거절 메시지를 출력합니다. (뭐 추가하지)
 *
 * Props:
 * - description (string): AI가 생성한 설명 텍스트
 * - onOk (function): 오케이 버튼 클릭 시 호출되는 콜백 (다음 씬으로 이동)
 */

const DrawingDescription = ({ description, onOk }) => {
  const { playTrack } = useAudio();
  useAudio(game2DescriptionBGM);

  const rabbitImages = [midae_rabbit5, midae_rabbit3, midae_rabbit4];
  const [rabbitSrc, setRabbitSrc] = useState(rabbitImages[0]);

  const rabbitClassMap = {
    [midae_rabbit5]: "rabbit-img rabbit-5",
    [midae_rabbit3]: "rabbit-img rabbit-3",
    [midae_rabbit4]: "rabbit-img rabbit-4",
  };

  const onCancel = () => {
    playTrack(huhSFX);
    const randomIndex = randomIdxSelect(rabbitImages.length);
    setRabbitSrc(rabbitImages[randomIndex]);
    console.log("이딴걸 그리라고?");
  };

  return (
    <div className="drawing-description-container">
      <div className="description-box-wrapper">
        <div className="description-box">
          <div className="text-content">
            {description ? description : "토선생이 생각중입니다..."}
          </div>
        </div>
      </div>

      {description && (
        <div className="button-box">
          <button className="ok-btn" onClick={onOk}>
            오케이
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            네?
          </button>
        </div>
      )}
      <div className="button-box">
        <button className="ok-btn" onClick={onOk}>
          오케이
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          네?
        </button>
      </div>

      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img
        src={rabbitSrc}
        alt="Midae Rabbit"
        className={rabbitClassMap[rabbitSrc]}
      />
    </div>
  );
};

export default DrawingDescription;
