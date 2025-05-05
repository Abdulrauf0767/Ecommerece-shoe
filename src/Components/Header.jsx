import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '/Images/logo.png';
import { searchProducts, clearSearchResults, setSearchQuery } from '../Features/ProductSlice';

const getImageDominantColor = (imageUrl) => {
  if (!imageUrl) return {
    bgColor: 'bg-[#a0876f]',
    textColor: 'text-white',
    borderColor: 'border-gray-200'
  };
  
  if (imageUrl.includes('shoe')) {
    return {
      bgColor: 'bg-[#3a4e5d]',
      textColor: 'text-white',
      borderColor: 'border-gray-300'
    };
  } else if (imageUrl.includes('shirt')) {
    return {
      bgColor: 'bg-[#e8d8c3]',
      textColor: 'text-[#5c4b3a]',
      borderColor: 'border-[#5c4b3a]'
    };
  } else if (imageUrl.includes('pant')) {
    return {
      bgColor: 'bg-[#2c3e50]',
      textColor: 'text-[#ecf0f1]',
      borderColor: 'border-[#bdc3c7]'
    };
  }
  
  return {
    bgColor: 'bg-[#a0876f]',
    textColor: 'text-white',
    borderColor: 'border-gray-200'
  };
};

const Header = ({ currentSliderImage }) => {
  const [colors, setColors] = useState({
    bgColor: 'bg-[#a0876f]',
    textColor: 'text-white',
    borderColor: 'border-gray-200'
  });

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  const searchQuery = useSelector((state) => state.product.searchQuery);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (currentSliderImage) {
      const newColors = getImageDominantColor(currentSliderImage);
      setColors(newColors);
    }
  }, [currentSliderImage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogoClick = () => {
    dispatch(clearSearchResults());
    navigate('/');
  };

  return (
    <>
      <div className={`w-full h-20 transition-colors duration-500 relative`}>
        <header className={`w-full h-20 flex items-center justify-between px-4 fixed top-0 z-10 bg-[#f3f1ef] transition-colors duration-500`}>
          {/* Logo */}
          <div className='h-20 w-auto flex items-center bg-transparent cursor-pointer' onClick={handleLogoClick}>
            <img src={logo} className='h-full object-contain' alt="logo" />
            <h1 className='text-2xl font-bold'>Your Store</h1>
          </div>

          {/* Desktop Nav */}
          <nav className='w-[20%] h-20 hidden md:block'>
            <ul className='w-full h-20 items-center flex justify-between'>
              <li className='hover:underline cursor-pointer'>Men</li>
              <li className='hover:underline cursor-pointer'>Woman</li>
              <li className='hover:underline cursor-pointer'>Kids</li>
              <li className='hover:underline cursor-pointer'>New in</li>
            </ul>
          </nav>

          {/* Desktop Search - Hidden on mobile */}
          <form onSubmit={handleSearch} className='w-[20%] h-20 hidden md:flex items-center relative'>
            <input 
              type="text"
              placeholder='Search here' 
              value={searchQuery}
              onChange={handleSearchChange}
              className={`w-full border ${colors.borderColor} bg-opacity-70 bg-black outline-0 rounded pl-2 py-1 ${colors.textColor} placeholder-gray-300`} 
            />
            <button type="submit" className="absolute right-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>

          {/* Desktop Icons - Hidden on mobile */}
          <div className='w-[10%] hidden md:flex items-center justify-between'>
            {/* Bag */}
            <NavLink to={'/cart'} className='hover:scale-110 transition-transform relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
            
            {/* Wishlist */}
            <NavLink to={'/wishlist'} className='hover:scale-110 transition-transform'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </NavLink>
            
            {/* Login */}
            <NavLink to={'/login'} className='hover:scale-110 transition-transform'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </NavLink>
          </div>

          {/* Mobile View Icons */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => {
                setShowMobileSearch(prev => !prev);
                setShowMobileMenu(false);
              }} 
              className="hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <button 
              onClick={() => {
                setShowMobileMenu(prev => !prev);
                setShowMobileSearch(false);
              }} 
              className="hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Search Bar - Centered and full width */}
      {showMobileSearch && (
        <div className="md:hidden w-full fixed z-20 bg-[#f3f1ef] py-3 px-4" style={{ top: '5rem' }}>
          <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
            <input 
              type="text"
              placeholder="Search here..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className={`flex-1 border ${colors.borderColor} bg-opacity-70 bg-black outline-0 rounded-l pl-4 py-2 ${colors.textColor} placeholder-gray-300`} 
              autoFocus
            />
            <button 
              type="submit"
              className={`bg-black bg-opacity-70 px-4 rounded-r ${colors.textColor}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className='md:hidden fixed top-20 w-full bg-[#f3f1ef] z-20 px-4 py-4 shadow-lg'>
          <ul className='flex flex-col gap-4'>
            <li className='hover:underline cursor-pointer py-2'>Men</li>
            <li className='hover:underline cursor-pointer py-2'>Woman</li>
            <li className='hover:underline cursor-pointer py-2'>Kids</li>
            <li className='hover:underline cursor-pointer py-2'>New in</li>
          </ul>
          <div className="flex justify-around mt-6 py-4 border-t border-gray-300">
            <NavLink 
              to={'/cart'} 
              className='hover:scale-110 transition-transform relative flex flex-col items-center'
              onClick={() => setShowMobileMenu(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="text-xs mt-1">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
            
            <NavLink 
              to={'/wishlist'} 
              className='hover:scale-110 transition-transform flex flex-col items-center'
              onClick={() => setShowMobileMenu(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span className="text-xs mt-1">Wishlist</span>
            </NavLink>
            
            <NavLink 
              to={'/login'} 
              className='hover:scale-110 transition-transform flex flex-col items-center'
              onClick={() => setShowMobileMenu(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-xs mt-1">Account</span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;