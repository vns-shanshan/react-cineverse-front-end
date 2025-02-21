import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import * as movieService from "@/services/movieService";
import { UserContext } from "@/contexts/UserContext";

import backBtn from "@/assets/back-btn.png";
import editBtn from "@/assets/edit-comment-btn.png";
import deleteBtn from "@/assets/delete-comment-btn.png";
import Button from "@/components/Button/Button";
import MovieInfo from "@/features/MovieInfo/MovieInfo";
import MovieComments from "@/features/MovieComments/MovieComments";

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

  const handleDeleteComment = async (commentId) => {
    const deletedComment = await movieService.deleteComment(movieId, commentId);

    setMovie({
      ...movie,
      comments: movie.comments.filter((comment) => comment._id !== commentId),
    });
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
    <div className="bg-black min-h-screen text-white">
      <main className="container max-w-5xl mx-auto pt-36 ">
        <Link to="/movies" className="absolute left-20 top-30">
          <img src={backBtn} alt="back button" />
        </Link>

        <MovieInfo
          movie={movie}
          movieId={movieId}
          handleDeleteMovie={handleDeleteMovie}
          isCreator={isCreator}
        />

        <MovieComments
          movie={movie}
          movieId={movieId}
          isLoggedIn={isLoggedIn}
          handleCommentClick={handleCommentClick}
          currentUser={currentUser}
          handleDeleteComment={handleDeleteComment}
        />
      </main>
    </div>
  );
}

export default MovieDetails;
