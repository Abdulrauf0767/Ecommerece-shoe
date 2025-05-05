import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import ProductDetails from './Components/ProductDetails';
import Wishlist from './Components/Wishlist';
import Login from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import CartPage from './Components/CartPage';
import Footer from './Components/Footer';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <Header />
          <Home />
          <Footer/>
        </>
      } />
      <Route path='/productdetails/:id' element={
        <>
          <Header />
          <ProductDetails />
          
        </>
      } />
      <Route path='/wishlist/:productdetails' element={<Wishlist />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path='/cart' element={<CartPage/>}/>
    </Routes>
  );
};

export default App;