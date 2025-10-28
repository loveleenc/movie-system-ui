import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import movieService from "../../services/movieService";



const MoviePage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const id = useParams().id;

    useEffect(() => {
        movieService.getMovieById(Number(id))
            .then(returnedMovie => {
                setMovie(returnedMovie);
            })
    }, [])


    return (
        <>
        
        <div>movie page goes here: {id}</div>
        </>
    )
}

export default MoviePage;