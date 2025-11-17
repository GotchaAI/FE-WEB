import { ADMIN_ANNOUNCE_DELETE_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const eraseNotification = async (notificationId) => {
  return await apiInterface(
    "delete",
    `${ADMIN_ANNOUNCE_DELETE_API}/${notificationId}`,
    { notificationId },
    {},
    true
  );
};
