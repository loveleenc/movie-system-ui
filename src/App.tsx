import Home from "./components/Home/Home";
import {  HashRouter, Route, Routes } from "react-router-dom";
import AllMovies from "./components/Movies/AllMovies";
import MovieShows from "./components/Shows/MovieShows";
import LoginPage from "./components/LoginSignup/LoginPage";
import Tickets from "./components/Tickets/Tickets";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/LoginSignup/SignUp";
import Activate from "./components/LoginSignup/Activate";

const App = () => {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movie/:id/shows" element={<MovieShows />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/show/:id/tickets" element={<Tickets />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/activate/:id" element={<Activate />} />
      </Routes>
    </HashRouter>
    </>
  );
};

export default App;
