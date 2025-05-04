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

  useEffect(() => {
    if (currentSliderImage) {
      const newColors = getImageDominantColor(currentSliderImage);
      setColors(newColors);
    }
  }, [currentSliderImage]);

  return (
    <>
      <div className={`w-full h-20  transition-colors duration-500`}>
        <header className={`w-full text-black h-20 flex items-center justify-around fixed top-0 z-10 bg-[#f3f1ef] transition-colors duration-500`}>
          <div className='h-20 w-[10%] overflow-hidden flex items-center justify-center bg-transparent'>
            <img src={logo} className='h-full object-contain' alt="logo" />
          </div>
          
          <nav className='w-[20%] h-20'>
            <ul className='w-full h-20 items-center flex justify-between'>
              <li className='hover:underline cursor-pointer'>Men</li>
              <li className='hover:underline cursor-pointer'>Woman</li>
              <li className='hover:underline cursor-pointer'>Kids</li>
              <li className='hover:underline cursor-pointer'>New in</li>
            </ul>
          </nav>
          
          <form action="" className='w-[20%] h-20 flex items-center'>
            <label htmlFor="search" className='sr-only'>Search</label>
            <input 
              type="search" 
              name="search" 
              id="search" 
              placeholder='Search here' 
              className={`w-full border ${colors.borderColor} bg-opacity-70 bg-black outline-0 rounded pl-2 py-1 ${colors.textColor} placeholder-gray-300`} 
            />
          </form>
          
          <div className='w-[10%] flex items-center justify-between'>
            <button type="button" className='hover:scale-110 transition-transform'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </button>
            
            <NavLink to={'/wishlist/:productId'} type="button" className='hover:scale-110 transition-transform'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </NavLink>
            
            <button type="button" className='hover:scale-110 transition-transform'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;