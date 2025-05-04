import React from 'react';
import { NavLink } from "react-router-dom";

class Card extends React.Component {
  render() {
    const { id, name, image, price, description } = this.props;
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:scale-105 transition-all duration-300">
        <NavLink to={`/productdetails/${id}`} className="block">
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <img 
              src={image} 
              alt={name} 
              className="h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">${price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                View Details
              </button>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Card;