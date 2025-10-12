// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class AuthApi {
  async register(
    username: string,
    password: string,
    full_name: string,
    email: string
  ) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;

    return await axios.post<IBackendRes<IRegister>>(backendUrl, {
      username,
      password,
      full_name,
      email,
    });
  }

  async login(username: string, password: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;

    return await axios.post<IBackendRes<ILogin>>(backendUrl, {
      username,
      password,
    });
  }

  async refresh(refresh_token: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`;
    return await axios.post(backendUrl, { refresh_token });
  }

  async fetchAccount(access_token: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/fetch`;

    return await axios.get<IBackendRes<IFetch>>(backendUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }

  async logout(access_token: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`;
    return await axios.post(
      backendUrl,
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
  }

  async forgot(email: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot`;

    return await axios.post<IBackendRes<null>>(backendUrl, { email });
  }

  async verify(email: string, otp: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`;

    return await axios.post<IBackendRes<IVerify>>(backendUrl, { email, otp });
  }

  async reset(reset_token: string, new_password: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset`;

    return await axios.post<IBackendRes<null>>(backendUrl, {
      reset_token,
      new_password,
    });
  }
}

export const authApi = new AuthApi();
