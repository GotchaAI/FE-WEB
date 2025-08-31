/**
 * 로컬 스토리지에서 배경음/효과음 볼륨 값을 읽어와 숫자 튜플로 반환한다.
 *
 * - 사용 키: "background-sound", "sound-effect-sound"
 * - 저장값이 없으면 각각 기본값 100을 사용한다.
 * - 반환 값의 범위는 0~100(의도한 설정 범위)에 맞춰 저장되어 있다고 가정한다.
 *
 * @returns {[number, number]} [backgroundSound, soundEffectSound]
 * @examples
 * const [bg, sfx] = getVolumes(); // 예: [80, 70]
 */
const getVolumes = () => {
  const backgroundSound = Number(
    localStorage.getItem("background-sound") ?? "100",
  );
  const soundEffectSound = Number(
    localStorage.getItem("sound-effect-sound") ?? "100",
  );

  return [backgroundSound, soundEffectSound];
};

/**
 * 로컬 스토리지에 배경음/효과음 볼륨 값을 저장한다.
 *
 * - 사용 키: "background-sound", "sound-effect-sound"
 * - 파라미터 값이 없으면 각각 기본값 100을 저장한다.
 *
 * @returns void
 * @examples
 * setVolumes(80,70);
 */
const setVolumes = (background = 100, soundEffect = 100) => {
  localStorage.setItem("background-sound", String(background));
  localStorage.setItem("sound-effect-sound", String(soundEffect));
};

export { getVolumes, setVolumes };
