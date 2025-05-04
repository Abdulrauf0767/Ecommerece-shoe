import React from 'react';
import { NavLink } from "react-router-dom";

class Card extends React.Component {
  render() {
    const { id, name, image, price, description } = this.props;
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border  border-gray-200 hover:scale-105 transition-all duration-300">
        <NavLink 
          to={`/productdetails/${id}`} 
          className="flex flex-col 
                     h-[120px] 
                     md:h-[300px] 
                     lg:h-[350px] 
                     items-start justify-between pb-2"
        >
          <div className="w-full h-[65px] md:h-[100px] bg-gray-100 flex items-center justify-center">
            <img 
              src={image} 
              alt={name} 
              className="h-full object-contain"
            />
          </div>
          <div className="pr-2 pl-2 h-fit">
            <h3 className="md:text-lg text-[8px] font-semibold mb-2 line-clamp-1">
              {name}
            </h3>
            <p className="text-gray-600 text-[8px] mb-3 line-clamp-2 hidden sm:block">
              {description}
            </p>
            <div className="flex flex-col h-fit md:flex-row justify-between items-start">
              <span className="font-bold lg:text-lg text-[9px]">${price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded md:text-sm text-[5px]">
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
