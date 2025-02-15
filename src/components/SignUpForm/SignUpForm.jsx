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
        <h1>Sign Up</h1>
        {/* <p>{message}</p> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <Input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <Input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
          </div>
        </form>
      </div>

      <img src={signUpFlyer} alt="Sign-Up-Flyer" />
    </Page>
  );
};

export default SignUpForm;
