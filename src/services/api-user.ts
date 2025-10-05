// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class UserApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
    return axios.post(backendUrl, data);
  }

  async findOne(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
    return await axios.get<IBackendRes<IUser>>(backendUrl);
  }

  async findAll(page?: number, limit?: number) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?page=${page}&limit=${limit}`;
    return await axios.get<IBackendRes<IUserWithPage>>(backendUrl);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;

    return axios.put(backendUrl, data);
  }

  async delete(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;

    return await axios.delete(backendUrl);
  }
}

export const userApi = new UserApi();
