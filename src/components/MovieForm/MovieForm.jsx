import { useState } from "react";
import * as movieService from "@/services/movieService";
import { useNavigate } from "react-router";

function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "Action",
    releasedDate: "",
    runtime: "",
    details: "",
  });

  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const handleAddMovie = async (formWithPhoto) => {
    await movieService.create(formWithPhoto);
    navigate("/movies");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formWithPhoto = new FormData();

    formWithPhoto.append("title", formData.title);
    formWithPhoto.append("genre", formData.genre);
    formWithPhoto.append("releasedDate", formData.releasedDate);
    formWithPhoto.append("runtime", formData.runtime);
    formWithPhoto.append("details", formData.details);
    formWithPhoto.append("photo", photo);

    handleAddMovie(formWithPhoto);
  };

  const handleFileInput = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title *</label>
        <input
          required
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="genre">Genre *</label>
        <select
          required
          name="genre"
          id="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
          <option value="Documentary">Documentary</option>
        </select>

        <label htmlFor="releasedDate">Released Date *</label>
        <input
          required
          type="date"
          name="releasedDate"
          id="releasedDate"
          value={formData.releasedDate}
          onChange={handleChange}
        />

        <label htmlFor="runtime">Runtime (mins)</label>
        <input
          type="number"
          name="runtime"
          id="runtime"
          value={formData.runtime}
          onChange={handleChange}
        />

        <label htmlFor="details">Details *</label>
        <textarea
          required
          name="details"
          id="details"
          value={formData.details}
          onChange={handleChange}
          maxLength={200}
          rows={4}
          placeholder="Enter movie details (max 200 characters)"
        ></textarea>

        <label htmlFor="movie-pic">Movie Pic:</label>
        <input type="file" id="movie-pic" onChange={handleFileInput} />

        <button type="submit">Add Movie</button>
      </form>
    </main>
  );
}

export default MovieForm;
