import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';


export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  logout();

  localStorage.removeItem('user');

  navigate('/');
}