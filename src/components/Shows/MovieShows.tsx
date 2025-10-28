import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import showService from "../../services/showService";
import type { Show } from "../../types/show";

const ShowWidget = ({show}: {show:Show}) => {
    return(<>
    <h3>Date: {show.startTime.toDateString()}</h3>
    <div>location: {show.theatre.location}</div>
    <div>theatre: {show.theatre.name}</div>
    <div>start: {show.startTime.toLocaleTimeString()}</div>
    <div>end: {show.endTime.toLocaleTimeString()}</div>
    <div>language: {show.language}</div>
    </>)
}

const MovieShows = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const movieId = useParams().id;

    useEffect(() => {
        showService.getShowsForMovie(Number(movieId))
            .then(s => setShows(s));
    }, []);

    return(
        <>
        {shows.map((show, index) => <ShowWidget key={index} show={show} />)}
        </>
    )
}

export default MovieShows;