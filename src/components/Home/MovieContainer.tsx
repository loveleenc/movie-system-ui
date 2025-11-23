import MovieSprite from "../Common/MovieSprite";
import MovieInformation from "../Common/MovieInformation";
import { useRef } from "react";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";


const getMovieSubset = (movies: Movie[], currentIndex: number): Movie[] => {
    const maxDisplay = 5;
    if (movies.length <= maxDisplay) {
        return movies;
    }
    const k = new Array();
    const a = k.concat(movies.slice(currentIndex, currentIndex + maxDisplay));
    if (currentIndex + maxDisplay > movies.length - 1) {
        return a.concat(movies.slice(0, currentIndex + maxDisplay - movies.length - 1))
    }
    return a;
}


const MovieContainer = ({
    movies,
    title,
    comingSoon
}: {
    movies: Movie[];
    title: string;
    comingSoon: boolean;
}) => {
    const [currentMovieId, setCurrentMovieId] = useState<number>(0);
    const movieDialogRef = useRef<HTMLDialogElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const getMovie = (): Movie | null => {
        const filteredMovies: Movie[] = movies.filter(movie => movie.id === currentMovieId)
        return filteredMovies.length === 0 ? null : filteredMovies[0];
    }

    const onClickingMovie = (id: number) => {
        if(id === currentMovieId){
            movieDialogRef.current?.showModal();
            return;
        }
        setCurrentMovieId(id);
    }

    useEffect(() => {
        movieDialogRef.current?.showModal();
    }, [currentMovieId])

    const setIndexValue = (newValue: number) => {
        if (newValue < 0) {
            newValue = movies.length - 1;
        }
        else if (newValue === movies.length) {
            newValue = 0;
        }
        setCurrentIndex(newValue);
    }

    if (movies.length === 0) {
        return (
            <>
                <h2 className="commonFontColor">{title}</h2>
                <div className="movie-sprite-container">
                    <div className={movies.length === 0 ? 'spinner' : ''}></div>
                </div>

            </>
        );
    }
    
    return (
        <div className="movie-slider-main-container">
            <h2 className="commonFontColor">{title}</h2>
            <div className="movie-button-sprite-container">
                <div className="movie-sprite-container">
                    <MovieInformation movie={getMovie()} dialogRef={movieDialogRef} comingSoon={comingSoon}/>
                    {
                        getMovieSubset(movies, currentIndex)
                            .map((movie, index) => (
                                <MovieSprite key={index} movie={movie} onClickingSprite={onClickingMovie} />
                            ))
                    }
                </div>
                <button className="leftButton navButton" onClick={() => setIndexValue(currentIndex - 1)}>previous</button>
                <button className="rightButton navButton" onClick={() => setIndexValue(currentIndex + 1)}>next</button>
            </div>

        </div>
    );
};

export default MovieContainer;