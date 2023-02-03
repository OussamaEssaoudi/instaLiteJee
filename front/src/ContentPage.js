import React, {useState} from 'react';
import insta from './instalite.jpg';
import instal from './instalite.png';
import "./ContentPage.css";
import Content from './Content';
import ContentListe from './ContentListe';
import Navbar from './Navbar';



function ContentPage() {

  const user = JSON.parse(localStorage.getItem('user'))
  const admin = user.isAdmin;
  return (
    <div className="justify-center mt-10 page">


      <Navbar/>

      <div className='bg-pink-100 mt-16 mx-32 contentArea'>
        <ContentListe admin={admin}/>
      </div>
      
    </div>
  );
}

export default ContentPage;
