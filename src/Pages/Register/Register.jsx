import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const callRegisterAPI = async (userValues) => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, userValues);
      setSuccessMessage("Success, Redirecting to login in 1 second");
      setTimeout(() => {
        navigate("/login")
      }, 1000);

    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
    finally {
      setIsLoading(false);
    }
  }
  const validateInputs = Yup.object({
    name: Yup.string().required("Your Name is Required").min(3, "Your name is too short").max(12, "Your name is too long!"),
    email: Yup.string().required("Your email is required!").email("Invalid Email"),
    password: Yup.string().required("Your password is required!").matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, from 4 to 8 chars"),
    age: Yup.number().required("Your age is required").min(16, "You're too young"),
    phone: Yup.string().required("Your mobile number is required").matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "Invalid phone number!")
  })
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validateInputs,
    onSubmit: callRegisterAPI
  })
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 bg-[#171717] rounded-md w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Register a new account
          </h2>
          {successMessage && <p className='text-green-500 my-3 text-center'>{successMessage}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={registerForm.handleSubmit}>
            {/* Name*/}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder='tharwat'
                  value={registerForm.values.name}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {registerForm.errors.name && registerForm.touched.name && <p className='text-red-500 mt-2'>{registerForm.errors.name}</p>}
            </div>
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
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {registerForm.errors.email && registerForm.touched.email && <p className='text-red-500 mt-2'>{registerForm.errors.email}</p>}
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
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {registerForm.errors.password && registerForm.touched.password && <p className='text-red-500 mt-2'>{registerForm.errors.password}</p>}
            </div>
            {/* age*/}
            <div>
              <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder='18'
                  value={registerForm.values.age}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {registerForm.errors.age && registerForm.touched.age && <p className='text-red-500 mt-2'>{registerForm.errors.age}</p>}
            </div>
            {/* phone*/}
            <div>
              <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder='18'
                  value={registerForm.values.phone}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {registerForm.errors.phone && registerForm.touched.phone && <p className='text-red-500 mt-2'>{registerForm.errors.phone}</p>}
            </div>
            <div className='mt-4'>
              <button
                type="submit"
                className="disabled:opacity-60 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                disabled={!(registerForm.isValid && registerForm.dirty)}
              >
                {isLoading ? <FaSpinner className='text-xl icon-spin' /> : "Register"}
              </button>
              <button
                type='reset' onClick={registerForm.resetForm} className='mt-3 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                Clear Inputs
              </button>
            </div>
            {errorMessage && <p className='mt-4 text-red-500'>
              {errorMessage}
            </p>}
          </form >
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={"/login"} className="font-semibold leading-6 text-[#005dcb] hover:text-indigo-500">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register