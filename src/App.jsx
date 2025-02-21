import { useContext } from "react";
import { Routes, Route } from "react-router";

import "react";
import { UserContext } from "@/contexts/UserContext";
import AllMovieList from "@/routes/AllMovieList/AllMovieList";
import MovieDetails from "@/routes/MovieDetails/MovieDetails";
import MovieForm from "@/routes/MovieForm/MovieForm";
import NavBar from "@/routes/NavBar/NavBar";
import SignInForm from "@/routes/SignInForm/SignInForm";
import SignUpForm from "@/routes/SignUpForm/SignUpForm";
import CommentForm from "@/routes/CommentForm/CommentForm";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/movies" element={<AllMovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />

        {user ? (
          <>
            <Route
              path="/movies/my-movies"
              element={<AllMovieList userId={user._id} />}
            />

            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/movies/:movieId/edit" element={<MovieForm />} />

            <Route
              path="/movies/:movieId/comments/create"
              element={<CommentForm />}
            />
            <Route
              path="/movies/:movieId/comments/:commentId/edit"
              element={<CommentForm />}
            />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />

            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
