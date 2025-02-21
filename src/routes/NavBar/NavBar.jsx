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
    <nav className="flex items-center justify-between bg-transparent absolute">
      <ul className="flex p-4">
        <li className="px-4">
          <div>
            <Link
              to="/movies"
              className="font-cinzel font-[700] text-lg text-primary"
            >
              CineVerse
            </Link>
          </div>
        </li>

        <li className="px-4 text-white flex items-center ">
          <div className="bg-white h-10 w-1"></div>
        </li>

        <li className="px-4 text-white flex items-center text-sm font-inter font-light">
          <div>
            <Link to="/movies">All Movies</Link>
          </div>
        </li>

        {user && (
          <>
            <li className="px-4 text-white flex items-center text-sm font-inter font-light">
              <div>
                <Link to="/movies/my-movies">My Movies</Link>
              </div>
            </li>

            <li className="px-4 text-white flex items-center text-sm font-inter font-light">
              <div>
                <Link to="/movies/new">Add a Movie</Link>
              </div>
            </li>

            <li className="px-4 text-white flex items-center text-sm font-inter font-light">
              <div>
                <Link to="/sign-in" onClick={handleSignOut}>
                  Sign Out
                </Link>
              </div>
            </li>
          </>
        )}

        {!user && (
          <>
            <li className="px-4 text-white flex items-center text-sm font-inter font-light">
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li className="px-4 text-white flex items-center text-sm font-inter font-light">
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
