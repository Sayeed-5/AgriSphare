import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from "./pages/Products"
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SignIn';
import SellerSignup from './pages/Seller_signup';
import AgriMart from './pages/AgriMart';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/seller" element={<SellerSignup />} /> 
          <Route path="/agrimart" element={<AgriMart />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
    </>
  )
}

export default App
