import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    // const session = await getSession();
    // console.log("session", session);

    // if (session?.access_token) {
    //   config.headers.Authorization = `Bearer ${session.access_token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response.data || response;
  },
  async (error) => {
    return Promise.reject(error.response?.data || error);
  }
);

export default instance;
