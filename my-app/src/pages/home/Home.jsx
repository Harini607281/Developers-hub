import React, { useEffect, useState } from 'react'
import './home.scss'
import { Link } from 'react-router-dom'


const Home = () => {
  const[scrolled,setscrolled]=useState(false);
  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])
  return (
    <div className='home'>
     <div className='front'>
      <div className='nava'>
       <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
         <div className='left'>
           <div className='logo'>Dev.Connect</div>
           <div className='leftleft'>
              <div>Freelance</div>
              <div>Enterprice</div>
              <div>Services</div>
           </div>
         </div>
         <div className='right'>
         <button className='righta'>Explore</button>
         <Link to='/login'><button className='rightb' title="Login to find developers">Login</button></Link> 
         <Link to='/register'><button className='rightc' title="Signup to find the developers">Signup</button></Link> 
         </div>
       </div>
       </div>
       
      
      
       <div className='quotes'>
       We are the global services<br/> provider for your external<br/> workforce
       </div>
       </div>

       
       
       
       
       
       <div className='body'>
       <div className='bodya'>
       Great software starts with <br/>great developers<br/>
       --find the minds that turn<br/> ideas into innovation.
       </div>
       <div className='bodyb'>
        <img src="https://en.freelance.com/wp-content/uploads/2021/05/Fichier-31.svg" alt=""/>
       </div>

       </div>
       <div className='footer'>
        Made for developers &copy;

       </div>
    </div>
  )
}

export default Home
