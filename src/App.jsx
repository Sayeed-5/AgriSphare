import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from "./pages/Products"
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SignIn';
import SellerSignup from './pages/Seller_signup';
import AgriMart from './pages/AgriMart';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { Analytics } from "@vercel/analytics/react"
import ProductDetails from './components/ProductDetails';
import Education from './pages/Education';

function App() {

  return (
    <>
      <Header />
      <Analytics/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/seller" element={<SellerSignup />} /> 
          <Route path="/agrimart" element={<AgriMart />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/product/details/:id" element={<ProductDetails />} /> 
          <Route path='/education' element={<Education/>}/>
        </Routes>
    </>
  )
}

export default App
