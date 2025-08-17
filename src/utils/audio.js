const getVolumes = () => {
  const a = Number(localStorage.getItem("background-sound") ?? "100");
  const b = Number(localStorage.getItem("sound-effect-sound") ?? "100");

  return [a, b];
};

const setVolumes = (background = 100, soundEffect = 100) => {
  localStorage.setItem("background-sound", String(background));
  localStorage.setItem("sound-effect-sound", String(soundEffect));
};

export { getVolumes, setVolumes };
