// 서버 Base url
export const SERVER_IP = process.env.REACT_APP_SERVER_IP;
export const LOCAL_SERVER_IP = process.env.REACT_APP_LOCAL_SERVER_IP;

// 인증 api
export const SIGN_IN_API = process.env.REACT_APP_SIGN_IN_API;
export const SIGN_UP_API = process.env.REACT_APP_SIGN_UP_API;
export const GUEST_SIGN_IN_API = process.env.REACT_APP_GUEST_SIGN_IN_API;
export const GUEST_SIGN_UP_API = process.env.REACT_APP_GUEST_SIGN_UP_API;
export const TOKEN_REISSUE_API = process.env.REACT_APP_TOKEN_REISSUE_API;
export const CSRF_TOKEN_API = process.env.REACT_APP_CSRF_TOKEN_API;

export const EMAIL_SEND_API = process.env.REACT_APP_EMAIL_SEND_API;
export const EMAIL_VERIFY_API = process.env.REACT_APP_EMAIL_VERIFY_API;

// 사용자 정보 조회
export const USER_ME_API = process.env.REACT_APP_USER_ME_API;
export const NICKNAME_CHECK_API = process.env.REACT_APP_NICKNAME_CHECK_API;

// 이미지 전송 API
export const IMAGE_UPLOAD_API = process.env.REACT_APP_IMAGE_UPLOAD_API;

// 소켓 Base url
export const SOCKET_IP = process.env.REACT_APP_SOCKET_BASE_URL;
export const LOCAL_SOCKET_IP = process.env.REACT_APP_SOCKET_BASE_URL;

// 소켓 연결 API
export const SOCKET_CONNECT_API = process.env.REACT_APP_WS_ENDPOINT;

// 소켓 재연결 API(접속 중이던 대기방 로드)
export const SOCKET_RECONNECT_API = process.env.REACT_APP_SOCKET_RECONNECT_API; // 게임 API

// 소켓 글로벌 에러 API
export const SOCKET_GLOBAL_ERROR_API =
  process.env.REACT_APP_WS_GLOBAL_ERROR_API;

// 소켓 로비 API
export const SOCKET_LOBBY_ERROR_API = process.env.REACT_APP_WS_LOBBY_ERROR_API; // 로비 에러 API

export const SOCKET_ROOM_LIST_EVENT =
  process.env.REACT_APP_WS_ROOM_LIST_EVENT_API; // 로비 목록 변경 API

export const SOCKET_LOBBY_CREATE_API =
  process.env.REACT_APP_WS_LOBBY_CREATE_API; // 로비 대기방 생성 API

export const SOCKET_LOBBY_JOIN_API = process.env.REACT_APP_WS_LOBBY_JOIN_API; // 로비 대기방 입장 API

// 대기방 API
export const SOCKET_ROOM_ERROR_API = process.env.REACT_APP_WS_ROOM_ERROR_API; // 대기방 에러 API

export const SOCKET_ROOM_API = process.env.REACT_APP_WS_ROOM_API; // 대기방 API

export const ROOM_LIST_API = process.env.REACT_APP_ROOM_LIST_API; // 방목록 API

export const SOCKET_GAME_API = process.env.REACT_APP_WS_GAME_API; // 게임 API

export const SOCKET_GAME_ERROR_API = process.env.REACT_APP_WS_GAME_ERROR_API; // 게임 API

// 게임2 API
export const GAME2_START_API = process.env.REACT_APP_GAME2_START_API;
export const GAME2_TASK_API = process.env.REACT_APP_GAME2_TASK_API;
export const GAME2_EVALUATE_API = process.env.REACT_APP_GAME2_EVALUATE_API;

// 채팅 소켓 API
export const SOCKET_CHAT_ALL = process.env.REACT_APP_WS_CHAT_ALL_API;
export const SOCKET_CHAT_PRIVATE = process.env.REACT_APP_WS_CHAT_PRIVATE_API;

// 공지사항 API
export const ANNOUNCE_LIST_API = process.env.REACT_APP_ANNOUNCE_LIST_API;