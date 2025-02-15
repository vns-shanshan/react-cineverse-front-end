// import { useState, useContext } from "react";
// import { useNavigate } from "react-router";

// import { signIn } from "@/services/authService";
// import { UserContext } from "@/contexts/UserContext";

// const SignInForm = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (evt) => {
//     setMessage("");
//     setFormData({ ...formData, [evt.target.name]: evt.target.value });
//   };

//   const handleSubmit = async (evt) => {
//     evt.preventDefault();
//     try {
//       const signedInUser = await signIn(formData);
//       setUser(signedInUser);
//       navigate("/movies");
//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <main>
//       <h1>Sign In</h1>
//       <p>{message}</p>
//       <form autoComplete="off" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Username:</label>
//           <input
//             type="text"
//             autoComplete="off"
//             id="username"
//             value={formData.username}
//             name="username"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             autoComplete="off"
//             id="password"
//             value={formData.password}
//             name="password"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <button>Sign In</button>
//           <button onClick={() => navigate("/")}>Cancel</button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default SignInForm;

import { useForm } from "react-hook-form";

import { useContext } from "react";

import { UserContext } from "@/contexts/UserContext";

import { signIn } from "@/services/authService";
import { useNavigate } from "react-router";
import Input from "@/components/Shared/Input/Input";
import Page from "@/components/Shared/Page/Page";

export default function SignInForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const signedInUser = await signIn(data);
    setUser(signedInUser);
    navigate("/movies");
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Page>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <label>Username:</label>
          <Input {...register("username", { required: true })} />
          {errors.username && <span>This field is required</span>}
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div>
          <label>Password:</label>
          <Input {...register("password", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>{errors.password.type.toString()}</span>}
        </div>

        <div>
          <input type="submit" value="Sign In" />
        </div>
      </form>
    </Page>
  );
}
