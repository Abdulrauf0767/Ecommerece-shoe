import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchProducts, clearSearchResults } from '../Features/ProductSlice';
import ProductCard from './ProductCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const dispatch = useDispatch();
  const { searchResults, status } = useSelector((state) => state.product);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [query, dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-8">Searching products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-red-500">Error searching products</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      
      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;