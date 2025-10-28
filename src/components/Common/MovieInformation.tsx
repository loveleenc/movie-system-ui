import type React from "react";
import type { Movie } from "../../types/movie"
import { Link } from "react-router-dom";


const MovieInformation = ({movie, dialogRef}: {movie: Movie | null; dialogRef: React.RefObject<HTMLDialogElement | null>}) => {


    if(movie === null){
        return <></>
    }
    return (
        <dialog ref={dialogRef}>
            <img src={movie.poster} />
            <div>{movie.name}</div>
            <div>Release Date: {movie.releaseDate.toString()}</div>
            <div>Duration: {movie.duration} min</div>
            <div>Genre: {movie.genreList.toString()}</div>
            <div>Languages: {movie.languages.toString()}</div>
            <form method="dialog">
                <div><Link to={`/movie/${movie.id}/shows`}><button>View Shows</button></Link></div>
                <button onClick={() => dialogRef.current?.close()}>close</button>
                
            </form>
        </dialog>
    )
}


export default MovieInformation