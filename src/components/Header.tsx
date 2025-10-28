import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <Link className="navigationBarButton" to="/">Home</Link>
      <Link className="navigationBarButton" to="/movies">Movies</Link>
      <Link className="navigationBarButton" to="/theatres" >Theatres</Link>
      <Link className="navigationBarButton" to="/shows" >Shows</Link>
      <Link className="navigationBarButton" to="/login">Login/Signup</Link>
    </div>
  );
};

export default Header;
