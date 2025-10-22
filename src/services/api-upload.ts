// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class UploadApi {
  async upload(file: File) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/product`;
    const formData = new FormData();
    formData.append("image", file);
    return await axios.post<IBackendRes<IUpload>>(backendUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const uploadApi = new UploadApi();
