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