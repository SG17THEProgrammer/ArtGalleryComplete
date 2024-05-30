import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../css/Register.css'
import { useAuth } from '../components/Auth';
import Loader from '../components/Loader';


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
  const {storeTokensInLS,backendApi}  =useAuth()

    const [showPassword,setshowPassword] = useState(false)

    const handleshowPassword=()=>{
        setshowPassword(prev =>!prev)
      }
      const api = `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}.png`;

  const [registerUser , setregisterUser] =useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    avatar:api
})

      const handleInputSignIn=(e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        setregisterUser({
          ...registerUser,
          [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
      }


      
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const response = await fetch(`${backendApi}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerUser),
      });
      console.log("response data : ", response);
      
      const resData = await response.json();
      console.log(resData);

      if (response.ok) {
        
        //storing tokens in LS through context api 
        storeTokensInLS(resData.token)
        
        
        //storing tokens in LS in simple way
        // localStorage.setItem('token',resData.token);
        
        setregisterUser({ name:"", email: "", phone: "", password: "",image:""});
        setIsLoading(false);
        navigate('/home')
        toast.success(resData.message);  
        // console.log(resData);
      } else {        toast.error(resData.message[0]);  
        
        console.log("error inside response ", "error");
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error", error);
      setIsLoading(false)
    }
  }


    
      
    
  return (
    <div className="signup-form" style={{marginTop:"-30px"}}>
    <div className="title">Signup</div>
  <form onSubmit={handleSubmit}>
      <div className="input-boxes">
        <div className="input-box">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Enter your name" onChange={handleInputSignIn} name='name' value={registerUser.name} />
        </div>
        <div className="input-box">
          <i className="fas fa-envelope"></i>
          <input type="text" placeholder="Enter your email" onChange={handleInputSignIn} name='email' value={registerUser.email} />
        </div>
        <div className="input-box">
          <i className="fas fa-lock"></i>
          <input type={showPassword?"text":"password"}  placeholder="Enter your password" onChange={handleInputSignIn} name='password' value={registerUser.password} />
          {showPassword?<FaEye className='eye' onClick={handleshowPassword}/>:
              <FaEyeSlash  className='eye' onClick={handleshowPassword}/>}
        </div>
        <div className="input-box">
          <i className="fas fa-phone"></i>
          <input type="number" placeholder="Enter your phone number " onChange={handleInputSignIn} name='phone' value={registerUser.phone}  />
        </div>
        <div className="button input-box" onClick={handleSubmit}>
        {isLoading?<input  type="submit" value="Registering..."/>:
          <input type="submit" value="Sumbit"/>}
        </div>
        {isLoading && <Loader></Loader>
                    }
        <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
      </div>
</form>
</div>  )
}

export default Register;