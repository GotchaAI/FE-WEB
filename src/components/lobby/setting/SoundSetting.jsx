import VolumeControl from "commons/ui/inputs/VolumeControl";
import { useEffect, useState } from "react";
import "styles/components/lobby/setting/SoundSetting.scss";

const SoundSetting = ({ save, setSave }) => {
  const [background, setBackground] = useState(50);
  const [soundEffect, setSoundEffect] = useState(50);

  useEffect(() => {
    if (!save) return;

    // 저장
    setSave((prev) => !prev);
  });

  return (
    <div className="sound-setting-container">
      <div className="sound-setting">
        <div className="background-container">
          <span className="background-title">배경음악</span>
          <VolumeControl value={background} setValue={setBackground} />
        </div>

        <div className="sound-effect-container">
          <span className="sound-effect-title">효과음</span>
          <VolumeControl value={soundEffect} setValue={setSoundEffect} />
        </div>
      </div>
    </div>
  );
};

export default SoundSetting;
