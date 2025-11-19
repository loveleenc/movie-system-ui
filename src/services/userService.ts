import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import config from "../utils/config";
import { NewUser } from "../types/user";

const baseUrl: string = config.BASE_URL;

const register = (newUser:NewUser):Promise<AxiosResponse> => {
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
    `${baseUrl}/register`,
    newUser,
    axiosConfig
  );
}

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
  register
};
