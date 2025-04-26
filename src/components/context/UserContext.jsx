import React, {createContext, use, useContext, useEffect, useState} from 'react'
import UpdateUser from '../userspage/UpdateUser';
import UserService from '../service/UserService';

const UserContext =createContext(
    {
        user: null,
        login: () => {},
        logout: () => {},
        UpdateUser: () => {},
        deleteUser: () => {},

    }
);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            const userData = { token, role };
            setUser(userData);
        }
    }, []);


const isAuthenticated = !!user;
    const login = async (email, password) => {
       const userData= await UserService.login(email,password);
       console.log("context",userData)
       localStorage.setItem('token', userData.token)
       localStorage.setItem('role', userData.role)
       const { token, role } = userData;
         console.log(token, role)
    setUser({ token, role });
    return userData !== null; // Return true if login is successful
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };
    const isAdmin = user && user.role === 'ADMIN';
    const isUser = user && user.role === 'USER';
    const updateUser = (userId, updatedData, token) => {
        UserService.updateUser(userId, updatedData, token)
        // Logic to update user data
    };

    const deleteUser = (userId) => {
        // Logic to delete user
    };

    return (
        <UserContext.Provider value={{user, login, logout, updateUser, isAdmin, isUser, isAuthenticated, deleteUser}}>
            {children}
        </UserContext.Provider>
    );
}

 export const useUserContext = () => useContext(UserContext);
