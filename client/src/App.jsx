import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/profile" element = {<ProfilePage/>}/>
      </Routes>
    </div>
  )
}
