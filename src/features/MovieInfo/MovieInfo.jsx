import Button from "@/components/Button/Button";
import { Link } from "react-router";

function MovieInfo({ movie, isCreator, movieId, handleDeleteMovie }) {
  return (
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
  );
}

export default MovieInfo;
