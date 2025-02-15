// NavBar.jsx
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router";

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <nav className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-4">
                <Link
                    to="/movies"
                    className="font-cinzel font-bold text-3xl text-yellow-400 tracking-wide"
                >
                    CineVerse
                </Link>
                <div className="w-[1px] h-8 bg-white opacity-50"></div>
                <Link to="/movies" className="text-white text-lg hover:text-gray-300">
                    All Movies
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                {user ? (
                    <>
                        <Link to="/movies/my-movies" className="text-white hover:text-gray-300">
                            My Movies
                        </Link>
                        <Link to="/movies/new" className="text-white hover:text-gray-300">
                            Add a Movie
                        </Link>
                        <Link
                            to="/sign-in"
                            onClick={handleSignOut}
                            className="text-white hover:text-red-400"
                        >
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/sign-in" className="text-white hover:text-gray-300">
                            Login
                        </Link>
                        <Link
                            to="/sign-up"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;


// SignUpForm.jsx
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router";
import { signUp } from "@/services/authService";

import signUpFlyer from "@/assets/sign-up-form-flyer.jpg";
import Input from "@/components/Input/Input";

const SignUpForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConf: "",
    });

    const { username, password, passwordConf } = formData;

    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate("/movies");
        } catch (err) {
            setMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700">
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl flex">
                {/* Left Side (Form) */}
                <div className="w-1/2">
                    <h1 className="text-white text-3xl font-semibold mb-6">Sign Up</h1>
                    {message && <p className="text-red-500">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="text-gray-300 block mb-2">
                                Username:
                            </label>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                name="username"
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-300 block mb-2">
                                Password:
                            </label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                name="password"
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm" className="text-gray-300 block mb-2">
                                Confirm Password:
                            </label>
                            <Input
                                type="password"
                                id="confirm"
                                value={passwordConf}
                                name="passwordConf"
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isFormInvalid()}
                            className={`w-full text-white py-3 rounded-md transition ${isFormInvalid()
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Right Side (Image) */}
                <div className="w-1/2 flex items-center justify-center">
                    <img
                        src={signUpFlyer}
                        alt="Sign-Up-Flyer"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </main>
    );
};

export default SignUpForm;

