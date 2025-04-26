// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { useUserContext } from '../context/UserContext';
import { RegistrationForm } from '../auth/RegistrationPage';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  //const { user } = useUserContext();
  const [showAddUserForm, setShowAddUserForm] = useState(false);


  useEffect(() => {

    fetchUsers();
  }, [showAddUserForm]);

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('token');
      console.log("User registered token:", token);
      const response = await UserService.getAllUsers(token);

      setUsers(response.accountUsersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);

        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  if (!users || users.length === 0) {
    return <div>loading...</div>;
  }
  return (


    <div className="user-management-container">

      {showAddUserForm && <div className='modal-add-user'>
        <div className="auth-container">
          <RegistrationForm title="Add User" succesfullAction={()=>{   alert('User added successfully'); setShowAddUserForm(false)}} />
        </div>
      </div>}



      <h2>Users Management Page</h2>
      <button onClick={() => setShowAddUserForm(true)} className='reg-button'> Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                <button><Link to={`/update-user/${user.id}`}>
                  Update
                </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;