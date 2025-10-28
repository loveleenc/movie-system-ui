import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import type { Movie } from "../../types/movie";
import "../../styles/home.css";
import MovieSprite from "../Common/MovieSprite";

const MovieContainer = ({
  movies,
  title,
}: {
  movies: Movie[];
  title: string;
}) => {
  if (movies.length === 0) {
    return (
      <>
        <h2>{title}</h2>
        <div className="movie-sprite-container">
          <div>No movies available at the moment. Please check later!</div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>{title}</h2>
      <div className="movie-sprite-container">
        <button className="leftButton">previous</button>
        {movies.map((movie, index) => (
          <MovieSprite key={index} movie={movie} />
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
