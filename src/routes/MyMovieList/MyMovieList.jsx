import { Link } from "react-router";

function MyMovieList({ movies }) {
  return (
    <main>
      {movies.map((movie) => (
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

export default MyMovieList;
