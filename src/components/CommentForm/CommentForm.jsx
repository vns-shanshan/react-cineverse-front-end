import { createComment } from "@/services/movieService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import * as movieService from "../../services/movieService";

function CommentForm() {
  const [formData, setFormData] = useState({ commentDetails: "" });
  const { movieId, commentId } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddComment = async (commentFormData) => {
    const newComment = await createComment(movieId, commentFormData);
    navigate(`/movies/${movieId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (movieId && commentId) {
      movieService.updateComment(movieId, commentId, formData);
      navigate(`/movies/${movieId}`);
    } else {
      handleAddComment(formData);
    }

    setFormData({ commentDetails: "" });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);

      setFormData(
        movieData.comments.find((comment) => comment._id === commentId)
      );
    };

    if (movieId && commentId) fetchMovie();
  }, [movieId, commentId]);

  return (
    <>
      <Link to={`/movies/${movieId}`}>⬅️Back</Link>
      <h1>Add a Comment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentDetails">Your comment:</label>

        <textarea
          required
          name="commentDetails"
          id="commentDetails"
          value={formData.commentDetails}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CommentForm;
