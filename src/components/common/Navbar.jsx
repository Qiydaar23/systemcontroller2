import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { useUserContext } from '../context/UserContext';
function Navbar() {
    const { isAuthenticated, isAdmin, user, logout } = useUserContext();
   // const isAuthenticated = UserService.isAuthenticated();
   // const isAdmin = UserService.isAdmin();
   console.log(isAuthenticated)
   console.log(user)
    console.log(isAdmin)



    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
                logout();
        }
    };


    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">System Control Management</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;