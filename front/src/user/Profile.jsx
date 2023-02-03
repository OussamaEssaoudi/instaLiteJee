// import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import { useState, useContext, useEffect } from "react";
// import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function Profile() {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password : "",
    });

    function getUserInfo(){
        const user = JSON.parse(localStorage.getItem('user'))
        var config = {
            method: 'get',
            url: 'http://localhost:8090/api/users/user?id=' + user["id"],
            headers: {
              'Authorization': user.jwt
            },
        };

        axios(config).then(function (response) {
            setUserInfo(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }

    function redirectTo(){
        navigate("/ProfileEdit")
    }

    useEffect(() => {
        if (localStorage.getItem('isAuthentificated')) {
            getUserInfo()
        }else {
            navigate("/SignIn")
        }
    }, []);

  return (
    <div className="justify-center mt-10 page">


      <Navbar/>
    <div className="py-32">
        <div className="overflow-hidden bg-white border shadow-lg sm:rounded-lg mx-8">
            <div className="px-4 py-5 sm:px-6 shadow sm:overflow-hidden sm:rounded-md">
                <h3 className="text-lg font-medium leading-6 text-gray-900">User Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Firstname</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ userInfo.firstname} </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Lastname</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ userInfo.lastname}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ userInfo.email}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ userInfo.username}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Password</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">*******</dd>
                    </div>
                </dl>
            </div>
            <div className="w-6/12 my-6 mx-auto">
                <button
                className="bg-pink-300 border py-3 w-full rounded-xl mt-2 flex justify-center items-center text-md hover:scale-105 duration-300 text-white">Edit</button>
            </div>
        </div>
    </div></div>
  )
}
