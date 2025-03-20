/* import React, { useState } from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
function Register() {
  const[data,setData]=useState({
    fullname:'',
    email:'',
    mobile:'',
    skill:'',
    password:'',
    confirmpassword:'',
    })
    const onChangehandler=(e)=>{
      setData({...data,[e.target.name]:e.target.value});
    }
    const submitHandler=(e)=>{
      e.preventDefault();
      console.log(data);
    }
  return (
    <div className='register'>
     <div className='card'>
     <div className='left'>
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder='full name' name="fullname" onChange={onChangehandler} />
          <input type="email" placeholder='Email' name="email" onChange={onChangehandler}/>
          <input type="text" placeholder='phone number'name="mobile" onChange={onChangehandler}/>
          <input type="text" placeholder='Skills' name="skill" onChange={onChangehandler}/>
          <input type="password" placeholder='password' name="passsword" onChange={onChangehandler}/>
          <input type="text" placeholder='confirmpassword' name="confirmpassword" onChange={onChangehandler}/>
          
          <button type="submit">Register</button>
          
        </form>
      </div>
      <div className='right'>
       <h1>We <br/>
        Connect.</h1>
       <p> Welcome Here! To connect with Developers, share your Skills,
       and discover a world of exciting Developers.</p>
       <span>Do you have an account?</span>
       <Link to="/login"><button>Login</button></Link>
      </div>
     
     </div>
    
    </div>
  )
}

export default Register
 */
import React, { useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    skill: '',
    password: '',
    confirmpassword: '',
  });

  const navigate = useNavigate(); // Hook for navigation

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (data.password !== data.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/register', data);

      if (response.status === 200) {
        alert("Registration successful!");
        console.log(response.data);

        // Navigate to the login page
        navigate('/login');
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please check the console for details.");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Full Name" name="fullname" onChange={onChangeHandler} />
            <input type="email" placeholder="Email" name="email" onChange={onChangeHandler} />
            <input type="text" placeholder="Phone Number" name="mobile" onChange={onChangeHandler} />
            <input type="text" placeholder="Skills" name="skill" onChange={onChangeHandler} />
            <input type="password" placeholder="Password" name="password" onChange={onChangeHandler} />
            <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={onChangeHandler} />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="right">
          <h1>We <br /> Connect.</h1>
          <p>
            Welcome Here! To connect with Developers, share your Skills,
            and discover a world of exciting Developers.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
