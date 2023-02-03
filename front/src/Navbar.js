import React, {useState} from 'react';
import {Link} from 'react-router-dom';


function Navbar() {

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" class="flex items-center">
            <img src="https://img.icons8.com/3d-plastilina/69/null/instagram-new--v1.png" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">instaLite</span>
        </a>
        <div class="flex gap-x-5 md:order-2">
        {!user ?
            (
              <div class="flex gap-x-5"><Link to={`/signin`}><button type="button" class="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Login</button></Link>
              <Link to={`/signup`}><button type="button" class="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Register</button></Link>
            </div>
            ) :
            (
              <div class="flex gap-x-5">
              <button onClick={()=>{localStorage.clear();}} type="button" class="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Logout</button>
              <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </div>
              </div>
            )
        }
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link to={`/`}><li>
              <a href="#" class="block py-2 pl-3 pr-4 text-white bg-pink-700 rounded md:bg-transparent md:text-pink-700 md:p-0 dark:text-white" aria-current="page">Home</a>
            </li></Link>
            <Link to={`/content`}><li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Content</a>
            </li></Link>
            <Link to={`/update/new`}><li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Upload</a>
            </li></Link>
          </ul>
        </div>
        </div>
    </nav>
  );
}

export default Navbar;
