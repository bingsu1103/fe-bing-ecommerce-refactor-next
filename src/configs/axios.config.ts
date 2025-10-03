import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// const refreshToken = async () => {
//   const res = await instance.post<IBackendRes<IRefresh>>("/auth/refresh-token");
//   console.log(res);

//   if (res && res.data) {
//     return res.data.accessToken;
//   } else return null;
// };

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response.data || response;
  },
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      //   const access_token = await refreshToken();
      //   if (access_token && error.config) {
      //     error.config.headers = error.config.headers || {};
      //     error.config.headers["Authorization"] = `Bearer ${access_token}`;
      //     localStorage.setItem("accessToken", access_token);
      //     return instance.request(error.config);
      //   }
      return;
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default instance;
