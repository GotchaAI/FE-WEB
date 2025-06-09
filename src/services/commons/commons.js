import { IMAGE_UPLOAD_API } from "constants/api";
import { multipartApiInterface } from "services/axiosForm";

export const imageUploadAPI = async (image) => {
  return await multipartApiInterface("post", IMAGE_UPLOAD_API, image);
};
