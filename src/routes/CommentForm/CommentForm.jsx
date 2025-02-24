import { createComment } from "@/services/movieService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import * as movieService from "../../services/movieService";
import Page from "@/components/Page/Page";

import backBtn from "@/assets/back-btn.png";
import Button from "@/components/Button/Button";

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
    <div className="bg-black min-h-screen text-white">
      <Page classes="flex-col mt-10">
        <Link to={`/movies/${movieId}`}>
          <img
            src={backBtn}
            alt="Back Button"
            className="absolute left-20 top-30"
          />
        </Link>

        <h1 className="text-md font-semibold text-center mb-6">
          {!commentId ? "Add a" : "Edit"} Comment
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-12 mt-8">
          <div className="min-w-xl">
            <div>
              <label
                htmlFor="commentDetails"
                className="block text-sm font-medium text-gray mb-2 ml-2"
              >
                Your comment
              </label>

              <textarea
                required
                name="commentDetails"
                id="commentDetails"
                value={formData.commentDetails}
                onChange={handleChange}
                maxLength={200}
                rows={4}
                className="w-150 aspect-5/2 bg-white text-black p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button color="secondary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Page>
    </div>
  );
}

export default CommentForm;
