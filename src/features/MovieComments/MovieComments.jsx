import Button from "@/components/Button/Button";
import { Link } from "react-router";

import editBtn from "@/assets/edit-comment-btn.png";
import deleteBtn from "@/assets/delete-comment-btn.png";

function MovieComments({
  isLoggedIn,
  handleCommentClick,
  movie,
  currentUser,
  movieId,
  handleDeleteComment,
}) {
  return (
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
                <Link to={`/movies/${movieId}/comments/${comment._id}/edit`}>
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
  );
}

export default MovieComments;
