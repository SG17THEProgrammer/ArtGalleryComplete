import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/Product.css'
import { useAuth } from '../components/Auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import FormatPrice from '../components/FormatPrice'
import Loader from '../components/Loader'
import '../css/Product.css'
const Product = ({name ,price,_id,description,user }) => {

    const [isLoad, setisLoad] = useState(false)
    const navigate = useNavigate();


    const { isLoading,products,backendApi } = useAuth()
    const token = localStorage.getItem('token')

    const productDisplay = products.filter((elem) => elem._id === _id)[0];
    console.log(productDisplay)


    const addToCart = async (id) => {
        try {
            setisLoad(true)
            const response = await axios.post(`${backendApi}/cart/add-cartproducts/${id}`, id, {
                headers: {
                    Authorization: token
                }
            });
            //   console.log('Item added to cart:', response.data);
            toast.success(response.data.message);
            setTimeout(()=>{
                window.location.reload()
            },100)
            setisLoad(false)    
            return response.data;
        } catch (error) {
            setisLoad(false)
            toast.error(error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            setisLoad(true)
            const response = await axios.delete(`${backendApi}/product/delete-product/${id}`, {
                headers: {
                    // method: "DELETE",
                    Authorization: token
                }
            });

            if (response) {
				navigate('/allproducts')
                toast.success('Product deleted successfully')
                setisLoad(false)
            } else {
                console.error("Error");
                setisLoad(false)
            }
        } catch (error) {

            console.log(error);
            setisLoad(false)
        }
    }

    useEffect(()=>{

    },[productDisplay,products])

    return (
        <>
            {isLoading && <Loader></Loader>
            }
            {isLoad && <Loader></Loader>
            }
                        <div className="wrapper-card" key={_id}>
                            <div className="container-card" key={_id}>
                                <div className="top">
                                <NavLink to={`/menu/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                                    <img
                                        src={`${backendApi}/product/product-photo/${_id}`}
                                        className="card-img-top"
                                        alt={"p.name"}  onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}   
                                    />
                                    </NavLink>
                                </div>
                                <div className="bottom">
                                    <div className="left">
                                        <div className="details">
                                            <h1 >{name?.substring(0, 10)}...</h1>
                                            <p>
                                                {price?.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "INR",
                                                })}
                                            </p>
                                        </div>
                                        <div className="buy" >
                                            <i
                                                className="material-icons"
                                                onClick={() => addToCart(_id)}
                                            >
                                                Add to
                                                <br />
                                                Cart
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="inside"
                                                    >
                                <div className="icon">
                                    <i className="material-icons"> Detail</i>
                                </div>
                                <div className="contents">{description}</div>
                                <div className="contents">Created By <b>{user?user.name:"You"}</b></div>
                                {!user?<>

                                {productDisplay?<NavLink to={`/edit/${productDisplay._id}`} className="contents"><button className='btn4'>Edit</button></NavLink>:""}
                                <button className='btn5'  onClick={()=>handleDelete(productDisplay._id)}>Delete</button>
                                </>
                                :""
                                }
                            </div>
                        </div>
                
        </>
    )
}

export default Product