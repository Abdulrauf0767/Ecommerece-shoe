import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../Features/ProductSlice';
import cartReducer from '../Features/CartSlice' 
export const store = configureStore({
    reducer : {
        product : ProductReducer ,
        cart: cartReducer,
    }
})

export default store ;