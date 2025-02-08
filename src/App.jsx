import { useContext } from "react";
import { Routes, Route } from "react-router";

import "react";
import { UserContext } from "@/contexts/UserContext";
import AllMovieList from "@/components/AllMovieList/AllMovieList";
import MovieDetails from "@/components/MovieDetails/MovieDetails";
import MovieForm from "@/components/MovieForm/MovieForm";
import NavBar from "@/components/NavBar/NavBar";
import SignInForm from "@/components/SignInForm/SignInForm";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import CommentForm from "@/components/CommentForm/CommentForm";

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
