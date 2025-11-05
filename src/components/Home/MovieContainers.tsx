import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import type { Movie } from "../../types/movie";
import "../../styles/home.css";
import MovieSprite from "../Common/MovieSprite";
import MovieInformation from "../Common/MovieInformation";
import { useRef } from "react";

const MovieContainer = ({
  movies,
  title,
}: {
  movies: Movie[];
  title: string;
}) => {
  const [currentMovieId, setCurrentMovieId] = useState<number>(0);
  const movieDialogRef = useRef<HTMLDialogElement | null>(null);


  const getMovie = ():Movie | null => {
    const filteredMovies:Movie[] = movies.filter(movie => movie.id === currentMovieId)
    return filteredMovies.length === 0 ? null : filteredMovies[0];
  }

  const onClickingMovie = (id:number) => {
    setCurrentMovieId(id);
  }

  useEffect(() => {
    movieDialogRef.current?.showModal();
  }, [currentMovieId])

  if (movies.length === 0) {
    return (
      <>
        <h2 className="commonFontColor">{title}</h2>
        <div className="movie-sprite-container">
          <div>No movies available at the moment. Please check later!</div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="commonFontColor">{title}</h2>
      <div className="movie-sprite-container">
        <MovieInformation movie={getMovie()} dialogRef={movieDialogRef} />
        <button className="leftButton">previous</button>
        {movies.map((movie, index) => (
          <MovieSprite key={index} movie={movie} onClickingSprite={onClickingMovie}/>
        ))}
        <button className="rightButton">next</button>
      </div>
    </>
  );
};

const NowShowing = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movieService.getNowShowing().then((data) => setMovies(data));
  }, []);

  return (
    <>
      <MovieContainer movies={movies} title="Now Showing" />
    </>
  );
};

const ComingSoon = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    movieService.getUpcoming().then((data) => setMovies(data));
  }, []);
  return (
    <>
      <MovieContainer movies={movies} title="Coming Soon" />
    </>
  );
};

export default {
  NowShowing,
  ComingSoon,
};
