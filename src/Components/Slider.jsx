import React, { useState, useEffect, useCallback } from 'react';

const Slider = ({ onSlideChange }) => {
  const sliderList = [
    "/Images/shoe-01.jpg",
    "/Images/shoe-02.jpg",
    "/Images/shirts.jpg",
    "/Images/pants (2).jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(sliderList[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Handle slide change and notify parent
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentImage);
    }
  }, [currentImage, onSlideChange]);

  // Auto slide functionality
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        goToNext();
      }, 3000); // Changed to 3 seconds for better UX
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentIndex, isAutoPlaying]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? sliderList.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  }, [sliderList.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
    );
  }, [sliderList.length]);

  // Update current image when index changes
  useEffect(() => {
    setCurrentImage(sliderList[currentIndex]);
  }, [currentIndex, sliderList]);

  return (
    <div className='w-full md:h-[75vh] h-[50vw] flex items-center justify-center overflow-hidden relative group'>
      <div className='w-full md:h-[75vw] flex items-center justify-center overflow-hidden relative'>
        {/* Slide container with transition animation */}
        <div className='relative w-full h-full'>
          {sliderList.map((image, index) => (
            <img
              key={image}
              src={image}
              className={`absolute w-full md:h-[70vw] h-full object-cover transition-all duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              alt={`slide-${index}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className='w-[90%] absolute flex items-center justify-between top-1/2 transform -translate-y-1/2 text-white px-4'>
        <button
          onClick={goToPrev}
          type='button'
          className='w-10 h-10 border border-gray-200 bg-black/40 rounded-full flex items-center justify-center hover:scale-105 transition-transform group-hover:opacity-100 opacity-0 md:opacity-100'
          aria-label='Previous slide'
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
          onClick={goToNext}
          type='button'
          className='w-10 h-10 border border-gray-200 bg-black/40 rounded-full flex items-center justify-center hover:scale-105 transition-transform group-hover:opacity-100 opacity-0 md:opacity-100'
          aria-label='Next slide'
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