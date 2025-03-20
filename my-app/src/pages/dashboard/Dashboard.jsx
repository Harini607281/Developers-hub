/*  import React, { useEffect,useState } from 'react'
import './dashboard.scss'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const[data,setData]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/allprofiles',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=>setData(res.data))
  },[])
  if(!localStorage.getItem('token')){
    return <Navigate to='/login'/>
  }
  return (
    <div className='dashboard'>
      <div className='navbar'>
         <div className='left'>
          Dev.Connect
         </div>
         <div className='right'>
         <div className='prof'>My Profile</div>
         <div className='button'><Link to='/login' onClick={()=>{localStorage.removeItem('token')}} style={{"color":"white","textDecoration":"none"}}>Log out</Link></div>
         </div>
      </div>
      <h1 style={{"textAlign":"center"}}> Active Developers</h1>
      <div className='profile'>
       <div className="container">
       <div className='userprofile'><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/></div>
        <div className='peru'>Harini</div>
        <div className='mail'>harni@gmail.com</div>
        <div className="country">India</div>
        <div className='skills'>c,python,java,mernstack
        </div>
        <button>View Profile</button>
        <div></div>
       </div>
      </div>
    
    </div>
  )
}

export default Dashboard
  */
import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

 
    axios
      .get('http://localhost:5000/allprofiles', {
        headers: {
          'x-token': token,
        },
      })
      .then((res) => {
        setData(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profiles:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token'); 
          setIsLoggedIn(false);
        }
        setLoading(false); 
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="navbar">
        <div className="left">Dev.Connect</div>
        <div className="right">
         <Link to='/myprofile' style={{"color":"white"}}> <div className="prof">My Profile</div></Link>
          <div className="button">
            <Link to="/" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none' }}>
              Log out
            </Link>
          </div>
        </div>
      </div>
      <h1 style={{ textAlign: 'center' }}>Active Developers</h1>
      <div className="profile">
        {data.length > 0 ? (
          data.map((profile, index) => (
            <div className="container" key={index}>
              <div className="userprofile">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  alt="Profile"
                />
              </div>
              <div className="peru"><b>Name:</b>:{profile.fullname || 'Unknown'}</div>
              <div className="mail"><b>Email:</b>{profile.email || 'No email provided'}</div>
              <div className="country"><b>Country:</b>:India</div>
              <div className="skills"><b>Skills:</b>:{profile.skill || 'No skills listed'}</div>
             <Link to={`/user/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`}> {/*query params*/}
             <button>View Profile</button>
             </Link>
            </div>
          ))
        ) : (
          <p>No profiles available.</p>
        )}
      </div>
      <div className="footer">
        <div>
          Made for Developers &copy;
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
