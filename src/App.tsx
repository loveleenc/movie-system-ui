import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllMovies from "./components/Movies/AllMovies";
import MovieShows from "./components/Shows/MovieShows";
import LoginPage from "./components/Login/LoginPage";
import Tickets from "./components/Tickets/Tickets";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movie/:id/shows" element={<MovieShows />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/show/:id/tickets" element={<Tickets />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
