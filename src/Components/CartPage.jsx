import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../Features/CartSlice' ;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 w-[90%] justify-self-center ">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
          <p className="text-gray-500">Start shopping to add items to your cart</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0 flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 mb-4 sm:mb-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-32 object-contain rounded"
                    />
                  </div>
                  <div className="sm:w-3/4 sm:pl-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-4">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                      <span className="ml-auto font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;