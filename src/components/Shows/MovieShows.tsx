import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  type NavigateFunction,
} from "react-router-dom";
import showService from "../../services/showService";
import type { ShowsByTheatre, ShowInformation } from "../../types/show";
import Header from "../Common/Header";

const ShowWidget = ({
  show,
  ticketNavFunction,
}: {
  show: ShowInformation;
  ticketNavFunction: NavigateFunction;
}) => {
  const navigateToTickets = (id: string) => {
    ticketNavFunction(`/show/${id}/tickets`);
  };

  return (
    <>
      <div>
        <div style={{display: 'inline-block', paddingRight: '10px'}}>
          <span>{show.date}, </span>
          <span>
            {show.startTime} - {show.endTime}
          </span>
        </div>
        
        <button onClick={() => navigateToTickets(show.id)}>Book seats</button>
      </div>
    </>
  );
};

const TheatreWidget = ({
  theatre,
  ticketNavFunction,
}: {
  theatre: ShowsByTheatre;
  ticketNavFunction: NavigateFunction;
}) => {
  return (
    <div className="commonFontColor">
      <h2>{theatre.location}</h2>
      <h3>{theatre.name}</h3>
      {theatre.languages.map((language) => (
        <div>
          <div>{language.language}</div>
          {language.shows.map((show, index) => (
            <ShowWidget key={`show${index}`} show={show} ticketNavFunction={ticketNavFunction} />
          ))}
        </div>
      ))}
    </div>
  );
};

const MovieShows = () => {
  const [shows, setShows] = useState<ShowsByTheatre[]>([]);
  const movieId = useParams().id;
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    showService.getShowsForMovie(Number(movieId)).then((s) => setShows(s));
  }, []);

  return (
    <>
      <Header />
      <h1 className="commonFontColor">Showtimes</h1>

      {shows.map((show, index) => (
        <TheatreWidget
          key={`theatre${index}`}
          theatre={show}
          ticketNavFunction={navigate}
        />
      ))}
    </>
  );
};

export default MovieShows;
