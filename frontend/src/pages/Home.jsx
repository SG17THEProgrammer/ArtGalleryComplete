import React from 'react'
import Navbar from '../components/Navbar'
import '../css/Home.css'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaWpexplorer } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../components/Auth';
import Product1 from './Product1';
const Home = () => {
  const {products} = useAuth()
  console.log(products)
  return (
    <>
    <Navbar></Navbar>
    <div className="topdiv">
    <div className="leftdiv">
    <h1 style={{color:"orange"}}>Art Gallery</h1>
    <h5 style={{color:"orange"}}>transporting souls to a world of creativity</h5>
    <pre style={{color:"orange"}}>______</pre>
<p style={{color:"white"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, sapiente quae! Dicta, reprehenderit odio quis suscipit iusto a cumque numquam quia, sed magnam quo expedita tenetur, quos dolores quidem possimus?</p>

<NavLink to='/allproducts' style={{cursor:"pointer"}}>
<button className='btn1'>
<span>
<FaWpexplorer  style={{margin:"-1px 0 0 4px" , cursor:"pointer"}} />
</span>
<span className='text' style={{cursor:"pointer"}}>Explore The Art Now  &nbsp;<FaArrowRightLong style={{marginBottom:"1px" , marginRight:"5px"}}></FaArrowRightLong></span>
</button>
</NavLink>
    </div>
    <div className="rightdiv">
      <img src="https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="error" className='img4' />
    </div>
    </div>




<h1 className='title2'>Top Arts</h1>
<div className='bottomdiv'>
<div className='border'>
<div className='leftbottomdiv'>
        <img src="images/landscape.avif" alt="error" className='img1' />
      </div>
      <div className="bottomrightdiv">
        <img src="images/landscape1.avif" alt="error" className='img2' />
        <img src="images/design.avif" alt="error" className='img3' />
      </div>
</div>    

<div className='rightbottomdiv'>
    <div className="rightLeft">
    <img src="images/village.avif" alt="error"  className='img5' style={{marginLeft:"auto" , marginRight:"30px"}}/>
    <img src="images/weather.avif" alt="error"  className='img7' style={{ margin:"20px 30px 0 auto" , marginLeft:"auto"}} />
    </div>
    <div className="rightRight">
    <img src="images/paintbrushes.avif" alt="error" className='img7' />
    <img src="images/mona lisa.avif" alt="error"  className='img5' style={{marginTop:"20px"}}/>
    </div>
</div>


</div>
      <Product1 title={"All Products"}></Product1>
      <Footer></Footer>

    </>
  )
}

export default Home