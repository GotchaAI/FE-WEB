import VolumeControl from "commons/ui/inputs/VolumeControl";
import { useEffect, useState } from "react";
import { audioStore } from "store/audio";
import "styles/components/lobby/setting/SoundSetting.scss";
import { getVolumes, setVolumes } from "utils/audio";

const SoundSetting = ({ save, setSave }) => {
  const [backgroundVolume, soundEffectVolume] = getVolumes();
  const [background, setBackground] = useState(backgroundVolume);
  const [soundEffect, setSoundEffect] = useState(soundEffectVolume);

  const { setVolume } = audioStore.getState();

  useEffect(() => {
    setBackground(backgroundVolume);
    setSoundEffect(soundEffectVolume);
  }, [backgroundVolume, soundEffectVolume]);

  useEffect(() => {
    if (!save) return;
    setVolume(background);
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
