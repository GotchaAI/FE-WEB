import { ADMIN_ANNOUNCE_MANAGE_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const eraseNotification = async (notificationId) => {
  return await apiInterface(
    "delete",
    `${ADMIN_ANNOUNCE_MANAGE_API}/${notificationId}`,
    { notificationId },
    {},
    true
  );
};

export const updateAnnounceAPI = async (notification) => {
  return await apiInterface(
    "put",
    `${ADMIN_ANNOUNCE_MANAGE_API}/${notification.id}`,
    { title: notification.title, content: notification.content },
    {},
    true
  );
};

export const postAnnounceAPI = async (notification) => {
  return await apiInterface(
    "post",
    `${ADMIN_ANNOUNCE_MANAGE_API}`,
    { title: notification.title, content: notification.content },
    {},
    true
  );
};
