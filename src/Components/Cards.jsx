import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../Features/ProductSlice';
import Card from '../Classes/CardClass';

const Cards = () => {
  const dispatch = useDispatch();
  const { list = [], status } = useSelector((state) => state.product);
  const darkMode = useSelector((state) => state.theme.darkMode)
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-red-500">Error loading products</div>;
  }

  return (
    <>
    <div className={`w-full h-full ${darkMode ? 'bg-white' : 'bg-black text-white'} `}>

    <div className={`container mx-auto px-4 py-8 w-full max-w-7xl `}>
      <h1 className="text-3xl font-bold text-center mb-4">Products</h1>
      <p className=' mb-4 w-[90%] justify-self-center md:w-[50%] leading-0  text-justify'>Explore our wide range of trendy products.Discover exclusive deals on fashion, electronics & more.Secure payments & fast delivery at your fingertips.</p>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 gap-y-6 sm:gap-4 md:gap-5 lg:gap-6">
        {Array.isArray(list) && list.map((product) => (
          <Card
          key={product.id}
          id={product.id}
          name={product.title}
          image={product.thumbnail}
          price={product.price}
          description={product.description}
          />
        ))}
      </div>
    </div>
        </div>
        </>
  );
};

export default Cards;