import React, { useState } from 'react'
import { useAuth } from '../components/Auth';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product1 = ({title,navbar}) => {
    const {products} = useAuth()
    const [isLoad, setisLoad] = useState(false)
    const token = localStorage.getItem('token')

    const addToCart = async (id) => {
        try {
            setisLoad(true)
            const response = await axios.post(`https://artgallerycomplete.onrender.com/cart/add-cartproducts/${id}`, id, {
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

  return (
    <>
    {navbar}
    {isLoad?<Loader></Loader>:""}
    <h1 style={{
                color: "wheat"
                , margin: "50px 0 40px 80px", textDecoration: "underline"
            }}>{title}</h1>
                <div className='newCard' key={1}>
                {products.map((elem) => {
                    const { name, price, description, _id, user } = elem;
                    return <>
                    <div className="wrapper-card" key={_id}>
                    <div className="container-card" key={_id}>
                        <div className="top">
                            <img
                                src={`https://artgallerycomplete.onrender.com/product/product-photo/${_id}`}
                                className="card-img-top"
                                alt={"p.name"}
                            />
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <div className="details">
                                    <h1 >{name?.substring(0, 10)}{name.length>10?"...":""}</h1>
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
                    <NavLink to={`/menu/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                    <div
                        className="inside"
                        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}                        >
                        <div className="icon">
                            <i className="material-icons"> Detail</i>
                        </div>
                        <div className="contents">{description}</div>
                        <div className="contents">Created By <b>{user?user.name:"You"}</b></div>
                    </div>
                    </NavLink>
                </div>
            </>
        })
        }
    </div>
</>
  )
}

export default Product1