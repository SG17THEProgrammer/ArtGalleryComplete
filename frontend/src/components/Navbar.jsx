import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { PiList } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import '../css/Navbar.css'
import { NavLink } from 'react-router-dom';
import { useAuth } from './Auth';
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify';
const Navbar = () => {

  const {user}  = useAuth()
  const {isLoggedIn} = useAuth()
  const [dropdownMenu  ,setdropdownMenu] = useState(false)
  
  const { cartItem } = useAuth()
  let cartVal = cartItem?cartItem.reduce((initialVal,curr)=>
  initialVal+curr.quantity
  ,0):""

  
  const alert = ()=>{
    toast.error("You must be logged in")
  }
  useEffect(()=>{

  },[isLoggedIn,user])

  return (
    <>
      <div className='navbar '>
      <NavLink to="/home">
      <img src="images/navbar_logo.jpg" alt="error" className='img' />
      </NavLink>

      {/* <input type="text" placeholder='Search' className='inp'/> */}
      {/* <FaSearch className='searchicon'/> */}

      <div>
      <PiList className='icn' onClick={()=>setdropdownMenu(!dropdownMenu)}/>
      {dropdownMenu?
      <div className='dropdown' >
        <NavLink to='/home' className="navlink">
        <p className='para'>Home</p>
        </NavLink>

        {isLoggedIn?
        <>
        <NavLink to='/menu/66029d5027cb2142972aaa35' className="navlink" >
            <p className='para'>Menu</p>
        </NavLink>
        <NavLink to='/creatework' className="navlink" >
            <p className='para'>Sell your work</p>
        </NavLink>
        <NavLink to='/allproducts' className="navlink" >
            <p className='para'>Art Products</p>
        </NavLink>
        <NavLink to='/contact' className="navlink" >
            <p className='para'>Contact Us</p>
        </NavLink>
        <NavLink to='/team' className="navlink" >
            <p className='para'>About Us</p>
        </NavLink>
        <NavLink to='/cart' className="navlink" >
            <p className='para'>Cart <sup className='sup'>{cartVal?cartVal:"0"}</sup></p>
            {/* <FaCartShopping style={{left:"52px", position:"absolute",bottom:"60px"}} className='icon'/> */}
        </NavLink>
        <NavLink to='/logout' className="navlink" style={{color:"red"}}>
            <p className='para'>Logout</p>
        </NavLink>
        </>
        :
        <><NavLink to='/entry' className="navlink">
                  <p className='para'>Login/SignUp</p>
                </NavLink>
        
                  </>
                  }
        
        
      </div>:""
      }
{isLoggedIn?
      <NavLink to='/about' style={{color:"black"}}>
      
      {user.photo?<img src={`https://artgallerycomplete.onrender.com/user/photo/${user._id}`} alt="error" className='icn3' />:
      user.avatar? <img src={user.avatar} alt="error" className='icn3' />: <FaRegUserCircle className='icn'/>}
      </NavLink>:
      <NavLink to='/entry' style={{color:"black"}} onClick={alert}> 
      {user.photo?<img src={`https://artgallerycomplete.onrender.com/user/photo/${user._id}`} alt="error" className='icn3' />:
      user.avatar? <img src={user.avatar} alt="error" className='icn3' />: <FaRegUserCircle className='icn'/>}
      </NavLink>}
      </div>







      </div>
    </>
  )
}

export default Navbar