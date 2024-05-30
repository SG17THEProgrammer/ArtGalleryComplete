import React, { useState } from 'react'
import "../css/Edit.css"
import Navbar from './Navbar'
import { useAuth } from './Auth'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios  from 'axios'
import { TbPhotoPlus } from 'react-icons/tb'
import Loader from '../components/Loader'

const Edit = () => {
    const { products } = useAuth()
    const { backendApi } = useAuth()
    const { id } = useParams();
    console.log(id)

    console.log(products)
    const productDisplay = products.filter((elem) => elem._id === id)[0];
    console.log(productDisplay)

    const [isLoading,setIsLoading]=useState(false)
    const [productData, setProductData] = useState(true)
    const [cardProduct, setcardProduct] = useState({
        name: "",
        description: "",
        price: "",
    })

    if (productData && products) {
        setcardProduct({
            name: productDisplay.name,
            description: productDisplay.description,
            price: productDisplay.price,
            // photo: products.photo,
        });
        setProductData(false);
    }

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setcardProduct({
            ...cardProduct,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };
    const token = localStorage.getItem('token');

    const [photo, setPhoto] = useState("");

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
          let newForm = new FormData();
          newForm.append("name", cardProduct.name);
          newForm.append("description", cardProduct.description);
          newForm.append("price", cardProduct.price);
          photo && newForm.append("photo", photo);
          for (var key of newForm.entries()) {
            console.log(key[0] + ", " + key[1]);
          }
          const res = await axios.put(
            `${backendApi}/product/update-product/${id}`,
            newForm
          );
          console.log(res)
          toast.success("Successfully Updated")
                      setIsLoading(false)

        } catch (error) {
            
            console.log(error);
            toast.error("something went wrong");
            setIsLoading(false)
        }
      };

    return (
        <>
            <Navbar></Navbar>
            {isLoading?<Loader></Loader>:""}
            <div>
                <div className="container container3">
                <div>
                    <NavLink to={`/menu/${id}`}>
                    <div className="container-close">&times;</div>
                    </NavLink>
                    {/* <img
                        src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        alt="image" className='img10' /> */}
                        {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="error"
                  className="img10"
                />
            ) : (
                <img
                        src={`https://artgallerycomplete.onrender.com/product/product-photo/${productDisplay._id}`}
                        alt="image" className='img10' />
            )}
            <label htmlFor='file' className='label2'>
            <TbPhotoPlus className='icn8'  htmlFor='file' style={{ color: "black" }} />
            
            Upload </label>
                            <input type='file' id='file' className='input' name='file' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}></input>

</div>
                    <div className="container-text">
                        <h2 style={{ textDecoration: "underline" , color:"white"}}>Edit Product</h2>
                        <label className='label1'  >Enter Name</label>
                        <input type="text" placeholder="Name" onChange={handleInput} name='name' value={cardProduct.name} />
                        <label className='label1' >Enter Description</label>

                        <input type="text" placeholder="Description " onChange={handleInput} name='description' value={cardProduct.description} />
                        <label className='label1' >Enter Price</label>

                        <input type="number" placeholder="Price" onChange={handleInput} name='price' value={cardProduct.price} />
          
                        <button type="submit" onClick={updateProduct}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit