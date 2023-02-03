// import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import { useState, useContext, useEffect } from "react";
// import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";


export default function AddUser() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password : "",
    passwordConfirmation: ""
  });

  function getUserInfo(){
    const user = JSON.parse(localStorage.getItem('user'))
    var config = {
      method: 'get',
      url: 'http://localhost:8090/api/users/user?id='+ user["id"],
      headers: {
        'Authorization': user.jwt
      },
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      delete response.data.password
      setUserInfo(response.data)
      console.log(userInfo)
    }).catch(function (error) {
      console.log(error);
    });
  }

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(userInfo);
    var data = {
      "username": userInfo.username,
      "email": userInfo.email,
      "password": userInfo.password,
      "role": ["ROLE_USER"]
    };
console.log(data)
    var config = {
      method: 'post',
      url: 'http://localhost:8090/api/add',
      headers: {
        'Authorization': user.jwt,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
    }).catch(function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('isAuthentificated')) {
      getUserInfo()
    }else {
      navigate("/SignIn")
    }
  }, []);

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

    return (
      <div className="py-32">
          <div className="overflow-hidden bg-white border shadow-lg sm:rounded-lg mx-8">
              <div className="px-4 py-5 sm:px-6 shadow sm:overflow-hidden sm:rounded-md">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add new user</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-8 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        className="form-control block w-full mt-1 px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                        placeholder=""
                        type="text"
                        name="email"
                        id="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        />
                        <span className="text-danger text-xs "></span>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                        </label>
                        <input
                            className="form-control block w-full mt-1 px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                            placeholder=""
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={userInfo.firstname}
                            onChange={handleChange}
                        />
                        <span className="text-danger text-xs "></span>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        className="form-control block w-full mt-1 px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                        placeholder=""
                        type="text"
                        name="last-name"
                        id="last-name"
                        value={userInfo.lastname}
                        onChange={handleChange}
                        />
                        <span className="text-danger text-xs "></span>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        className="form-control block w-full mt-1 px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                        placeholder=""
                        type="text"
                        name="username"
                        id="username"
                        value={userInfo.username}
                        onChange={handleChange}
                        />
                        <span className="text-danger text-xs "></span>
                    </div>
                    <div className="col-span-6 sm:col-span-3"></div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        className="form-control block w-full mt-1 px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                        placeholder=""
                        type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange}
                        />
                        <span className="text-danger text-xs "></span>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Password confirmation
                      </label>
                      <input
                        className="form-control block w-full mt-1 px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                        placeholder=""
                        type="password"
                        name="password"
                        value={userInfo.passwordConfirmation}
                        onChange={handleChange}
                        />
                        <span className="text-danger text-xs "></span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#FF597B] mr-5  border rounded-xl py-2 px-4 justify-center items-center text-sm hover:scale-105 duration-300 text-white"
                  >
                    Submit
                  </button>
                </div>
                </div>
                </form>
          </div>
        </div>
      </div>
    )
  }
