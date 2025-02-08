import { createComment } from "@/services/movieService";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function CommentForm() {
  const [formData, setFormData] = useState({ commentDetails: "" });
  const { movieId } = useParams();

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
    handleAddComment(formData);
    setFormData({ commentDetails: "" });
  };

  return (
    <>
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
