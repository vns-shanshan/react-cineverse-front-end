import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";

import * as movieService from "@/services/movieService";
import { UserContext } from "@/contexts/UserContext";

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { user: currentUser } = useContext(UserContext);

  const isCreator = currentUser?._id === movie?.user._id;

  const isLoggedIn = !!currentUser;

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);

      setMovie(movieData);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <img src={movie.photo} alt="movie photo" />

        <h1>{movie.title}</h1>
        <h3>Genre {movie.genre}</h3>
        <h3>Year {movie.releasedDate}</h3>
        <h3>Runtime {movie.runtime}</h3>

        <p>{movie.details}</p>

        {isCreator && (
          <div>
            <button>Edit Movie</button>
            <button>Delete Movie</button>
          </div>
        )}
      </section>

      <section>
        <h2>Comments</h2>

        {!movie.comments.length && <p>There are no comments.</p>}

        {isLoggedIn && <button>Add a Comment</button>}

        {movie.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <h4>{comment.author_id.username}</h4>

              <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
            </header>

            <p>{comment.commentDetails}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MovieDetails;
