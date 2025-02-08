import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Account from '../pages/account/Account'
import Detail from '../pages/account/components/detail/Detail'
import Man from '../pages/man/Man'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/man' element={<Man />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router