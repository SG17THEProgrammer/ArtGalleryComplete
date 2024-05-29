import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/Cart.css'
import { IoArrowBackCircle, IoTrashBin } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { useAuth } from '../components/Auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormatPrice from '../components/FormatPrice';
import Loader from '../components/Loader';
const Cart = () => {
  
    const [isLoading , setIsLoading] = useState(false);
    const token = localStorage.getItem('token')
    const [quantity, setQuantity] = useState(1);

    const [shipment, setShipment] = useState({
        shipmethod:""
    })

    const { cartItem } = useAuth()
    console.log(cartItem)
   
    const increaseQty = (id) => {
        cartItem.map((elem)=>{
            
            elem._id === id?setQuantity(++elem.quantity):"";
        })
    };
    const decreaseQty = (id) => {
        cartItem.map((elem)=>{
            elem._id === id?elem.quantity>1?setQuantity(--elem.quantity):setQuantity(1):"";
        })
    };


    const totalPrice = cartItem?cartItem.reduce((sum,curr)=>parseFloat(sum) + parseFloat(curr.price),0):""
    console.log(totalPrice)

    


    const deletecartItem = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`https://glorious-hat-toad.cyclic.app/api/v1/cart/delete-cartproduct/${id}`, {
                headers: {
                    // method: "DELETE",
                    Authorization: token
                }
            });

            if (response) {

                // const data = await response.json();
                // console.log(data.products);

                // setcartItem(data.products);
                setTimeout(()=>{

                    window.location.reload()
                },100)
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

  
    
    const handleShip=(e) => {
        const { name, value } = e.target

    setShipment((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

    }

    let totalOrderPrice = cartItem?cartItem.reduce((initialVal,curr)=>
    initialVal+(curr.quantity*curr.price)
,0):""

useEffect(() => {

},[cartItem])


    return (
        <>
            <Navbar></Navbar>
            {isLoading && <Loader></Loader>
                    }
            <div className="card1">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title2">
                            <div className="row">
                                <div className="col title4"><h4><b>Shopping Cart</b></h4></div>
                                <div className="col align-self-center text-right " style={{ color: "white" }}>{cartItem?cartItem.length:"0"} items</div>
                            </div>
                        </div>

                        {cartItem&& cartItem.length!=0?cartItem.map((elem) => {
                            const { name, price, description, _id ,quantity} = elem;
                            return <div className="row border-top border-bottom" key={_id}>
                                <div className="row main1 align-items-center">
                                    <div className="col-2">
                                        <img className="img-fluid img" src={`https://glorious-hat-toad.cyclic.app/api/v1/product/product-photo/${_id}`} /></div>
                                    <div className="col">
                                        <div className="row ">{name}</div>
                                        <div className="row sidebar" style={{ width: "140px", overflow: "scroll" }}>{description}</div>
                                    </div>
                                    <div className="col">
                                        {/* <a className='anchor' href="#">-</a><a href="#" className="border anchor">1</a><a className='anchor' href="#">+</a> */}
                                        <div>
                                            <HiMinusCircle className='icn6'  onClick={()=>decreaseQty(_id)} />
                                            <span  className='inp4'>{quantity}</span>
                                            <HiPlusCircle className='icn6'  onClick={()=>increaseQty(_id)}/>                                   </div>
                                    </div>
                                    <div className="col"><FormatPrice price={price*quantity}></FormatPrice><span className="close "><IoTrashBin     className='icn7' onClick={() => deletecartItem(_id)} /></span></div>
                                </div>
                            </div>

                        }):<h2  className='title1' style={{textAlign:"center",color:"black"}}>Cart is empty</h2>}



                        <NavLink to="/allproducts" style={{textDecoration:"none"}}><div className="back-to-shop"><IoArrowBackCircle className='icn3' /><span className="text1">Back to Art Products</span></div></NavLink>
                    </div>
                    <div className="col-md-4 summary">
                        <div><h5 className='h5'><b style={{ color: "white" }}>Summary</b></h5></div>
                        <hr style={{ width: "300px" }} className='hr' />
                        <div className="row">
                            <div className="col" style={{ color: "wheat" }}>ITEMS {cartItem?cartItem.length:"0"}</div>
                            <div className="col text-right" style={{ color: "wheat" }}><FormatPrice price={totalPrice}></FormatPrice></div>
                        </div>
                        <br />
                        <form className='form' >
                            <p style={{ color: "white" }}>SHIPPING</p>
                            <select className='select' onChange={handleShip} value={shipment.shipmethod} name='shipmethod'>
                            <option className="text-muted"   value="5" >Standard-Delivery- 5.00</option>
                            <option className="text-muted"  value="100" >Fast-Delivery- 100.00</option>
                            <option className="text-muted"  value="500" >Super-Fast-Delivery- 500.00</option>
                            </select>
                            {/* <p style={{color:"white"}}>GIVE CODE</p>
                        <input id="code" className='input1' placeholder="Enter your code"/> */}
                        </form>
                        <div className="row" >
                            <div className="col" style={{ color: "white" }}>TOTAL PRICE</div>
                            <div className="col text-right" style={{ color: "white" }}><FormatPrice price={shipment.shipmethod?parseInt(totalOrderPrice)+parseInt(shipment.shipmethod):totalOrderPrice+5}></FormatPrice></div>
                        </div>
                        <button className="btn6">CHECKOUT</button>
                    </div>
                </div>

            </div>

        {/* <Product1 title={"More Products to buy"}></Product1> */}
        </>
    )
}

export default Cart