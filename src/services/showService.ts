import axios from "axios";
import type { Show, ShowsByTheatre } from "../types/show";
import config from "../utils/config";

const baseUrl: string = config.BASE_URL;

const getShowsForMovie = async (movieId: number): Promise<ShowsByTheatre[]> => {
  //TODO: refactor this crap
  const showsByTheatre = new Array<ShowsByTheatre>();

  const shows = await axios.get(`${baseUrl}/movie/${movieId}/shows`);
  shows.data.map((show: Show) => {
    const theatre = showsByTheatre.find(
      (theatre) => theatre.id === show.theatre.id
    );
    if (theatre !== undefined) {
      const language = theatre.languages.find(
        (lang) => lang.language === show.language
      );

      const singleShow = {
        startTime: new Date(show.startTime).toLocaleTimeString("en-US", {
          timeStyle: "short",
        }),
        endTime: new Date(show.endTime).toLocaleTimeString("en-US", {
          timeStyle: "short",
        }),
        date: new Date(show.startTime).toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        id: show.id,
      };
      if (language !== undefined) {
        language.shows.push(singleShow);
      } else {
        theatre.languages.push({
          language: show.language,
          shows: new Array().concat(singleShow),
        });
      }
    } else {
      const newTheatre: ShowsByTheatre = {
        name: show.theatre.name,
        location: show.theatre.location,
        id: show.theatre.id,
        languages: [
          {
            language: show.language,
            shows: [
              {
                startTime: new Date(show.startTime).toLocaleTimeString(
                  "en-US",
                  { timeStyle: "short" }
                ),
                endTime: new Date(show.endTime).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                }),
                date: new Date(show.startTime).toLocaleString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                id: show.id,
              },
            ],
          },
        ],
      };
      showsByTheatre.push(newTheatre);
    }
    // return {
    //   ...show,
    //   startTime: new Date(show.startTime),
    //   endTime: new Date(show.endTime),
    // };
  });
  return showsByTheatre;
};

export default {
  getShowsForMovie,
};
