import React, { useState } from 'react'
import '../css/Team.css'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../components/Auth'
import Loader from '../components/Loader'

const Team = () => {
    const {team} =useAuth()
    console.log(team)

    const yash = team[0];
    const shray = team[1];
    const geeta = team[2];
    const sandeep = team[3];


  return (
    <>
    {/* <Navbar></Navbar> */}
    {team[0]?
    <div className='aboutdiv'>
     <div className="profile_heading"><span className='span'></span>Meet the Team </div>
    <NavLink to='/'>
     <button className='btn4' style={{right:"50px", position:"absolute" ,top:"30px" }}>GO HOME</button>
    </NavLink>
    <div className="profile_con">
      <span  className="profile_con_circle span">Our Team</span>
        <div className="profile_con_div1">
        {/* {team.map((elem)=>{ */}
                {/* const {name,about,facebook,github,google,linkedin,_id,instagram} = elem */}
              <div>
                <span className='span' style={{color:"white"}}>{yash.name}</span>
                <span className='span' style={{color:"white"}}>{yash.about}</span>
                <span className='span'></span>
               
                <ul className="profile_media1 ul">
                    <li className='li'><a className='anc' target='_blank' href={yash.facebook}><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={yash.github}><i className="fab fa-github" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={yash.google}><i className="fab fa-google-plus-g" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={yash.linkedin}><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={yash.instagram}><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                <div className="profile_serial">01</div>
                <img src={`https://artgallerycomplete.onrender.com/team/team-photo/${yash._id}`} alt="error" className='im'/>
            </div>
            
            <div>
                <span className='span' style={{color:"white"}}>{shray.name}</span>
                <span className='span' style={{color:"white"}}>{shray.about}</span>
                <span className='span'></span>
                <img src={`https://artgallerycomplete.onrender.com/team/team-photo/${shray._id}`} alt="error" className='im'/>
                <div className="profile_serial">03</div>
                <ul className="profile_media2 ul">
                    <li className='li'><a className='anc' target='_blank' href={shray.facebook}><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={shray.github}><i className="fab fa-github" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={shray.google}><i className="fab fa-google-plus-g" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={shray.linkedin}><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={shray.instagram}><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
            </div>
        </div>
        <div className="profile_con_div2">
            <div>
                <span className='span' style={{color:"white"}}>{geeta.name}</span>
                <span className='span' style={{color:"white"}}>{geeta.about}</span>
                <ul className="profile_media3 ul">
                    <li className='li'><a className='anc' target='_blank' href={geeta.facebook}><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={geeta.github}><i className="fab fa-github" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={geeta.google}><i className="fab fa-google-plus-g" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={geeta.linkedin}><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={geeta.instagram}><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                <span className='span'></span>
                <div className="profile_serial">02</div>
                <img src={`https://artgallerycomplete.onrender.com/team/team-photo/${geeta._id}`}alt="error" className='im'/>
            </div>
            <div>
                <span className='span' style={{color:"white"}}>{sandeep.name}</span>
                <span className='span' style={{color:"white"}}>{sandeep.about}</span>
                <ul className="profile_media4 ul">
                    <li className='li'><a className='anc' target='_blank' href={sandeep.facebook}><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={sandeep.github}><i className="fab fa-github" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={sandeep.google}><i className="fab fa-google-plus-g" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={sandeep.linkedin}><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                    <li className='li'><a className='anc' target='_blank' href={sandeep.instagram}><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                <span className='span'></span>
                <img src={`https://artgallerycomplete.onrender.com/team/team-photo/${sandeep._id}`} alt="error" className='im'/>
                <div className="profile_serial">04</div>
            </div>
        </div>

    </div>
    </div>
    :<><Loader></Loader>
                    </>}
    </>
  )
}

export default Team