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
import SearchResults from './Components/SerachResults';

const App = () => {
  return (
    <div className={`w-full h-full `}>

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
      <Route path='/wishlist' element={
        <>
          <Header />
          <Wishlist />
          <Footer />
        </>
      } />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/search' element={
        <>
          <Header />
          <SearchResults />
          <Footer />
        </>
      } />
    </Routes>
      </div>
  );
};

export default App;