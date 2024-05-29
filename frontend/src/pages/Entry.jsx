import React from 'react'
import '../css/Entry.css'
import Register from './Register';
import Login from './Login';
import Navbar from '../components/Navbar';
import { useAuth } from '../components/Auth';
import Authorize from '../components/Authorize';

const Entry = () => {

  const {isLoggedIn} = useAuth();


  return (
    <>
    {!isLoggedIn?<>
    <Navbar></Navbar>
    <div className='body'>
        
  <div className="container" style={{height:"510px" ,marginTop:"-20px"}}>
    <input type="checkbox" id="flip"/>
    <div className="cover">
      <div className="front">
        <img src="https://images.unsplash.com/photo-1608501947097-86951ad73fea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="error"/>
        <div className="text">
          <span className="text-1">Every new friend is a <br/> new adventure</span>
          <span className="text-2">Let's get connected</span>
        </div>
      </div>
      <div className="back">
      <img className="backImg" src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="error"></img>
        <div className="text">
          <span className="text-1">Complete miles of journey <br/> with one step</span>
          <span className="text-2">Let's get started</span>
        </div>
      </div>
    </div>
    <div className="forms">
        <div className="form-content">
     <Login></Login>
       <Register></Register>
    </div>
    </div>
  </div>
  </div></>:<Authorize></Authorize>
}
    </>
  )
}

export default Entry