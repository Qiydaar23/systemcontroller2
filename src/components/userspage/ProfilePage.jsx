import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import {useNavigate} from 'react-router-dom'



function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const { isAuthenticated , isAdmin} = useUserContext();
    const navigate = useNavigate();

    const handleClick1 = () => {
        if (isAuthenticated) {
            navigate('/tictactoe');
        } else {
            alert('Please login to play the game.');
        }
    }
    const handleClick2 = () => {
        if (isAuthenticated) {
            navigate('/buttongame');
        } else {
            alert('Please login to play the game.');
        }
    }

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            console.log(response)

            setProfileInfo(response.accountUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <>
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>City: {profileInfo.city}</p>
            {isAdmin && (
                <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>
            )}

        </div>
        <div className="profile-page-container">
            <h2>Games</h2>
            <p>Game 1: Tic Tac Toe</p>
            <button onClick={handleClick1}>Play</button>
        </div>
        <div className="profile-page-container">
            <h2>Games</h2>
            <p>Game 2: Catch The Button</p>
            <button onClick={handleClick2}>Play</button>
        </div>
        </>
    );
}

export default ProfilePage;