import { Genre, Language } from "../../types/movie";
import Togglable from "../Common/Togglable";
import "../../styles/movies.css";
import type { Movie, movieFilters } from "../../types/movie";
import { useState, type FormEvent, type SetStateAction } from "react";
import movieService from "../../services/movieService";

const FilterDialog = ({
  setMovies,
  allMovies
}: {
  setMovies: React.Dispatch<SetStateAction<Movie[]>>;
  allMovies: Movie[]
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre[]>([]);

  const onLanguageSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;
    const languages = new Array();
    for (let i = 0; i < selectedOptions.length; i++) {
      languages.push(selectedOptions.item(i)?.value);
    }
    setSelectedLanguages(languages);
  };

  const onGenreSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;
    const genre = new Array();
    for (let i = 0; i < selectedOptions.length; i++) {
      genre.push(selectedOptions.item(i)?.value);
    }
    setSelectedGenre(genre);
  };

  const filterMovies = (event: FormEvent) => {
    event.preventDefault();

    const movieFilters: movieFilters = {
      genre: selectedGenre,
      language: selectedLanguages,
      releasedOnOrAfter: (event.target as HTMLFormElement).releaseOnOrAfter
        .value,
    };
    movieService
      .getMoviesByFilter(movieFilters)
      .then((data) => setMovies(data));
  };

  const clearFilters = () => {
    (document.getElementById("filterForm") as HTMLFormElement)?.reset();
    setMovies(allMovies);
    setSelectedLanguages([]);
    setSelectedGenre([]);
  }

  return (
    <form id="filterForm" onSubmit={filterMovies}>
      <button type="reset" onClick={clearFilters} className="resetFilterMoviesButton">Reset filters</button>
      <select name="languageFilter" onChange={onLanguageSelection} multiple>
        {Object.values(Language).map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
      <select name="genreFilter" onChange={onGenreSelection} multiple>
        {Object.values(Genre).map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <input type="date" name="releaseOnOrAfter" />
      <button type="submit">Filter Movies</button>
    </form>
  );
};

const MovieFilter = ({
  setMovies,
  allMovies
}: {
  setMovies: React.Dispatch<SetStateAction<Movie[]>>;
  allMovies: Movie[]
}) => {
  return (
    <Togglable
      buttonClassName="filterMoviesButton"
      buttonText="Filter"
      displayElementContainerClassName="filterMoviesDialogContainer"
    >
      <FilterDialog setMovies={setMovies} allMovies={allMovies}/>
    </Togglable>
  );
};

export default MovieFilter;
