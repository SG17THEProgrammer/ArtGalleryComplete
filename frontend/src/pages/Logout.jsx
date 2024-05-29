import React, { useEffect } from 'react'
import { useAuth } from '../components/Auth';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

const Logout = () => {

    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();
        toast.success('Logout Successfully')
        setTimeout(() => {

            window.location.reload();
        },2000)
    },[]);

            return <Navigate to="/entry" />
    

}

export default Logout

