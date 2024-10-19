import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome.jsx'
import Count from './pages/Count.jsx'
import Header from './components/Header.jsx'
import Users from './pages/Users.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Logout from './pages/Logout.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import Cv from './pages/Cv.jsx'
import AllCv from './pages/AllCv.jsx'

function App() {
  return (
    <>
      <Header />
      <nav>
        <Link to="/cv">All CVs</Link>
        <Link to="/cv/670d8775300708da3bb40fcc">View CV</Link>
      </nav>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/users" element={<Login />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cv" element={<AllCv />} />
        <Route path="/cv/:id" element={<Cv />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  )
}

export default App
