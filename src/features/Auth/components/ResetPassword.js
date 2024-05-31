import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logo from "../../../images/logo (2).png";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPasswordAsync, selectPasswordReset } from "../AuthSlice";

export default function ResetPassword() {
  const passwordReset = useSelector(selectPasswordReset);
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  return (
    <div>
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto my-10 h-28 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
            <h2 className="mt-3 text-center text-xl leading-9 tracking-tight text-gray-900">
              Enter your new password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
                );
              })}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
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
                        value === formValues.password ||
                        "password doesn't match",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500">
                    {errors?.confirmPassword?.message}
                  </p>
                </div>
              </div>
              {passwordReset && (
                <p className="text-green-500">
                  Your password has been reset succesfully.
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Link had expired</p>
      )}
    </div>
  );
}
