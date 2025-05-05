import React from 'react';
import { NavLink } from "react-router-dom";

class Card extends React.Component {
  render() {
    const { id, name, image, price, description } = this.props;
    return (
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-md hover:scale-105 transition-all duration-300 h-full flex flex-col">
        <NavLink 
          to={`/productdetails/${id}`} 
          className="flex flex-col h-full"
        >
          {/* Image Container */}
          <div className="w-full flex-grow bg-gray-100 flex items-center justify-center p-2">
            <img 
              src={image} 
              alt={name} 
              className="h-full max-h-[180px] md:max-h-[220px] lg:max-h-[250px] w-auto object-contain"
            />
          </div>

          {/* Content Container */}
          <div className="p-3 flex flex-col flex-grow-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm md:text-base font-semibold truncate flex-grow mr-2">
                {name}
              </h3>
              <span className="font-bold text-red-500 whitespace-nowrap">${price}</span>
            </div>
            
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">
              {description}
            </p>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm py-2 rounded w-full transition-colors duration-200">
              View Details
            </button>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Card;