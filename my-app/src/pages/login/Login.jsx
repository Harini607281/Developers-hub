/* import React, { useContext, useState } from 'react'
import './login.scss';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [auth,setAuth]=useState(false)
  const[data,setData]=useState({
    email:'',
    password:'',
  })
  const changeHandle=e=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler=e=>{
    e.preventDefault();
    axios.post('http://localhost:5000/login',data).then(
      res=>{localStorage.setItem('token',res.data.token);setAuth(true)}
    )
    
  }
  if(setAuth){
    return <Navigate to='/dashboard'/>
    
  }
  return (
     <div className='login'>
     <div className='card'>
      <div className='left'>
       <h1>Hello <br/>
        world.</h1>
       <p> Welcome Here! To connect with Developers, share your skills,
       and discover a world of exciting softwares.</p>
       <span>Don't you have an account?</span>
       <Link to="/register"><button>Reigister</button></Link>
      </div>
      <div className='right'>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder='Enter email' name="email" onChange={changeHandle}/>
          <input type="text" placeholder='password' name="password" onChange={changeHandle}/>
         <button>Login</button>
        </form>
      </div>
     </div>
    </div>
  )
}

export default Login
 */
import React, { useState } from 'react';
import './login.scss';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [auth, setAuth] = useState(false); // Track authentication status
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const changeHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuth(true); // Set auth to true to trigger navigation
        setData({ email: '', password: '' }); // Clear form fields
      })
      .catch((err) => {
        console.error('Login failed:', err);
        alert('Invalid email or password'); // Notify the user of login failure
      });
  };

  // Redirect to dashboard after successful login
  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>
            Hello <br />
            world.
          </h1>
          <p>
            Welcome Here! To connect with Developers, share your skills, and discover a world of
            exciting software.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={changeHandle}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={changeHandle}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
