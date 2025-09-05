import lobby_bgm from "assets/audio/LobbyBGM.mp3";
import battle_bgm from "assets/audio/battle.mp3";
import drawing_bgm from "assets/audio/drawing.mp3";
import description_bgm from "assets/audio/description.mp3";
import hook_sfx from "assets/audio/sfx/hook.mp3";

import correct from "assets/audio/correct.mp3";
import countdown from "assets/audio/countdown.mp3";
import defeat from "assets/audio/defeat.mp3";
import incorrect from "assets/audio/incorrect.mp3";
import pling from "assets/audio/pling.mp3";
import victory from "assets/audio/victory.mp3";

import drawing_bgm2 from "assets/audio/drawing2.mp3";
import fail from "assets/audio/fail.mp3";
import pass from "assets/audio/pass.mp3";
import pray from "assets/audio/pray.mp3";
import opening from "assets/audio/game2opening.wav";
import huh from "assets/audio/huh.wav";
import okay_rabbit from "assets/audio/okay_rabbit.mp3";

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

const correctSFX = {
  type: "sfx",
  isLoop: false,
  src: correct,
};

const countdownSFX = {
  type: "sfx",
  isLoop: false,
  src: countdown,
};

const defeatSFX = {
  type: "sfx",
  isLoop: false,
  src: defeat,
};

const incorrectSFX = {
  type: "sfx",
  isLoop: false,
  src: incorrect,
};

const plingSFX = {
  type: "sfx",
  isLoop: false,
  src: pling,
};

const victorySFX = {
  type: "sfx",
  isLoop: false,
  src: victory,
};

const game2DrawingBGM = {
  type: "bgm",
  isLoop: true,
  src: drawing_bgm2,
}

const failSFX = {
  type: "sfx",
  isLoop: false,
  src: fail,
};

const passSFX = {
  type: "sfx",
  isLoop: false,
  src: pass,
};

const praySFX = {
  type: "sfx",
  isLoop: false,
  src: pray,
};

const openingSFX = {
  type: "sfx",
  isLoop: false,
  src: opening,
};

const huhSFX = {
  type: "sfx",
  isLoop: false,
  src: huh,
};

const okayRabbitSFX = {
  type: "sfx",
  isLoop: false,
  src: okay_rabbit,
};

export {
  LobbyBGM,
  game1DrawingBGM,
  game1BattleBGM,
  game2DescriptionBGM,
  hookSFX,
  correctSFX,
  countdownSFX,
  defeatSFX,
  incorrectSFX,
  plingSFX,
  victorySFX,
  game2DrawingBGM,
  failSFX,
  passSFX,
  praySFX,
  openingSFX,
  huhSFX,
  okayRabbitSFX,
};
