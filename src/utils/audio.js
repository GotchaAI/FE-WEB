const getVolumes = () => {
  const backgroundSound = Number(
    localStorage.getItem("background-sound") ?? "100",
  );
  const soundEffectSound = Number(
    localStorage.getItem("sound-effect-sound") ?? "100",
  );

  return [backgroundSound, soundEffectSound];
};

const setVolumes = (background = 100, soundEffect = 100) => {
  localStorage.setItem("background-sound", String(background));
  localStorage.setItem("sound-effect-sound", String(soundEffect));
};

export { getVolumes, setVolumes };
