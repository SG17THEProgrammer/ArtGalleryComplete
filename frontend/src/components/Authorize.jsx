import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from './Auth';

const Authorize = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();


{!isLoggedIn?  useEffect(() => {
      toast.error("Pls login to get access")
      navigate("/login")
    }, []): useEffect(() => {
      toast.error("You are already logged in")
      navigate("/")
    }, [])}
  return (
    <>
    </>
  )
}

export default Authorize