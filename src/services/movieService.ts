import axios, { type AxiosRequestConfig } from "axios";
import type { Movie, movieFilters } from "../types/movie";
import config from "../utils/config";

const baseUrl:string = config.BASE_URL;

const getAll = ():Promise<Movie[]> => {
    const config:AxiosRequestConfig = {
        withCredentials: true
    }
    return axios.get(`${baseUrl}/movies`, config).then(response => response.data);
}

const getNowShowing = ():Promise<Movie[]> => {
    return axios.get(`${baseUrl}/movies/ongoing`).then(response => response.data);
}

const getUpcoming = ():Promise<Movie[]> => {
    return axios.get(`${baseUrl}/movies/upcoming`).then(response => response.data);
}

const getMoviesByFilter = ( filters: movieFilters
):Promise<Movie[]> => {
    const requestConfigParams:movieFilters = {
        genre: filters.genre,
        language: filters.language,
        releasedOnOrAfter: filters.releasedOnOrAfter
    }
    return axios.get(`${baseUrl}/movies/filter`, {params: requestConfigParams}).then(response => response.data);
}

const getMovieById = (id: number):Promise<Movie> => {
    return axios.get(`${baseUrl}/movie/${id}`).then(response => response.data);
}


export default {
    getAll,
    getNowShowing,
    getUpcoming,
    getMoviesByFilter,
    getMovieById
}