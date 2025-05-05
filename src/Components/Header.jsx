import React, { useState, useEffect } from 'react';
import logo from '/Images/logo.png';
import Slider from './Slider';
import { NavLink } from "react-router-dom";

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

const Header = ({ currentSliderImage, onSlideChange }) => {
  const [colors, setColors] = useState({
    bgColor: 'bg-[#a0876f]',
    textColor: 'text-white',
    borderColor: 'border-gray-200'
  });

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (currentSliderImage) {
      const newColors = getImageDominantColor(currentSliderImage);
      setColors(newColors);
    }
  }, [currentSliderImage]);

  return (
    <>
      <div className={`w-full h-20 transition-colors duration-500 relative`}>
        <header className={`w-full h-20 flex items-center justify-between px-4 fixed top-0 z-10 bg-[#f3f1ef] transition-colors duration-500`}>
          {/* Logo */}
          <div className='h-20 w-auto flex items-center bg-transparent'>
            <img src={logo} className='h-full object-contain' alt="logo" />
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

          {/* Desktop Search */}
          <form action="" className='w-[20%] h-20 md:flex items-center hidden'>
            <label htmlFor="search" className='sr-only'>Search</label>
            <input 
              type="search" 
              name="search" 
              id="search" 
              placeholder='Search here' 
              className={`w-full border ${colors.borderColor} bg-opacity-70 bg-black outline-0 rounded pl-2 py-1 ${colors.textColor} placeholder-gray-300`} 
            />
          </form>

          {/* Desktop Icons */}
          <div className='w-[10%] md:flex items-center justify-between hidden'>
            {/* Bag */}
            <button type="button" className='hover:scale-110 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

            </button>
            {/* Wishlist */}
            <NavLink to={'/wishlist/:productId'} type="button" className='hover:scale-110 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            </NavLink>
            {/* Login */}
            <NavLink to={'/login'} type="button" className='hover:scale-110 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

            </NavLink>
          </div>

          {/* Mobile View Icons */}
          <div className="md:hidden flex items-center gap-4">
            {/* Search Icon */}
            <button onClick={() => setShowMobileSearch(prev => !prev)} className="hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
             </button>

            {/* Menu Icon */}
            <button onClick={() => setShowMobileMenu(prev => !prev)} className="hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            </button>
          </div>
        </header>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden w-full px-4 mt-20">
          <input 
            type="search" 
            placeholder="Search here..." 
            className={`w-full border ${colors.borderColor} bg-opacity-70 bg-black outline-0 rounded pl-2 py-2 ${colors.textColor} placeholder-gray-300`} 
          />
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className='md:hidden absolute top-20 w-full bg-[#f3f1ef] z-20 px-4 py-4'>
          <ul className='flex flex-col gap-3'>
            <li className='hover:underline cursor-pointer'>Men</li>
            <li className='hover:underline cursor-pointer'>Woman</li>
            <li className='hover:underline cursor-pointer'>Kids</li>
            <li className='hover:underline cursor-pointer'>New in</li>
          </ul>
          <div className="flex justify-around mt-4">
            {/* Bag */}
            <button type="button" className='hover:scale-110 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

            </button>
            {/* Wishlist */}
            <NavLink to={'/wishlist/:productId'} type="button" className='hover:scale-110 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            </NavLink>
            {/* Login */}
            <NavLink to={'/login'} type="button" className='hover:scale-110 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
