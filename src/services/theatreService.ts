import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../utils/config";
import { NewTheatre, Theatre } from "../types/theatre";

const baseUrl: string = config.BASE_URL;


const getTheatres = ():Promise<AxiosResponse<Theatre[]>> => {
    const config:AxiosRequestConfig = {
            withCredentials: true
    }
    return axios.get(`${baseUrl}/theatre`, config);
}

const createTheatre = (newTheatre: NewTheatre):Promise<AxiosResponse<Theatre>> => {
    const csrfToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    const requestConfig: AxiosRequestConfig = {
        withCredentials: true, 
        headers: {
            "X-XSRF-TOKEN": csrfToken,
        }
    }
    
    return axios.post(`${baseUrl}/theatre`, newTheatre, requestConfig);
}

export default {
    getTheatres,
    createTheatre
}