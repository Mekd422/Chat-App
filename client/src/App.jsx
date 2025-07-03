import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'
import {Toaster} from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext'


export const App = () => {
  const {authuser} = useContext(AuthContext)
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] bg-contain'>
      <Toaster/>
      <Routes>
        <Route path="/" element = {authuser ? <HomePage/>: <Navigate to="/login" />}/>
        <Route path="/login" element = {!authuser ? <LoginPage/>: <Navigate to="/" />}/>
        <Route path="/profile" element = {authuser ? <ProfilePage/>: <Navigate to="/login" />}/>
      </Routes>
    </div>
  )
}
