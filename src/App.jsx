import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome.jsx'
import Count from './pages/Count.jsx'
import Header from './components/Header.jsx'
import Users from './pages/Users.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Logout from './pages/Logout.jsx'

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/counter" element={<Count />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  )
}

export default App
