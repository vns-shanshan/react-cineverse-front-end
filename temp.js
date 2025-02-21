<main className="container max-w-6xl mx-auto pt-36 px-8">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
        {/* Left: Movie Poster */}
        <div className="w-full">
            <img src={movie.photo} alt="Movie Poster" className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Right: Movie Details + Comments */}
        <div className="space-y-8">
            {/* Movie Information */}
            <div className="space-y-4">
                <h1 className="text-3xl font-semibold">{movie.title}</h1>

                <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col">
                        <p className="uppercase text-gray-400 text-sm">Genre</p>
                        <span className="text-white text-lg font-semibold">{movie.genre}</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="uppercase text-gray-400 text-sm">Year</p>
                        <span className="text-white text-lg font-semibold">
                            {new Date(movie.releasedDate).toLocaleDateString("en-US")}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <p className="uppercase text-gray-400 text-sm">Runtime</p>
                        <span className="text-white text-lg font-semibold">{movie.runtime} mins</span>
                    </div>
                </div>

                <p className="text-gray-300 leading-relaxed">{movie.details}</p>

                {isCreator && (
                    <div className="flex gap-4 mt-6">
                        <Link
                            to={`/movies/${movieId}/edit`}
                            className="text-yellow-400 px-6 py-2 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
                        >
                            Edit Movie
                        </Link>
                        <button
                            onClick={handleDeleteMovie}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Delete Movie
                        </button>
                    </div>
                )}
            </div>

            {/* Comments Section */}
            <section className="mt-12">
                <h2 className="text-2xl font-semibold">Comments</h2>

                {isLoggedIn && (
                    <button
                        onClick={handleCommentClick}
                        className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 mt-4"
                    >
                        Add a Comment
                    </button>
                )}

                {!movie.comments.length && <p className="text-gray-400 mt-4">There are no comments.</p>}

                {movie.comments.map((comment) => (
                    <article key={comment._id} className="bg-gray-800 p-4 rounded-lg mt-4">
                        <header className="flex justify-between items-center text-gray-300">
                            <div>
                                <h4 className="font-semibold text-white">{comment.author_id.username}</h4>
                                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>

                            {currentUser && comment.author_id._id === currentUser._id && (
                                <div className="flex gap-2">
                                    <Link to={`/movies/${movieId}/comments/${comment._id}/edit`}>
                                        <img src={editBtn} alt="Edit" className="w-5 h-5" />
                                    </Link>
                                    <button onClick={() => handleDeleteComment(comment._id)}>
                                        <img src={deleteBtn} alt="Delete" className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </header>

                        <p className="text-gray-200 mt-2">{comment.commentDetails}</p>
                    </article>
                ))}
            </section>
        </div>
    </div>
</main>
