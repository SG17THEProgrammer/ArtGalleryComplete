import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/About.css'
// import { FaRegUserCircle } from "react-icons/fa";
// import {ImagetoBase64} from '../utility/ImagetoBase64'

import axios from 'axios'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify';
import Loader from '../components/Loader'
// import Menu1 from './Menu1'
import Product from './Product'
import Authorize from '../components/Authorize'
import Footer from '../components/Footer'
const About = () => {

    const { isLoggedIn, user } = useAuth()

    const { particularUserItem } = useAuth()
    console.log(particularUserItem)

    const [isLoading, setIsLoading] = useState(false);


    const [userData, setUserData] = useState(true)

    const [about, setAbout] = useState({
        name: "",
        email: "",
        phone: "",

    })

    if (userData && user) {
        setAbout({
            name: user.name,
            email: user.email,
            phone: user.phone,

        });
        setUserData(false);
    }

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setAbout({
            ...about,
            [name]: value,
        });
    };
    const [photo, setPhoto] = useState("");



    const updateUser = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            let newForm = new FormData();
            newForm.append("name", about.name);
            newForm.append("email", about.email);
            newForm.append("phone", about.phone);
            photo && newForm.append("photo", photo);
            for (var key of newForm.entries()) {
                console.log(key[0] + ", " + key[1]);
            }
            const res = await axios.put(
                `https://glorious-hat-toad.cyclic.app/api/v1/user/updateprofile/${user._id}`,
                newForm
            );
            console.log(res)
            toast.success("Successfully Updated")
            setIsLoading(false)

        } catch (error) {

            console.log(error);
            toast.error(error.response.data.error);
            setIsLoading(false)
        }
    };

    return (
        <>
            {isLoggedIn ? <> <Navbar></Navbar>
                <form onSubmit={updateUser}>
                    <div className='outerdiv'>
                        <div className="left" style={{ backgroundColor: "white" }}>
                            <div style={{ textAlign: "center" }}>
                                <img src="images/robot.gif" alt="" style={{ filter: "contrast(1.08)" }} />
                            </div>
                            <div style={{ textAlign: "center", marginLeft: "70px" }}>
                                <h5 style={{ color: "black" }}>Hello {user.name} </h5>
                                <h5 style={{ color: "black" }}>Welcome To Your Art Gallery Profile</h5>
                            </div>
                        </div>
                        <div className="right">
                            <div>
                                <div className="form1">
                                    <div className="title">Welcome , {user.name}</div>
                                    <div className="subtitle"> Update your account!</div>
                                    {/* {user.photo?<img src={user.photo} alt="error" className='image' />:
                            about.photo?<img src={about.photo} alt="error" className='image' /> :<img src={user.avatar} alt='error' className='image'/>
                             } */}
                                    {photo ? (
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="error"
                                            className="image"
                                        />
                                    ) : (
                                        <img
                                            src={
                                                !user.photo
                                                    ? user.avatar
                                                    : `https://glorious-hat-toad.cyclic.app/api/v1/user/photo/${user._id}`
                                            }
                                            alt="error"
                                            className="image" style={{ marginRight: "13px" }}
                                        />
                                    )}
                                    <label htmlFor='file' className='label'>Upload</label>
                                    <input type='file' id='file' className='input' name='file' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])}></input>
                                    <div className="input-container ic1">
                                        <span>Name:</span>
                                        <input id="name" className="inp2" type="text" name='name' value={about.name} onChange={handleInput} />
                                        <div className="cut"></div>
                                        {/* <label for="name" className="placeholder">{about.name}</label> */}
                                    </div>
                                    <div className="input-container ic2">
                                        <span>Email: </span>
                                        <input id="email" className="inp2" type="text" name='email' value={about.email} onChange={handleInput} />
                                        <div className="cut cut-short"></div>
                                        {/* <label for="email" className="placeholder">{user.email}</label> */}
                                    </div>
                                    <div className="input-container ic2">
                                        <span>Phone:</span>
                                        <input id="phone" className="inp2" type="number" name='phone' value={about.phone} onChange={handleInput} />
                                        <div className="cut"></div>
                                        {/* <label for="phone" className="placeholder">{user.phone}</label> */}
                                    </div>
                                    {isLoading ? <button type="text" className="submit">Updating....</button> : <button type="text" className="submit" >Update</button>}

                                    {isLoading && <Loader></Loader>
                                    }                        </div>
                            </div>
                        </div>
                    </div>
                </form>
                <h1 style={{
                    color: "wheat"
                    , margin: "50px 0 40px 80px", textDecoration: "underline"
                }}>Your Products</h1>
                <div className='newCard' key={1}>

                    {
                        particularUserItem?.length > 0 ? particularUserItem?.length > 0 && particularUserItem?.map((elem) => {
                            const { name, price, description, _id } = elem;
                            return <Product
                                name={name}
                                price={price}
                                description={description}
                                _id={_id}
                            ></Product>
                        })
                            : <>
                                <div className='title3'>No Products</div><br /><br /><br /><br /><br /></>}
                </div></> : <Authorize></Authorize>}
                <Footer></Footer>
        </>
    )
}

export default About