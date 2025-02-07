import { Link } from "react-router";
import { useState, useEffect } from "react";
import * as movieService from "@/services/movieService";

function AllMovieList({ userId = null }) {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      let movies = [];
      if (userId) {
        // getting movies for a user
        movies = await movieService.getMyMovies();
      } else {
        // no userId, getting all movies
        movies = await movieService.index();
      }

      setAllMovies(movies);
    };

    fetchAllMovies();
  }, [userId]);

  return (
    <main>
      {allMovies.map((movie) => (
        <Link key={movie._id} to={`/movies/${movie._id}`}>
          <article>
            <header>
              <img src={movie.photo} alt="movie photo" />
            </header>

            <p>{movie.title}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}

export default AllMovieList;
