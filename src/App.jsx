// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage'
import { useUserContext } from './components/context/UserContext';
import TicTacToe from './components/game1/TicTacToe';
import CatchTheButton from './components/game2/CatchTheButton';





function App() {
  const  {isAuthenticated, isAdmin} = useUserContext();

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/buttongame" element={<CatchTheButton />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {isAdmin && isAuthenticated && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />

              </>
            )}

          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;