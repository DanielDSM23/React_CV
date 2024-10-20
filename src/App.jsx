import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Logout from './pages/Logout.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import Cv from './pages/Cv.jsx'
import AllCv from './pages/AllCv.jsx'
import MyCv from './pages/MyCv.jsx'
import ProfileEditor from './pages/ProfileEditor.jsx'
import XpEditor from './pages/XpEditor.jsx'
import EduEditor from './pages/EduEditor.jsx'

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
        <Route path="/users" element={<Login />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cv" element={<AllCv />} />
        <Route path="/cv/:id" element={<Cv />} />
        <Route path="/my-cv" element={<MyCv />} />
        <Route path="/my-cv/profession/edit/:id" element={<XpEditor methodRequest={"PUT"} textButton={"Modifier"} />} />
        <Route path="/my-cv/education/edit/:id" element={<EduEditor methodRequest={"PUT"} textButton={"Modifier"} />} />
        <Route path="/my-cv/profession/add" element={<XpEditor methodRequest={"POST"} textButton={"Ajouter"} />} />
        <Route path="/my-cv/education/add" element={<EduEditor methodRequest={"POST"} textButton={"Ajouter"} />} />
        <Route path="/profile" element={<ProfileEditor />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  )
}

export default App
