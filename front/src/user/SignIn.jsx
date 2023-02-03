// import logo from './logo.svg';
// import "../Assets/css/signIn.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
// import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

// async function loginUser(credentials) {
//   return fetch("http://localhost:3000/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   })
//     .then((data) => data.json())
//     .catch(function (error) {
//       if (error.response) {
//         // Request made and server responded
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//     });
// }

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function SignIn() {
  // const { user, setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password : "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    var data = JSON.stringify({
      "username": userInfo.username,
      "password": userInfo.password,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8090/api/auth/signin',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      const user = {
        "jwt": "Bearer " + response.data.accessToken,
        "isAdmin": response.data.roles.includes("ROLE_ADMIN"),
        "id": response.data.id
      }
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthentificated',true);
      navigate("/Profile");
      console.log(localStorage)
    }).catch(function (error) {
      console.log(error);
    });
    // const jsonData = await loginUser({
    //   username,
    //   password,
    // });

    // setUser({ user: jsonData.user, token: jsonData.token });
    // localStorage.setItem("jwt", "Bearer " + jsonData.token);
    // localStorage.setItem("user", JSON.stringify({ ...jsonData.user }));
    // if (res.token) setToken("Bearer " + res.token);
  };

  useEffect(() => {
    if (localStorage.getItem('isAuthentificated')) {
      navigate("/Profile");
    }
  }, []);

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
              src="./svg/SignUp.svg"
              alt="logo"
            ></img>
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h2 className="font-bold text-2xl text-gray-800">Login</h2>
            <p className="text-md mt-4 mb-5 text-zinc-400">
              If you are not a member,{" "}
              <a
                href="/SignUp"
                className="text-pink-400 underline hover:text-pink-700 hover:no-underline"
              >
                sign up
              </a>
            </p>
            <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
              <div className="-space-y-px rounded-md shadow-sm">
                  <div className="mb-3">
                      <input
                          className="form-control block w-full px-4 py-3 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                          id="username-address"
                          name="username"
                          type="text"
                          autoComplete="username"
                          required
                          placeholder="username address"
                          onChange={handleChange}
                          />
                      <span className="text-danger text-md "></span>
                  </div>
                  <div className="mb-3">
                      <input
                          className="form-control block w-full px-4 py-3 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                          aria-required="true"
                          type="password"
                          id="password"
                          name="password"
                          autoComplete="current-password"
                          required
                          placeholder="Password"
                          onChange={handleChange}
                          />
                      <span className="text-danger text-md "></span>
                  </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-[#FF597B]"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-md text-stone-500"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-md">
                  <a
                    href="#"
                    className="text-stone-500 hover:text-stone-700"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

                <button
                  type="submit"
                  className="bg-pink-400 border py-2 w-full rounded-xl mt-2 flex justify-center items-center text-md hover:scale-105 duration-300 text-white"
                  >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  Sign in
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
