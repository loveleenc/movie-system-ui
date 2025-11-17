import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import type { Movie } from "../../types/movie";
import "../../styles/home.css";
import MovieContainer from "./MovieContainer";

const NowShowing = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movieService.getNowShowing()
      .then((data) => setMovies(data))
      // .catch((_error) => {
      //   const noMoviesAvailable:Movie = {
      //     name: 'No Movies available',
      //     id: 0,
      //   }
      //   setMovies([noMoviesAvailable])
      // });
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
    movieService.getUpcoming().
    then((data) => setMovies(data))
    // .catch((_error) => {
    //     const noMoviesAvailable:Movie = {
    //       name: 'No Movies available',
    //       id: 0,
    //     }
    //     setMovies([noMoviesAvailable])
    //   });
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
