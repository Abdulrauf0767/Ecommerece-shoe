import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../Features/ProductSlice';
import Card from '../Classes/CardClass';

const Cards = () => {
  const dispatch = useDispatch();
  const { list = [], status } = useSelector((state) => state.product);

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
    <div className="container mx-auto px-4 py-8 w-full max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
  );
};

export default Cards;