import {
  NICKNAME_DUPLICATED,
} from "constants/errorCode";

import {
  NICKNAME_DUPLICATED_ERROR_MESSAGE,
  NICKNAME_VAILDATION_ERROR_MESSAGE,
} from "constants/errorMessage";

export const nicknameErrorMap = {
  409: {
    [NICKNAME_DUPLICATED]: NICKNAME_DUPLICATED_ERROR_MESSAGE,
    default: NICKNAME_DUPLICATED_ERROR_MESSAGE,
  },
  422: {
    default: NICKNAME_VAILDATION_ERROR_MESSAGE,
  },
};