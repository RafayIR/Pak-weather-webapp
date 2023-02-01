import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [logInUser, setLogInUser] = useState({ email: '', password: '' })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInUser({ ...logInUser, [name]: value })
  }

  const handleLogIn = async () => {

    if (!logInUser.email && !logInUser.password) {
      alert('please fill out all the fields')
    }

    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/user/signin',
        {
          email: logInUser.email,
          password: logInUser.password
        })

      const token = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', logInUser.email);

      navigate('/weather');

    } catch (err) {
      console.log(err);
    }


  }

  return (
    <div>
      <div className='container'>
        <div className='site--heading mt-5'>
          <h3 className='text-center'>User Log In</h3>
        </div>
        <div className='form--wrapper w-75 m-auto'>
          <div className="form-group">
            <input type="text" className="form-control mb-4" onChange={handleChange} name="email" value={logInUser.email} aria-describedby="helpId" placeholder="Email" />
          </div>

          <div className="form-group">
            <input type="password" className="form-control mb-4" onChange={handleChange} name="password" value={logInUser.password} aria-describedby="helpId" placeholder="Password" />
          </div>

          <div className='submit-wrapper text-end'>
            <button className='btn btn-secondary' onClick={() => navigate("/signup")}>SignUp</button >
            <button className='btn btn-secondary ms-2' onClick={handleLogIn}>SignIn</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn