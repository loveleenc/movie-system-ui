import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllMovies from "./components/Movies/AllMovies";
import MoviePage from "./components/MoviePage/MoviePage";
import MovieShows from "./components/Shows/MovieShows";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/movie/:id/shows" element={<MovieShows />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
