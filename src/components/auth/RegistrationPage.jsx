import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function RegistrationPage() {

    const navigate = useNavigate();


    return (
        <div className="auth-container">
            <RegistrationForm title="Registration" succesfullAction={() => { alert('User registered successfully'); navigate("/login") }} />

            <br />
            <p className=''>Have an account? Login</p>
            <button type="button" onClick={() => navigate('/login')}>Login</button>

        </div>
    );
}



export const RegistrationForm = ({ title = "Registration", succesfullAction = () => { } }) => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const token = localStorage.getItem('token');


            if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.city) {
                alert('Please fill in all fields.');
                return;
            }
            console.log("User registered token:", token);
            await UserService.register(formData, token);



            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                city: ''
            });

            succesfullAction();

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <>
            <h2 className='reg'>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Role:(ADMIN or USER)</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required />
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter your city" required />
                </div>
                <button type="submit">Register</button>
                <br />

            </form>
        </>
    );
}

export default RegistrationPage;