import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaSpinner } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { UserToken } from '../../Context/UserTokenProvider';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(UserToken);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const validateInputs = Yup.object({
    email: Yup.string().required("Your email is required!").email("Invalid Email"),
    password: Yup.string().required("Your password is required!").matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, from 4 to 8 chars"),
  })
  const callLoginAPI = async (userInputs) => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, userInputs);
      setToken(data.token);
      localStorage.setItem("UserToken", data.token);
      console.log(data);
      setSuccessMessage("Success, Redirecting you to home in 1 second")
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    finally {
      setIsLoading(false);
    }
  }
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateInputs,
    onSubmit: callLoginAPI
  })
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 rounded-md w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          {successMessage && <p className='text-green-500 my-3 text-center'>{successMessage}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={loginForm.handleSubmit}>
            {/* Email*/}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='test@gmail.com'
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {loginForm.errors.email && loginForm.touched.email && <p className='text-red-500 mt-2'>{loginForm.errors.email}</p>}
            </div>
            {/* password*/}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='A123'
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {loginForm.errors.password && loginForm.touched.password && <p className='text-red-500 mt-2'>{loginForm.errors.password}</p>}
            </div>
            <div className='mt-4'>
              <button
                type="submit"
                className="disabled:opacity-60 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                disabled={!(loginForm.isValid && loginForm.dirty)}
              >
                {isLoading ? <FaSpinner className='text-xl icon-spin' /> : "Login"}
              </button>
              <button
                type='reset' onClick={loginForm.resetForm} className='mt-3 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                Clear Inputs
              </button>
            </div>
            {errorMessage && <p className='mt-4 text-red-500'>
              {errorMessage}
            </p>}
          </form >

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to={"/register"} className="font-semibold leading-6 text-[#005dcb] hover:text-indigo-500">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login