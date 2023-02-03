import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function SignUp() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password : "",
    passwordConfirmation: "",
  });


  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    console.log(userInfo);
    var data = JSON.stringify({
      "username": userInfo.username,
      "email": userInfo.email,
      "password": userInfo.password,
      "role": ["ROLE_USER"]
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8090/api/auth/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      navigate("/SignIn");
    }).catch(function (error) {
      console.log(error);
    });
  };

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };


  return (
    <div className="justify-center mt-10 page">


      <Navbar/>
    <div className="container mx-auto px-5 py-24 h-screen">
      <div className="flex justify-center items-center h-full gap-24 text-gray-800">
        <div className=" md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="./svg/SignIn.svg"
            alt="logo"
          ></img>
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
          <h2 className="font-bold text-2xl text-gray-800">Register</h2>
          <p className="text-md mt-4 mb-5 text-zinc-400">
            If you are already a member,{" "}
            <a
              href="/SignIn"
              className="text-pink-400 underline hover:text-pink-700 hover:no-underline"
            >
              sign in
            </a>
          </p>
          <form className="mt-12" id="account" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                aria-required="true"
                placeholder="Email"
                name="email"
                value={userInfo.email}
                type="email"
                onChange={handleChange}
              />
              <span className="text-danger text-xs "></span>
            </div>
            <div className="mb-3">
              <input
                className="form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                aria-required="true"
                placeholder="Username"
                name="username"
                value={userInfo.username}
                type="text"
                onChange={handleChange}

              />
              <span className="text-danger text-xs "></span>
              <div className="text-danger text-xs "></div>
            </div>
            <div className="mb-3">
              <input
                className="form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                aria-required="true"
                placeholder="Password"
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}

              />
              <span className="text-danger text-xs "></span>
            </div>
            <div className="mb-3">
              <input
                className="form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                aria-required="true"
                placeholder="Password confirmation"
                type="password"
                name="passwordConfirmation"
                value={userInfo.passwordConfirmation}
                onChange={handleChange}

              />
              <span className="text-danger text-xs "></span>
            </div>
            <button
              id="registerSubmit"
              type="submit"
              className="bg-pink-400 border py-3 w-full rounded-xl mt-2 flex justify-center items-center text-md hover:scale-105 duration-300 text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div></div>
  );
}
