import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser, createUserAsync } from "../AuthSlice";
import { Link, Navigate, useLocation } from "react-router-dom";
import logo from "../../../images/logo light.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      {user && <Navigate to={location?.state?.prevUrl} replace={true} />}
      {user && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-36 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              toast.info("Thanks for signing up! Enjoy your shopping");
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                })
              );
              console.log(data);
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:
                        "- at least 8 characters\n, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n,Can contain special characters",
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.password?.message}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "password doesn't match",
                    validate: (value, formValues) =>
                      value === formValues.password || "password doesn't match",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">
                  {errors?.confirmPassword?.message}
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              {user?.email && <div className="text-red-500">{user.email}</div>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/SignIn"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
