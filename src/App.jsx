import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import ProductDetails from './Components/ProductDetails';
import Wishlist from './Components/Wishlist';
import Login from './Components/LoginForm';
import SignupForm from './Components/SignupForm';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <Header />
          <Home />
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
    </Routes>
  );
};

export default App;