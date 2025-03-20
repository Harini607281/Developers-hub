import React, { useState } from 'react';
import './userindiv.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Userindiv = () => {
  const { fullname, email, skill, id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState({
    taskworker: id,
    rating: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Redirecting to login.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/addreview',
        review,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,  // Send token in 'x-token' header
          },
        }
      );

      if (response.status === 201) {
        alert('Review added successfully');
        navigate('/dashboard');  // Redirect to profiles or desired page
      } else {
        alert('Failed to add review. Please check the input data.');
      }
    } catch (error) {
      console.error('Error during review submission:', error.response?.data || error.message);
      alert('Failed to submit review. Check the console for details.');
    }
  };

  const onChangeHandler = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='myprof'>
      <div className='navbar'>
        <h2>Back to Profiles</h2>
        <Link to='/login' onClick={() => { localStorage.removeItem('token'); }}>
          <button className='logging'>Log Out</button>
        </Link>
      </div>

      <div className='profi'>
        <div className='image'>
          <img
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            alt='profile'
          />
        </div>
        <div className='details'>
          <div><b>Name:</b> {fullname}</div>
          <div><b>Country:</b> India</div>
          <div><b>Email:</b> {email}</div>
          <div><b>Skills:</b> {skill}</div>
        </div>
        <div className='giveratings'>
          <form onSubmit={submitHandler}>
            <label>Ratings:</label>
            <input
              type='text'
              placeholder='Give Ratings out of 5'
              name='rating'
              value={review.rating}
              onChange={onChangeHandler}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userindiv;
