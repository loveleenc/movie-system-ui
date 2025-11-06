import type { Movie } from "../../types/movie";
import "../../styles/common.css";

const MovieSprite = ({ movie, onClickingSprite }: { movie: Movie; onClickingSprite: (id: number) => void }) => {
  return (
    <div className="movie-sprite" >
      <img src={movie.poster} onClick={() => onClickingSprite(movie.id ? movie.id : 0)}/>
      <span className="commonFontColor">{movie.name}</span>
    </div>
  );
};

export default MovieSprite;