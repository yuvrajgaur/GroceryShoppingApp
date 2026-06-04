//App.jsx is the body of app
//It decides what layout to show, which components appear, which page (route) is rendered


import React from 'react'
import Navbar from './components/Navbar'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategories from './pages/ProductCategories'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/Seller/SellerLogin'
import SellerLayout from './pages/Seller/SellerLayout'
import AddProduct from './pages/Seller/AddProduct'
import ProductList from './pages/Seller/ProductList'
import Orders from './pages/Seller/Orders'
import Loading from './components/Loading'
import EditProduct from './pages/Seller/EditProduct'
import EditProfile from './pages/EditProfile'

const App = () => {

  const isSellerPath=useLocation().pathname.includes("seller")  //check if current path includes 'seller'
  const {showUserLogin, isSeller}=useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null :<Navbar/>}  {/* if not in seller path, show navbar */}
      {showUserLogin?<Login/>:null}   {/* if showUserLogin is true, show login modal otherwise null */}
      <Toaster/>  {/* Toaster component for showing toast notifications, placed near the top of the app so toast notifications can appear globally across all pages */}

       {/* Main content area, add padding on sides if not in seller path */}

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}/>      
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:category' element={<ProductCategories/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/> 
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/loader' element={<Loading/>}/>
          <Route path='/seller' element={isSeller ? <SellerLayout/>: <SellerLogin/>}>
            <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path='product-list' element={<ProductList/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='edit/:id' element={<EditProduct/>} />
          </Route>
          <Route path="*" element={<p className="mt-10 text-center text-gray-500">Page not found </p>} />
        </Routes>
      </div>

      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
