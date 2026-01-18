
export enum ProfileItems {
    PROFILE = 'profile',
    TICKETS = 'tickets',
    SHOWS = 'shows',
    THEATRES = 'theatres'
}

export type TheatreShow = {
    language: string;
    startTime: Date;
    endTime: Date;
    id: string;
    movieName: string;
}