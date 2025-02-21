function MovieCard({ movie }) {
  return (
    <article className="relative overflow-hidden rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
      <div className="w-full h-100">
        <img
          src={movie.photo}
          alt="movie photo"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-3 text-white text-center rounded-b-2xl">
        <p className="text-sm font-semibold">{movie.title}</p>
      </div>
    </article>
  );
}

export default MovieCard;
