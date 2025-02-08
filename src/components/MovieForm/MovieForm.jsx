import { useEffect, useRef, useState } from "react";
import * as movieService from "@/services/movieService";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";

function MovieForm() {
  const { movieId } = useParams();
  // console.log(movieId);
  const [formData, setFormData] = useState({
    title: "",
    genre: "Action",
    releasedDate: "",
    runtime: "",
    details: "",
    photo: null, // type is buffer when uploading, type is string from BE
  });

  const fileUploadRef = useRef(null);

  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);

  const navigate = useNavigate();

  const handleAddMovie = async (formWithPhoto) => {
    await movieService.create(formWithPhoto);
    navigate("/movies");
  };

  const handleUpdateMovie = async () => {
    await movieService.updateMovie(movieId, formData);
    navigate(`/movies/${movieId}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (movieId) {
      handleUpdateMovie();
    } else {
      const formWithPhoto = new FormData();

      formWithPhoto.append("title", formData.title);
      formWithPhoto.append("genre", formData.genre);
      formWithPhoto.append("releasedDate", formData.releasedDate);
      formWithPhoto.append("runtime", formData.runtime);
      formWithPhoto.append("details", formData.details);
      formWithPhoto.append("photo", formData.photo);

      handleAddMovie(formWithPhoto);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to Base64
    reader.onload = () => {
      setPhotoPreviewUrl(reader.result); // Store Base64 in state
      // console.log("Base64 String: ", reader.result); // Debugging
    };
    reader.onerror = (error) => {
      console.error("Error converting file:", error);
    };
  };

  const handleFileInput = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));

    // convert binary to base64 str, and save to formdata.photo
    convertToBase64(e.target.files[0]);
  };

  const openFilePicker = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);

      movieData.releasedDate = dayjs(movieData.releasedDate).format(
        "YYYY-MM-DD"
      );
      // console.log(movieData);
      setFormData(movieData);
      setPhotoPreviewUrl(movieData.photo);
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  return (
    <main>
      <h1>{movieId ? "Edit Movie" : "New Movie"}</h1>

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
        <input
          ref={fileUploadRef}
          type="file"
          id="movie-pic"
          onChange={handleFileInput}
          hidden
        />

        {photoPreviewUrl ? (
          <img width={200} src={photoPreviewUrl} onClick={openFilePicker} />
        ) : (
          <button type="button" onClick={openFilePicker}>
            placeholder
          </button>
        )}

        <button type="submit">{movieId ? "Update Movie" : "Add Movie"}</button>
      </form>
    </main>
  );
}

export default MovieForm;
