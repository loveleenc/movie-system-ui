import axios from "axios"
import type { Show } from "../types/show";

const baseUrl:string = "http://localhost:8080";


const getShowsForMovie = async (movieId: number):Promise<Show[]> => {
    const shows = await axios.get(`${baseUrl}/movie/${movieId}/shows`);
    return shows.data.map((show:Show) => {
        return {
            ...show,
            startTime: new Date(show.startTime),
            endTime: new Date(show.endTime)
        }
    });
}

export default {
    getShowsForMovie
}