import { Link } from "react-router";
import { useState, useEffect } from "react";
import * as movieService from "@/services/movieService";
import MovieCard from "@/features/MovieCard/MovieCard";
import Page from "@/components/Page/Page";

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
    <div className="bg-black min-h-screen text-white">
      <Page classes="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8 max-w-7xl mx-auto m-16 ">
        {!allMovies && <h1>There are no movies.</h1>}
        {allMovies.map((movie) => (
          <Link key={movie._id} to={`/movies/${movie._id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </Page>
    </div>
  );
}

export default AllMovieList;
