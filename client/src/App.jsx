import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Otp from './pages/Otp'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Headers from './components/Headers'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <Headers/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={ <Dashboard/>}/>
      <Route path="/user/otp" element={<Otp/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App