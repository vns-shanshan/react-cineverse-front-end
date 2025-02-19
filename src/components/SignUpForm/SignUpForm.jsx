import { useNavigate } from "react-router";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { signUp } from "@/services/authService";

import signUpFlyer from "@/assets/sign-up-form-flyer.jpg";

import Input from "@/components/Shared/Input/Input";
import Page from "@/components/Shared/Page/Page";

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
    <Page
      style={{
        background:
          "linear-gradient(100deg, #393B3E 0%, #919191 54%, #F5F7F8 100%)",
      }}
    >
      <div>
        {/* <p>{message}</p> */}
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col items-center w-180 "
        >
          <h1 className="py-5 text-md font-medium text-white">Sign Up</h1>

          <div className="py-6">
            <label
              htmlFor="username"
              className="block py-2 px-6 text-sm text-gray "
            >
              Username
            </label>
            <Input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-6">
            <label
              htmlFor="password"
              className="block py-2 px-6 text-sm text-gray "
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-6">
            <label
              htmlFor="confirm"
              className="block py-2 px-6 text-sm text-gray "
            >
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>

          <div className="absolute top-130 left-120 px-6">
            <button
              disabled={isFormInvalid()}
              className={`px-16 py-3 text-sm rounded-xl text-white transition ${
                isFormInvalid()
                  ? "bg-secondary cursor-not-allowed"
                  : "bg-secondary hover:bg-secondary-hover"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <img
        src={signUpFlyer}
        alt="Sign-Up-Flyer"
        className="rounded-2xl drop-shadow-[8px_6px_8px_rgba(0,0,0,0.5)] h-180"
      />
    </Page>
  );
};

export default SignUpForm;
