import React from 'react';
import './PageNotFound.css';
import Navbar from '../Components/Navbar.js';


function PageNotFound() {
  return (
    <div className="bg">
      <Navbar/>
      <p className="mainText">Page not found.</p>
    </div>
  )
}

export default PageNotFound;