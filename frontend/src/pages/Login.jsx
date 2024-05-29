import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../components/Auth';
import Loader from '../components/Loader';


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { storeTokensInLS } = useAuth()

  const [showPassword, setshowPassword] = useState(false)

  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  })
  const handleshowPassword = () => {
    setshowPassword(prev => !prev)
  }


  const handleInputLogin = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setloginUser({
      ...loginUser,
      [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });
      // console.log(1)
      console.log("response data : ", response);

      const resData = await response.json();

      console.log(resData);

      if (response.ok) {
        //storing tokens in LS through context api (useAuth)
        storeTokensInLS(resData.token)


        //storing tokens in LS in simple way
        // localStorage.setItem('token',resData.token);

        setloginUser({ email: "", password: "" });
        setIsLoading(false);
        navigate('/home')

        toast.success("login successfully");
          window.location.reload()
      } else {
        toast.error(resData.message);

        console.log("error inside response ", "error");
        setIsLoading(false);
      }
    } catch (error) {

      toast.error('Error fetching Api')
      setIsLoading(false);
    }
  };



  return (
    <div className="login-form">
      <div className="title">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="input-boxes">
          <div className="input-box">
            <i className="fas fa-envelope"></i>
            <input type="text" placeholder="Enter your email" onChange={handleInputLogin}
              name='email' value={loginUser.email}
            />
          </div>
          <div className="input-box">
            <i className="fas fa-lock"></i>
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleInputLogin}
              name='password' value={loginUser.password} />
            {showPassword ? <FaEye className='eye' onClick={handleshowPassword} /> :
              <FaEyeSlash className='eye' onClick={handleshowPassword} />}

          </div>
          {/* <div className="text"><NavLink to="/forgotpassword">Forgot password?</NavLink></div> */}
          <div className="button input-box" onClick={handleSubmit}>
            {isLoading ? <input type="submit" value="Logging In..." /> : <input type="submit" value="Sumbit" />}
            {isLoading && <Loader></Loader>
            }      {/* <img src="images/loader.gif" alt="" className='loader'/> */}
          </div>
          <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Sigup now</label></div>
        </div>



      </form>
    </div>)
}

export default Login