import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:8080";

const login = (username: string, password: string): Promise<AxiosResponse> => {
  const csrfToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const axiosConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
      "X-XSRF-TOKEN": csrfToken,
    },
  };
  return axios.post(
    `${baseUrl}/login`,
    {
      username: username,
      password: password,
    },
    axiosConfig
  );
};

const userIsLoggedIn = () => {
  return axios
    .get(`${baseUrl}/loginstatus`, { withCredentials: true })
    .then((response) => response.data);
};

const logout = () => {
  return axios
    .post(`${baseUrl}/logout`, {}, { withCredentials: true })
    .then((response) => response.data);
};

export default {
  login,
  userIsLoggedIn,
  logout,
};
