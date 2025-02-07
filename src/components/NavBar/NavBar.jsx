import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>
            <div>
              <Link to="/movies">All Movies</Link>
            </div>
          </li>

          <li>
            <div>
              <Link to="/movies/my-movies">My Movies</Link>
            </div>
          </li>

          <li>
            <div>
              <Link to="/movies/new">Add a Movie</Link>
            </div>
          </li>

          <li>
            <div>
              <Link to="/sign-in" onClick={handleSignOut}>
                Sign Out
              </Link>
            </div>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <div>
              <Link to="/movies">All Movies</Link>
            </div>
          </li>

          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>

          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
