import VolumeControl from "commons/ui/inputs/VolumeControl";
import { useEffect, useState } from "react";
import { audioStore } from "store/audio";
import "styles/components/lobby/setting/SoundSetting.scss";
import { getVolumes, setVolumes } from "utils/audio";

const SoundSetting = ({ save, setSave }) => {
  const { bgm, sfx } = getVolumes();
  const [background, setBackground] = useState(bgm);
  const [soundEffect, setSoundEffect] = useState(sfx);

  const { setVolume } = audioStore.getState();

  useEffect(() => {
    setBackground(bgm);
    setSoundEffect(sfx);
  }, [bgm, sfx]);

  useEffect(() => {
    if (!save) return;
    setVolume("bgm", background);
    setVolume("sfx", soundEffect);
    setVolumes(background, soundEffect);

    setSave((prev) => !prev);
  }, [save, setSave]);

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
