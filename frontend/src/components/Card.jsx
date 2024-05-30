import React, { useState } from 'react'
import '../css/Card.css'
import Navbar from './Navbar'
import { useAuth } from './Auth'
import { NavLink, useParams } from 'react-router-dom'
import FormatPrice from './FormatPrice'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { useNavigate } from "react-router-dom";

const Card = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setisLoad] = useState(false);

  const { id } = useParams();

  const { products } = useAuth()
  console.log(products)

  const { user } = useAuth()
  console.log(user)
  const { backendApi } = useAuth()

  const navigate = useNavigate();

  console.log(backendApi)
  const productDisplay = products.filter((elem) => elem._id === id)[0];
  console.log(productDisplay)

  console.log(productDisplay._id)

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
      window.location.reload();
      setisLoad(false)
      //   return response.data;
    } catch (error) {
      setisLoad(false)
      toast.error(error.response.data.message)
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`https://artgallerycomplete.onrender.com/product/delete-product/${id}`, {
        headers: {
          // method: "DELETE",
          Authorization: token
        }
      });

      if (response) {
        navigate('/allproducts')
        toast.success('Product deleted successfully')
        setIsLoading(false)
      } else {
        console.error("Error");
        setIsLoading(false)
      }
    } catch (error) {

      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar></Navbar>
      {isLoading ? <Loader></Loader> : ""}
      {isLoad ? <Loader></Loader> : ""}
      <div id="container1">

        <div className="product-details">
          <h1 className='title1' >{productDisplay.name}</h1>
          {/* <span className="hint-star star">
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star-o" aria-hidden="true"></i>
	</span> */}
          <br /><br />
          <p className="information" name='description' >"{productDisplay.description}"</p>



          <div className="control">

            <button className="btn2">
              <span className="price"  ><FormatPrice price={productDisplay.price}></FormatPrice></span>
              <span className="shopping-cart" onClick={() => addToCart(productDisplay._id)}><i className="fa fa-shopping-cart" aria-hidden="true" ></i></span>
              <span className="buy" onClick={() => addToCart(productDisplay._id)}>Get now</span>
            </button>

          </div>

        </div>

        <div className="product-image">

          <img src={`https://artgallerycomplete.onrender.com/product/product-photo/${productDisplay._id}`} alt="err" className='img8' />


          {user.email == productDisplay.user.email ? <div className="info">
            <h2 style={{ textDecoration: "underline" }}>Update Product</h2><br />
            <ul className='btnlist'>
              {/* <li><strong>Height : </strong>5 Ft </li>
		<li><strong>Shade : </strong>Olive green</li>
		<li><strong>Decoration: </strong>balls and bells</li>
		<li><strong>Material: </strong>Eco-Friendly</li> */}

              <NavLink to={`/edit/${productDisplay._id}`}>
                <button className='btn4'>Edit</button>
              </NavLink>

              <button className='btn5' onClick={() => handleDelete(productDisplay._id)}>Remove</button>
            </ul>
          </div> : ""}

        </div>

      </div>



    </>
  )
}

export default Card