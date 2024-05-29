import React, { useState } from 'react'
import '../css/Error.css'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import { toast } from 'react-toastify'

const Error = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
          const googleSearchURL = "https://www.google.com/search?q=" + encodeURIComponent(searchTerm);
        //   window.location.href = googleSearchURL;
          window.open(googleSearchURL, "_blank");
          setSearchTerm("")
        } else {
          toast.error("Please enter a search term.");
        }
      };
  return (
    <>
    <Navbar></Navbar>
    <div>
    <section className='section'>
    <div class="container4 container3">
      <div class="text2">
        <h1>404 Error</h1>
        <h1>Page Not Found</h1>
        <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
        <div class="input-box">
        <span>
          <form onSubmit={handleSearch}>
         <input type="text" id="input-box"  value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search..." autocomplete="off"/>
          <button type='Submit'><i class="fa-solid fa-search"></i></button>
          </form>
          </span>
        </div>
        <div class="result-box"></div>
        <NavLink to='/home'>
<button className='btn6'>Go to Homepage</button>
        </NavLink>
      </div>
      <div><img class="image1" src="https://omjsblog.files.wordpress.com/2023/07/errorimg.png" alt=""/></div>
    </div>
  </section>
    </div>
    </>
  )
}

export default Error