import type { Movie } from "./movie";
import type { Theatre } from "./theatre";

export type Show = {
    language: string;
    startTime: Date;
    endTime: Date;
    id: string;
    theatre: Theatre;
    movie: Movie;
}

export type ShowByMovie = {
    language: string;
    startTime: Date;
    endTime: Date;
    id: string;
    theatreDto: Theatre;
}

export interface ShowsByTheatre extends Theatre{
    languages: ShowsByLanguage[];
}

export type ShowsByLanguage = {
    language: string;
    shows: ShowInformation[];
}


export type ShowInformation = {
    date: string;
    startTime: string;
    endTime: string;
    id:string;
}