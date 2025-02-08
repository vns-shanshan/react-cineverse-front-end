import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import * as movieService from "@/services/movieService";
import { UserContext } from "@/contexts/UserContext";

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { user: currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isCreator = currentUser?._id === movie?.user._id;

  const isLoggedIn = !!currentUser;

  const handleDeleteMovie = async () => {
    const deletedMovie = await movieService.deleteMovie(movieId);

    navigate("/movies/my-movies");
  };

  const handleCommentClick = () => {
    navigate(`/movies/${movieId}/comments/create`);
  };

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
            <Link to={`/movies/${movieId}/edit`}>Edit Movie</Link>
            <button onClick={() => handleDeleteMovie()}>Delete Movie</button>
          </div>
        )}
      </section>

      <section>
        <h2>Comments</h2>

        {!movie.comments.length && <p>There are no comments.</p>}

        {isLoggedIn && (
          <button onClick={handleCommentClick}>Add a Comment</button>
        )}

        {movie.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <h4>{comment.author_id.username}</h4>

              <p>{new Date(comment.createdAt).toLocaleDateString()}</p>

              {comment.author_id._id === currentUser._id && (
                <div>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
            </header>

            <p>{comment.commentDetails}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MovieDetails;
