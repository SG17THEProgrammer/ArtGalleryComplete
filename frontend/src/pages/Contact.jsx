import React, { useState } from 'react'
import '../css/Contact.css'
import Navbar from '../components/Navbar'
import {  Comment } from 'react-loader-spinner'
import axios from 'axios'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Authorize from '../components/Authorize'
const Contact = () => {

    const [contactData, setcontactData] = useState(true)
    const [isLoading,setIsLoading]= useState(false)

    const { isLoggedIn ,user } = useAuth()
    // console.log(user)

    const [contact , setContact] = useState({
        name:"",
        subject:"",
        message:"",
        email:""
    })

    if (contactData && user) {
        setContact({
            name: user.name,
            email: user.email,
        });
        setcontactData(false);  
    }

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };

        const token = localStorage.getItem('token');
        
    const handleSubmit = async (e) => {
        e.preventDefault();
                try {
                    setIsLoading(true)
          const response = await fetch('https://glorious-hat-toad.cyclic.app/api/v1/contact', {
            method: 'POST',
            headers: {
                Authorization:token,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(contact)        
          });
          if(response.ok){

              toast.success("Message sent successfully")
              setContact("")
              setIsLoading(false)
          }
          else{
            toast.error("Couldn't sent the message ")
            console.log("Error")
            setIsLoading(false)

          }
      
        } catch (error) {
          console.error('Api Not found');
          setIsLoading(false)

        }
      }


    return (
        <>
            {isLoggedIn?<><Navbar></Navbar>
            <div className='maindiv'>

                <div className="talk">
                    <p>Let's talk about everything!  &nbsp; <Comment
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="comment-loading"
                        // wrapperStyle={{}}
                        wrapperclassName="comment-wrapper"
                        color="#fff"
                        backgroundColor="#F4442E"
                    /></p>
                    
                </div>

                <div className="mid-left">
                    <div>Start your Conversation with us! Here you can know your idea.</div>

                    <img src="images/contact.jpg" alt="error" />
                </div>


                <div className="container container2">
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name"></label>
                            <input type="text" id="name" placeholder="Name" required  onChange={handleInput}  name="name" value={contact.name}/>
                            <label htmlFor="email"></label>
                            <input type="email" id="email" name="email" placeholder="E-mail" required  onChange={handleInput}   value={contact.email}/>
                            <label htmlFor="subject"></label>
                            <input type="text" id="subject" name="subject" placeholder="Subject" required  onChange={handleInput} value={contact.subject} />
                            <label htmlFor="message"></label>
                            <textarea id="message" name="message" rows="4" placeholder="Your message here" required  onChange={handleInput}  value={contact.message}></textarea>
                            <input type="submit" value="Send Message" />
                        </form>
                    </div>
                </div>
            </div></>:<Authorize></Authorize>}
            {isLoading && <Loader></Loader>
                    }                   

        </>
    )
}

export default Contact