import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../Features/ProductSlice';
import cartReducer from '../Features/CartSlice' ;
import themeReducer from '../Features/ThemeSlice'
export const store = configureStore({
    reducer : {
        product : ProductReducer ,
        cart: cartReducer,
        theme : themeReducer,
    }
})

export default store ;