import React, { useState, useEffect, useCallback, useRef } from 'react';

const Slider = ({ onSlideChange }) => {
  const sliderList = [
    "/Images/shoe-01.jpg",
    "/Images/shoe-02.jpg",
    "/Images/shirts.jpg",
    "/Images/pants (2).jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  // Handle slide change and notify parent
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(sliderList[currentIndex]);
    }
  }, [currentIndex, onSlideChange, sliderList]);

  // Auto slide functionality
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        goToNext();
      }, 3000);
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
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [sliderList.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
    );
  }, [sliderList.length]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right
      goToPrev();
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div 
      className="w-full h-[50vh] md:h-[75vh] flex items-center justify-center overflow-hidden relative group"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide container */}
      <div className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderList.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`slide-${index}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons - visible on mobile too now */}
      <div className="w-[90%] absolute flex items-center justify-between top-1/2 transform -translate-y-1/2 text-white px-4">
        <button
          onClick={goToPrev}
          type="button"
          className="w-10 h-10 border border-gray-200 bg-black/60 rounded-full flex items-center justify-center hover:scale-105 transition-transform opacity-100 md:group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          type="button"
          className="w-10 h-10 border border-gray-200 bg-black/60 rounded-full flex items-center justify-center hover:scale-105 transition-transform opacity-100 md:group-hover:opacity-100"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderList.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;