import React from 'react'
import axios from "axios";
import { useState, useContext, useEffect } from "react";
// import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';

export default function ListUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    function getUsers(){
        // const user = JSON.parse(localStorage.getItem('user'))
        var config = {
            method: 'get',
            url: 'http://estcequecestbientotleweekend.fr/',
        };

        axios(config).then(function (response) {
            // setUsers(response.data)
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if (localStorage.getItem('isAuthentificated')) {
            getUsers()
        }else {
            navigate("/SignIn")
        }
    }, []);


  return (
    <div className="justify-center mt-10 page">


      <Navbar/>
    <div className="py-32">
        <div className="overflow-hidden bg-white border shadow-lg sm:rounded-lg mx-8">
            <div className="px-4 py-5 sm:px-6">
                <div className="relative overflow-x-auto">
                <div className="flex justify-between px-4 py-5 sm:px-6 shadow sm:overflow-hidden">
                    <div className=''>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">List of users</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Users details</p>
                    </div>

                    <button
                        className="bg-pink-400 mr-5  border rounded-xl py-2 px-4 justify-center items-center text-sm hover:scale-105 duration-300 text-white"
                    >
                        Add user
                  </button>
                </div>
                <div className='px-6 border rounded-xl mt-5'>
                    <table className="px-6 py-5 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Firstname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lastname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Ideri
                                </th>
                                <td className="px-6 py-4">
                                    admin@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    Ismail
                                </td>
                                <td className="px-6 py-4">
                                    Idrissi
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-pink-600 dark:text-pink-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            {users && users.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                    <td>{listValue.id}</td>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.price}</td>
                                    </tr>
                                );
                            })}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Ideri2
                                </th>
                                <td className="px-6 py-4">
                                    admin2@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    Ismail
                                </td>
                                <td className="px-6 py-4">
                                    El kadiri
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-pink-600 dark:text-pink-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Webstorm
                                </th>
                                <td className="px-6 py-4">
                                    Webstorm@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    Webstorm
                                </td>
                                <td className="px-6 py-4">
                                    hidden
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-pink-600 dark:text-pink-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
  )
}
