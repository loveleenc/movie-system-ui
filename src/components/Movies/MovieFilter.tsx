
import Togglable from "../Common/Togglable";
import type { Movie } from "../../types/movie";
import {  type SetStateAction } from "react";
import FilterDialog from "./FilterDialog";

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