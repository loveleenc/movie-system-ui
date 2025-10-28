import axios from "axios";
import type { Movie, movieFilters } from "../types/movie";

const baseUrl:string = "http://localhost:8080";

const getAll = ():Promise<Movie[]> => {
    return axios.get(`${baseUrl}/movies`).then(response => response.data);
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