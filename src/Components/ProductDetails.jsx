import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, addToWishlist } from '../Features/ProductSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, status, wishlist } = useSelector((state) => state.product);
  const [currentImage, setCurrentImage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetails) {
      setCurrentImage(productDetails.thumbnail);
      // Check if product is already in wishlist
      setIsInWishlist(wishlist.some(item => item.id === productDetails.id));
    }
  }, [productDetails, wishlist]);

  const handleAddToWishlist = () => {
    if (productDetails) {
      dispatch(addToWishlist({
        id: productDetails.id,
        title: productDetails.title,
        thumbnail: productDetails.thumbnail,
        price: productDetails.price,
        description: productDetails.description,
        brand: productDetails.brand,
        rating: productDetails.rating
      }));
      setIsInWishlist(true);
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-red-500">Error loading product details</div>;
  }

  if (!productDetails) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left column with images */}
          <div className="md:w-1/2 p-6">
            {/* Main image */}
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <img 
                src={currentImage || productDetails.thumbnail} 
                alt={productDetails.title} 
                className="h-full object-contain"
              />
            </div>
            {/* Thumbnail gallery */}
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              <img 
                src={productDetails.thumbnail} 
                alt={`${productDetails.title} thumbnail`}
                className={`h-20 w-20 object-cover rounded border cursor-pointer ${
                  currentImage === productDetails.thumbnail ? 'border-blue-500 border-2' : 'border-gray-200'
                }`}
                onClick={() => setCurrentImage(productDetails.thumbnail)}
              />
              {productDetails.images?.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${productDetails.title} ${index}`}
                  className={`h-20 w-20 object-cover rounded border cursor-pointer ${
                    currentImage === image ? 'border-blue-500 border-2' : 'border-gray-200'
                  }`}
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </div>
          </div>
          
          {/* Right column with product info */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">{productDetails.title}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {productDetails.brand}
              </span>
              <span className="ml-2 text-yellow-500">
                {'★'.repeat(Math.round(productDetails.rating))}
                {'☆'.repeat(5 - Math.round(productDetails.rating))}
                <span className="text-gray-600 ml-1">({productDetails.rating})</span>
              </span>
            </div>
            <p className="text-gray-700 mb-6">{productDetails.description}</p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">${productDetails.price}</span>
              <span className="text-sm text-gray-500 ml-2">
                <del>${Math.round(productDetails.price / (1 - productDetails.discountPercentage/100))}</del>
                <span className="ml-1 text-green-600">{productDetails.discountPercentage}% off</span>
              </span>
            </div>

            <div className="mb-6">
              <span className="text-gray-700">Stock: </span>
              <span className={productDetails.stock > 0 ? "text-green-600" : "text-red-600"}>
                {productDetails.stock > 0 ? `${productDetails.stock} available` : 'Out of stock'}
              </span>
            </div>

            <button 
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
              className={`w-full py-3 px-4 rounded-lg font-medium transition duration-300 ${
                isInWishlist 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-400 hover:bg-green-500 text-white'
              }`}
            >
              {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 mt-5 text-white py-3 px-4 rounded-lg font-medium transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;