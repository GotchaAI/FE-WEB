import lobby_bgm from "assets/audio/LobbyBGM.mp3";
import battle_bgm from "assets/audio/battle.mp3";
import drawing_bgm from "assets/audio/drawing.mp3";
import description_bgm from "assets/audio/description.mp3";
import hook_sfx from "assets/audio/sfx/hook.mp3";
/**
 * 오디오 파일 상수
 *
 * 사용법
 * : {type, isLoop, src} 로 구성된 오디오 파일을 useAudio 훅을 통해 실행
 *
 * type 종류 : "bgm", "sfx"
 * isLoop : true / false (반복 여부)
 * src : 파일 경로
 */

const LobbyBGM = {
  type: "bgm",
  isLoop: true,
  src: lobby_bgm,
};

const game1DrawingBGM = {
  type: "bgm",
  isLoop: true,
  src: drawing_bgm,
};

const game1BattleBGM = {
  type: "bgm",
  isLoop: true,
  src: battle_bgm,
};

const game2DescriptionBGM = {
  type: "bgm",
  isLoop: true,
  src: description_bgm,
};

const hookSFX = {
  type: "sfx",
  isLoop: false,
  src: hook_sfx,
};

export {
  LobbyBGM,
  game1DrawingBGM,
  game1BattleBGM,
  game2DescriptionBGM,
  hookSFX,
};
