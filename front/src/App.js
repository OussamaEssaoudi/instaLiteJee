import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import ContentListe from './ContentListe';
import ContentPage from './ContentPage';
import Home from './Home';
import UpdateContent from './UpdateContent';
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Profile from "./user/Profile";
import ProfileEdit from "./user/ProfileEdit";
import ListUsers from "./user/ListUsers";
import AddUser from "./user/AddUser";



function App() {

  const routes = [
    {
      name: "SignIn",
      path: "/SignIn",
      element: SignIn,
    },
    {
      name: "SignUp",
      path: "/SignUp",
      element: SignUp,
    },
    {
      name: "Profile",
      path: "/Profile",
      element: Profile,
    },
    {
      name: "ProfileEdit",
      path: "/ProfileEdit",
      element: ProfileEdit,
    },
    {
      name: "ListUsers",
      path: "/ListUsers",
      element: ListUsers,
    },
    {
      name: "AddUser",
      path: "/AddUser",
      element: AddUser,
    },
    {
      name: "home",
      path: "/",
      element: Home,
    },
    {
      name: "content",
      path: "/content",
      element: ContentPage,
    },
    {
      name: "update",
      path: "/update/:id",
      element: UpdateContent,
    }
  ];

  // const token = localStorage.getItem("user");
  const token = true;

  return (
    <Router>
      <Routes>
       {routes.map((route) => (
          
          token ? (
            <Route key={route.name} path={route.path} element={<route.element />} />
          ) : (
            <Route path='/' component={Home} />
          )

        ))}
        </Routes>
    </Router>
  );
}

export default App;
