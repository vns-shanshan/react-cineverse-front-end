import { useEffect, useRef, useState } from "react";
import * as movieService from "@/services/movieService";
import { Link, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Page from "@/components/Page/Page";

import backBtn from "@/assets/back-btn.png";
import uploadImg from "@/assets/upload-btn.png";

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

  const handleUpdateMovie = async (formWithPhoto) => {
    await movieService.updateMovie(movieId, formWithPhoto);
    navigate(`/movies/${movieId}`);
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
    if (formData.runtime) {
      formWithPhoto.append("runtime", formData.runtime);
    }
    formWithPhoto.append("details", formData.details);
    formWithPhoto.append("photo", formData.photo);

    if (movieId) {
      handleUpdateMovie(formWithPhoto);
    } else {
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
    <div className="bg-black min-h-screen text-white">
      <Page classes="flex-col mt-10">
        {movieId && (
          <Link to={`/movies/${movieId}`}>
            <img
              src={backBtn}
              alt="Back Button"
              className="absolute left-20 top-30"
            />
          </Link>
        )}

        <h1 className="text-md font-semibold text-center mb-6">
          {movieId ? "Edit Movie" : "New Movie"}
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-12">
          <div className="flex justify-center">
            <div
              className="w-80 aspect-2/3 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray cursor-pointer"
              onClick={openFilePicker}
            >
              {photoPreviewUrl ? (
                <img
                  src={photoPreviewUrl}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray flex flex-col items-center gap-4">
                  <img
                    src={uploadImg}
                    alt="Upload Button"
                    className="w-8 h-8"
                  />
                  Click to upload your image
                </span>
              )}
            </div>
            <input
              ref={fileUploadRef}
              type="file"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          <div className="min-w-xl">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray mb-2 ml-2"
              >
                Title <span className="text-accent">*</span>
              </label>
              <Input
                required
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
            </div>

            <div className="flex gap-6  mt-4">
              <div className="flex-1">
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray ml-2 mb-2"
                >
                  Genre <span className="text-accent">*</span>
                </label>
                <select
                  required
                  name="genre"
                  id="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full bg-white text-black p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray"
                >
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Horror">Horror</option>
                  <option value="Documentary">Documentary</option>
                </select>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="releasedDate"
                  className="ml-2 mb-2 block text-sm font-medium text-gray"
                >
                  Released Date <span className="text-accent">*</span>
                </label>
                <Input
                  required
                  type="date"
                  name="releasedDate"
                  id="releasedDate"
                  value={formData.releasedDate}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="runtime"
                className="ml-2 mb-2 block text-sm font-medium text-gray"
              >
                Runtime (mins)
              </label>
              <Input
                type="number"
                name="runtime"
                id="runtime"
                value={formData.runtime}
                onChange={handleChange}
                fullWidth
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="details"
                className="ml-2 mb-2 block text-sm font-medium text-gray"
              >
                Details <span className="text-accent">*</span>
              </label>
              <textarea
                required
                name="details"
                id="details"
                value={formData.details}
                onChange={handleChange}
                maxLength={200}
                rows={4}
                placeholder="Enter movie details (max 200 characters)"
                className="w-full bg-white text-black p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray"
              ></textarea>
            </div>

            <div className="mt-6 flex justify-end">
              <Button color="secondary" type="submit">
                {movieId ? "Update Movie" : "Add Movie"}
              </Button>
            </div>
          </div>
        </form>
      </Page>
    </div>
  );
}

export default MovieForm;
