import React, { useState } from 'react';
import Slider from './Slider';
import Cards from './Cards';

const Home = () => {
  const [currentSliderImage, setCurrentSliderImage] = useState(null);

  return (
    <div>
      <Slider onSlideChange={setCurrentSliderImage} />
      <Cards />
    </div>
  );
};

export default Home;