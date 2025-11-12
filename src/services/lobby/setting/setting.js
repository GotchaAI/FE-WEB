import { CHAT_SETTING_API } from 'constants/api';
import { apiInterface } from 'services/axiosForm';

const requestChatSetting = async () => {
  return await apiInterface('get', CHAT_SETTING_API, {}, {}, true);
};

const putChatSetting = async (chatSetting) => {
  return await apiInterface('put', CHAT_SETTING_API, chatSetting, {}, true);
};

export { requestChatSetting, putChatSetting };
