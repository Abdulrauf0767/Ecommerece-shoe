import React from 'react';
import { NavLink } from "react-router-dom";

class Card extends React.Component {
  render() {
    const { id, name, image, price, description } = this.props;
    return (
      <div className="bg-white rounded-lg  overflow-hidden border  border-gray-100 shadow-md  hover:scale-105 transition-all duration-300">
        <NavLink 
          to={`/productdetails/${id}`} 
          className="flex flex-col 
                     h-[200px] 
                     md:h-[300px] 
                     lg:h-[350px] 
                     items-start justify-between pb-2"
        >
          <div className="w-full h-[50%]  bg-gray-100 flex items-center justify-center">
            <img 
              src={image} 
              alt={name} 
              className="h-full object-contain"
            />
          </div>
          <div className="pr-2 pl-2 h-fit relative">
            <h3 className="text-[10px] md:text-lg font-semibold mb-2 truncate w-20">
              {name}
            </h3>
            <p className="text-gray-600 text-[8px] lg:text-[10px] mb-3 line-clamp-2  sm:block">
              {description}
            </p>
            <div className="flex flex-col h-fit md:flex-row justify-between items-start">
              <span className="font-bold lg:text-lg text-[9px] absolute top-0 right-3 text-red-500 ">${price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded md:text-sm text-[5px] w-full md:w-[120px]">
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
