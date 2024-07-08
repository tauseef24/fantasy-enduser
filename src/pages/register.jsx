import React from "react";
import versus_img from "../assets/test.jpg";
import logo from "../assets/11.jpg";
import imgfront from "../assets/all.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { registerUser } from "../services/authentication";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const Register = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      let errorMsg = error?.response?.data?.msg?.split(" ")[0];
      let msgToDisplay = "Email Already Registered!";
      if (errorMsg === "E11000") {
        console.log(msgToDisplay);
        alert(msgToDisplay);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen w-full overflow-hidden">
      <section className="bg-gradient-to-bl from-violet-50 to-violet-400 text-violet-950 flex-1">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6 py-8 mx-auto overflow-y-auto md:min-h-screen md:py-0">
          <a
            href="/landing"
            className="flex items-center mb-6 text-3xl md:text-6xl text-violet-950 font-caveat font-bold gap-x-6"
          >
            <img
              className="w-20 h-20 mr-2"
              src="https://www.legitgambling.com/images/icons/dfs.svg"
              alt="logo"
            />
            Fantasy 11
          </a>
          <div className="w-full max-w-md bg-gradient-to-tr from-blue-200 to-purple-200 text-huckleberry-700 font-bold py-2 px-4 border border-violet-950 rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-center text-xl md:text-4xl font-bold leading-tight tracking-tight text-violet-950">
                Register Now !
              </h1>
              <form
                className="space-y-2 md:space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-violet-950"
                  >
                    Enter your Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    className="bg-violet-50 border border-violet-300 text-violet-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-violet-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required=""
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-violet-950"
                  >
                    Enter your email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    className="bg-violet-50 border border-violet-300 text-violet-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-violet-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-violet-950"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="bg-violet-50 border border-violet-300 text-violet-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-violet-400 focus:ring-blue-500 focus:border-blue-500"
                    required=""
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                  <label
                    htmlFor="confirmPass"
                    className="block mb-2 text-sm font-medium text-violet-950"
                  >
                    Confirm password
                  </label>
                  <input
                    {...register("confirmPass")}
                    type="password"
                    name="confirmPass"
                    placeholder="••••••••"
                    className="bg-violet-50 border border-violet-300 text-violet-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-violet-400 focus:ring-blue-500 focus:border-blue-500"
                    required=""
                  />
                  {errors.confirmPass && <p>{errors.confirmPass.message}</p>}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-violet-300 rounded bg-violet-50 focus:ring-3 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-violet-500"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-violet-600 hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-tr from-pink-500 to-orange-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 w-full md:w-auto md:px-10 md:py-3.5 focus:ring-4 focus:outline-none focus:ring-primary-300"
                  >
                    Create an account
                  </button>
                </div>
                <p className="text-sm font-light text-violet-500">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-violet-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="hidden md:block w-full md:w-[50%] lg:flex">
        <img
          src={imgfront}
          alt="Versus"
          className="w-full h-full object-cover"
        />
      </div>
      {/* <div className="flex-1 flex-col items-center justify-center p-4 hidden md:flex">
        <img src={versus_img} alt="Versus" className="max-w-full h-auto"/>
        <p className="text-center text-2xl md:text-4xl font-bold text-violet-800">
          CREATE YOUR BOUNTY 11 NOW !
        </p>
      </div> */}
    </div>
  );
};

export default Register;
