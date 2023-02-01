import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [user, setUser] = useState({ uname: '', email: '', password: '' })
    const navigate = useNavigate()


    const handleChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }

    const handleSubmit = async () => {

        if (!user.uname && !user.email && !user.password) {
            alert('kindly fill out the required fields')
        }
        try {
            await axios.post(process.env.REACT_APP_SERVER_URL + '/user/signup', {
                name: user.uname,
                email: user.email,
                password: user.password
            })

        } catch (error) {
            console.log(error);
        }
        navigate('/signin')
    }

    return (
        <div>
            <div className='container'>
                <div className='site--heading mt-5'>
                    <h3 className='text-center'>SignUp Form</h3>
                </div>
                <div className='form--wrapper w-75 m-auto'>
                    <div className="form-group mt-5">
                        <input type="text" className="form-control mb-4" onChange={handleChange} name="uname" value={user.uname} aria-describedby="helpId" placeholder="Full Name" />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control mb-4" onChange={handleChange} name="email" value={user.email} aria-describedby="helpId" placeholder="Email" />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control mb-4" onChange={handleChange} name="password" value={user.password} aria-describedby="helpId" placeholder="Password" />
                    </div>

                    <div className='submit-wrapper text-end'>
                        <button className='btn btn-secondary' onClick={handleSubmit}>SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp