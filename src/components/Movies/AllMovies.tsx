import MovieSprite from "../Common/MovieSprite";
import { useState, useEffect, useRef } from "react";
import type { Movie } from "../../types/movie";
import movieService from "../../services/movieService";
import Header from "../Common/Header";
import MovieFilter from "./MovieFilter";
import MovieInformation from "../Common/MovieInformation";

const AllMovies = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovieId, setCurrentMovieId] = useState<number>(0);
  const movieDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    movieService.getAll().then((data) => {
      setAllMovies(data);
      setMovies(data)
    });
  }, []);

  const onClickingMovie = (id: number) => {
    if (id === currentMovieId) {
      movieDialogRef.current?.showModal();
      return;
    }
    setCurrentMovieId(id);
  }

  useEffect(() => {
    movieDialogRef.current?.showModal();
  }, [currentMovieId])

  const getMovie = (): Movie | null => {
    const filteredMovies: Movie[] = movies.filter(movie => movie.id === currentMovieId)
    return filteredMovies.length === 0 ? null : filteredMovies[0];
  }

  return (
    <>
      <Header />
      <div className="allMoviesContentContainer">
        <div className="movieFilterDialog">
          <MovieFilter setMovies={setMovies} allMovies={allMovies} />
        </div>
        <MovieInformation movie={getMovie()} dialogRef={movieDialogRef} comingSoon={false}/>
        <div className="moviesContainer">
          <div className={movies.length === 0 ? 'spinner' : ''}></div>
          {movies.map((movie, index) => (
            <MovieSprite key={index} movie={movie} onClickingSprite={onClickingMovie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllMovies;
