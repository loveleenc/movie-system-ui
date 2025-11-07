import { useEffect, useState } from "react";
import { Link } from "react-router";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    userService.userIsLoggedIn()
      .then(_data => {
          setUserLoggedIn(true);
      })
      .catch(_error => setUserLoggedIn(false));
  }, []);

  const onLogout = () => {
    userService.logout().then(_data => {
      navigate("/")
    })
  }

  if(!userLoggedIn){
    return (<><Link className="navigationBarButton" to="/user/login">Login/Signup</Link>
    </>)
  }
  return (<>
    <Link className="navigationBarButton" to="/user/cart">Cart</Link>
    <Link className="navigationBarButton" to="/user/profile">Profile</Link>
    <button className="navigationBarButton" onClick={onLogout}>Logout</button>
    </>)
}


const Header = () => {
  return (
    <div className="headerContainer">
      <Link to="/" className="navigationBarButton">Home</Link>
      <Link className="navigationBarButton" to="/movies">Movies</Link>
      {/* <Link className="navigationBarButton" to="/theatres" >Theatres</Link> */}
      {/* <Link className="navigationBarButton" to="/shows" >Shows</Link> */}
      <ProfileHeader />
    </div>
  );
};

export default Header;
