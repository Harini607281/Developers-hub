/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

import './myprofile.scss'
const Myprofile = () => {
  const{data,setData}=useState([]);
  useEffect(()=>{
     axios.get('http//localhost:5000/myprofile',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
     }).then(res=>setData(res.data))
  },[])
  if(!localStorage.getItem('token')){
    return <Navigate to='/login'/>
  }
  return (
    <div className='myprof'>
      <div className='navbar'>
        <h2>My Profile</h2>
        <button className='logging'>Log Out</button>
      </div>
      <div className='profi'>
        <div className='image'>
         <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' alt='profile'/>
         </div>
         <div className='details'>
              <div><b>Name:</b></div>
              <div><b>Country:</b></div>
              <div><b>Email:</b></div>
              <div><b>Skills:</b></div>
            </div>
         <div className='ratings'>
            <div className='disrating'>
              <b>Ratings:</b>4/5

            </div>
        </div>
        <div className='giveratings'>
          <label>Ratings:</label>
            <input type='text' placeholder='Give Ratings out of 5'/>
            </div>
        </div>
        
    </div>
  )
}

export default Myprofile
 */
import React, { useEffect, useState } from 'react';
import './myprofile.scss';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

const Myprofile = () => {
  const [data, setData] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true); 
  const[review,setReview]=useState([]);
  const[rating,setratings]=useState({
    taskworker:'',
    ratings:'',
  })
  const submitHandler=(e)=>{
      e.preventDefault();
      console.log(rating);
  }
  const onChangeHandler=(e)=>{
    setratings({...rating,[e.target.name]:e.target.value})
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

 
    axios
      .get('http://localhost:5000/myprofile', {
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
  useEffect(()=>{
    axios.get('http://localhost:5000/myreview',{
      headers:{
        'x-token':localStorage.getItem('token'),
      }
    })
    .then((res) => {
      setReview(res.data); 
    
    })
  },[])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='myprof'>
    <div className='navbar'>
      <Link to='/dashboard' style={{"color":"white"}}><h2>Back to Profiles</h2></Link>
      <Link to='/' onClick={()=>{localStorage.removeItem('token')}} ><button className='logging'>Log Out</button></Link>
    </div>
    {data &&    
    <div className='profi'>
      <div className='image'>
       <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' alt='profile'/>
       </div>
       <div className='details'>
            <div><b>Name:</b> {data.fullname}</div>
            <div><b>Country:</b> India</div>
            <div><b>Email:</b> {data.email}</div>
            <div><b>Skills:</b> {data.skill}</div>
          </div>
       <div className='ratings'>
        <h2>Ratings:</h2>
          <div className='disrating' style={{"background":"transparent","border":"none"}}>
            {
              review && 
              review.map(review => (
                <React.Fragment key={review.id}> {/* Use React.Fragment or shorthand <>...</> */}
                  <div><b>Task Provider</b>: {review.taskprovider}</div>
                  <div><b>Rating</b>: {review.rating}/5</div>
                </React.Fragment>
              ))
              
            }
            

          </div>
      </div>
      </div> 
      }

      
  </div>
  );
};

export default Myprofile;
