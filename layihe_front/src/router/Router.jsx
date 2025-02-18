import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Account from '../pages/account/Account'
import Detail from '../pages/account/components/detail/Detail'
import Man from '../pages/man/Man'
import Collection from '../components/collection/Collection'
import Woman from '../pages/woman/Woman'
import Favori from '../pages/wishlist/Favori'
import Detailpro from '../pages/detail/Detailpro'
import Basket from '../pages/basket/Basket'
import About from '../pages/about/About'
import Checkout from '../pages/checkout/Checkout'
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
        <Route path='/woman' element={<Woman />} />
        <Route path='/category/:name' element={<Collection />} />
        <Route path='/category/:name/:category' element={<Collection />} />
        <Route path='/wishlist' element={<Favori />} />
        <Route path='/category/:name/detail-collection' element={<Detailpro />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/about' element={<About />} />
        <Route path='/checkout/:orderId' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router