import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import * as movieService from "@/services/movieService";
import { UserContext } from "@/contexts/UserContext";

import backBtn from "@/assets/back-btn.png";
import editBtn from "@/assets/edit-comment-btn.png";
import deleteBtn from "@/assets/delete-comment-btn.png";
import Button from "@/components/Shared/Button/Button";

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

        <section className="mt-8 flex flex-col md:flex-row gap-16 items-start">
          <img
            src={movie.photo}
            alt="movie photo"
            className="w-full h-130 md:w-1/3 rounded-2xl"
          />

          <div className="flex-1 space-y-4 ">
            <h1 className="text-lg font-semibold pb-4">{movie.title}</h1>

            <div className="flex flex-wrap gap-12 text-sm justify-between pb-4">
              <div className="flex flex-col">
                <span className="text-white font-semibold">{movie.genre}</span>
                <p className="text-gray text-tiny pt-2">Genre</p>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">
                  {new Date(movie.releasedDate).toLocaleDateString("en-US")}
                </span>
                <p className="text-gray text-tiny pt-2">Year</p>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">
                  {movie.runtime} mins
                </span>
                <p className="text-gray text-tiny pt-2">Runtime</p>
              </div>
            </div>

            <p className="text-gray leading-relaxed pb-4">{movie.details}</p>

            {isCreator && (
              <div className="flex gap-8 mt-6">
                <Link
                  to={`/movies/${movieId}/edit`}
                  className=" text-primary px-8 py-2 border-1 rounded-lg hover:bg-primary hover:text-white hover:border-1 transition duration-300"
                >
                  Edit Movie
                </Link>

                <Button
                  color="accent"
                  variant="outlined"
                  className="transition duration-300"
                  onClick={() => handleDeleteMovie()}
                >
                  Delete Movie
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm-plus font-semibold">Comments</h2>

          {isLoggedIn && (
            <Button
              onClick={handleCommentClick}
              color="secondary"
              variant="outlined"
              className="px-16 py-3 transition duration-300 mt-4 text-sm"
            >
              Add a Comment
            </Button>
          )}

          {!movie.comments.length && (
            <p className="text-gray mt-4">There are no comments.</p>
          )}

          {movie.comments.map((comment) => (
            <article key={comment._id} className="p-4 mt-4">
              <header className="flex justify-between items-center text-gray">
                <div>
                  <h4 className="font-semibold text-sm text-white">
                    {comment.author_id.username}
                  </h4>
                  <p className="text-tiny text-gray font-light pt-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {currentUser && comment.author_id._id === currentUser._id && (
                  <div className="flex gap-4">
                    <Link
                      to={`/movies/${movieId}/comments/${comment._id}/edit`}
                    >
                      <img src={editBtn} alt="edit button" />
                    </Link>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="cursor-pointer"
                    >
                      <img src={deleteBtn} alt="delete button" />
                    </button>
                  </div>
                )}
              </header>

              <p className="text-gray mt-6">{comment.commentDetails}</p>

              <hr className="text-white mt-6" />
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default MovieDetails;
