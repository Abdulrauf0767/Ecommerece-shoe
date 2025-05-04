import React, { useState, useEffect } from 'react';

const Slider = ({ onSlideChange }) => {
  const sliderList = [
    "/Images/shoe-01.jpg",
    "/Images/shoe-02.jpg",
    "/Images/shirts.jpg",
    "/Images/pants (2).jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(sliderList[0]);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentImage);
    }
  }, [currentImage, onSlideChange]);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? sliderList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(sliderList[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === sliderList.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentImage(sliderList[newIndex]);
  };

  return (
    <div className='w-full h-[90vh] flex items-center justify-center overflow-hidden relative'>
      <div className='w-full h-[80vw] flex items-center justify-center overflow-hidden relative'>
        <img
          src={currentImage}
          className='w-full h-[70vw] object-cover transition-all duration-500'
          alt={`slide-${currentIndex}`}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      <div className='w-[90%] absolute flex items-center justify-between top-1/2 transform -translate-y-1/2 text-white px-4'>
        <button
          onClick={handlePrev}
          type='button'
          className='w-10 h-10 border border-gray-200 bg-black/40 rounded-full flex items-center justify-center hover:scale-105 transition-transform'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </button>
        <button
          onClick={handleNext}
          type='button'
          className='w-10 h-10 border border-gray-200 bg-black/40 rounded-full flex items-center justify-center hover:scale-105 transition-transform'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;