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
import signInFlyer from "@/assets/sign-in-form-flyer.jpg";

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
    <Page
      style={{
        background:
          "linear-gradient(100deg, #393B3E 0%, #919191 54%, #F5F7F8 100%)",
      }}
    >
      <img
        src={signInFlyer}
        alt="Sign-In-Flyer"
        className="rounded-2xl drop-shadow-[8px_6px_8px_rgba(0,0,0,0.5)] h-180"
      />

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col items-center w-180"
        >
          <h1 className="py-5 text-md font-medium text-white">Sign In</h1>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="py-8">
            <label className="block py-2 px-6 text-sm text-gray">
              Username:
            </label>
            <Input {...register("username", { required: true })} />
            {errors.username && <span>This field is required</span>}
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className="py-6">
            <label className="block py-2 px-6 text-sm text-gray">
              Password:
            </label>
            <Input {...register("password", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>{errors.password.type.toString()}</span>}
          </div>

          <div className="absolute top-100 left-140 px-6">
            <input
              type="submit"
              value="Sign In"
              className="px-16 py-3 text-sm rounded-xl text-white bg-secondary hover:bg-secondary-hover"
            />
          </div>
        </form>
      </div>
    </Page>
  );
}
