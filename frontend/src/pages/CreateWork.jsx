import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/CreateWork.css'
import { TbPhotoPlus } from "react-icons/tb";
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { MdDeleteForever } from "react-icons/md";
import Product from './Product';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';
import { useAuth } from '../components/Auth';
import Authorize from '../components/Authorize';
const CreateWork = () => {
    const {isLoggedIn} = useAuth();
    console.log(isLoggedIn)

    const [photo, setPhoto] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [work, setWork] = useState({
        name: "",
        description: "",
        price: "",
    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setWork({
            ...work,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };
    const token = localStorage.getItem("token");
    // console.log(token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            let newForm = new FormData();
            newForm.append("name", work.name);
            newForm.append("description", work.description);
            newForm.append("price", work.price);
            photo && newForm.append("photo", photo);
            for (var key of newForm.entries()) {
                console.log(key[0] + ", " + key[1]);
            }
            const res = await axios.post(
                `https://glorious-hat-toad.cyclic.app/api/v1/product/create-product`,
                newForm, {
                headers: {
                    Authorization: token
                }
            }
            );
            console.log(res)
            setWork({
                name: "",
                description: "",
                price: "",
                photo: "",
            })
            toast.success(res.data.message)
            setIsLoading(false)

        } catch (error) {

            toast.error(error.response.data.message);
            setIsLoading(false)
        }
    };
   


    return (
        <>
{   isLoggedIn?<><Navbar></Navbar>
            <h1 className='name3' style={{color:"wheat" , margin:"30px 0 30px 40px" , textDecoration:"underline"}}>Publish Your Art</h1>
            <div className="upperdiv" >
                <div className='imageDiv'>
                    <div className="topimageDiv">
                        <h5 style={{ color: "white" }}>Add photo of your work</h5>
                        <div className="imagebox">
                                {photo?<MdDeleteForever className='icn5' onClick={()=>setPhoto("")}></MdDeleteForever>:""}
                            <div className="labelDiv ">
                                {photo ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="error"
                                            className="img8"
                                        />
                                        <div className='upload'>

                                            <input type="file" style={{ display: "none" }} accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} id='photo' name='photo' />
                                            <label htmlFor="photo" style={{ cursor: "pointer" }}>
                                                <TbPhotoPlus className='icn4' />
                                                <p style={{ color: "black", fontWeight: "bolder" }}>Upload Your photo</p>

                                            </label>
                                        </div>
                                    </>
                                ) : <>

                                    <input type="file" style={{ display: "none" }} accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} id='photo' name='photo' />
                                    <label htmlFor="photo" style={{ cursor: "pointer" }} className='inp1'>
                                        <TbPhotoPlus className='icn4' style={{ color: "white" }} />
                                        <p style={{ color: "white" }}>Upload Your photo</p>

                                    </label>
                                </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className='detailDiv'>
                    <h5 style={{ color: "white" }}>Title</h5>
                    <input type="text" placeholder=' Enter name of your art' className='inp3' onChange={handleInput} name='name' /><br />
                    <h5 style={{ color: "white" }}>Description</h5>
                    <textarea type="text" placeholder=' Enter description of your art' className='textarea' onChange={handleInput} name='description' /><br />
                    <h5 style={{ color: "white" }}>Price</h5>
                    <input type="number" placeholder=' Enter Price of your art' className='inp3' name='price' onChange={handleInput} />
                    {isLoading ? <button className='btn3' onClick={handleSubmit}>Publishing Your Work....</button> :

                        <button className='btn3' onClick={handleSubmit}>Publish Your Work</button>}
                    {isLoading && <Loader></Loader>
                    }
                    
                </div>

            </div></>:<Authorize></Authorize>}
        </>
    )
}

export default CreateWork