import type { Movie } from "../../types/movie";
import "../../styles/common.css";

const MovieSprite = ({ movie, onClickingSprite }: { movie: Movie; onClickingSprite: (id: number) => void }) => {
  return (
    <div className="movie-sprite" onClick={() => onClickingSprite(movie.id)}>
      <img src={movie.poster}/>
      <span>{movie.name}</span>
    </div>
  );
};

export default MovieSprite;