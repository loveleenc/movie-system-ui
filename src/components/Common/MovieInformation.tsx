import type React from "react";
import type { Movie } from "../../types/movie"
import { Link } from "react-router-dom";
import common from "../../utils/common";

const MovieDetails = ({ details }: { details: string[] | undefined }) => {
    return (
        <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
            {details?.map(data => <div className="movie-genre-language">{data}</div>)}
        </div>
    )
}


const MovieInformation = ({ movie, dialogRef }: { movie: Movie | null; dialogRef: React.RefObject<HTMLDialogElement | null> }) => {

    if (movie === null) {
        return <></>
    }
    return (
        <dialog ref={dialogRef} style={{ textAlign: 'center' }} className="commonFontColor movie-information-dialog">
            <img src={movie.poster} />
            <h4>{movie.name}</h4>
            <div className="movie-info-inline">
                <div>{common.getDate((movie.releaseDate as Date).toString())}</div>
                <div>{common.getDuration(movie.duration as number)}</div>
            </div>
            <MovieDetails details={movie.genreList} />
            <MovieDetails details={movie.languages} />
            <form method="dialog" className="movie-info-inline">
                <div><Link to={`/movie/${movie.id}/shows`} className="navigationBarButton">View Shows</Link></div>
                <button className="navigationBarButton" onClick={() => dialogRef.current?.close()}>close</button>
            </form>
        </dialog>
    )
}


export default MovieInformation