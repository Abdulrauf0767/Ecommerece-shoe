import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    darkMode : false ,
} ;
const ThemeSlice = createSlice({
    name : 'theme' ,
    initialState ,
    reducers : {
        themeToggle : (state) => {
            state.darkMode = !state.darkMode ;
        }
    }

})
export const {themeToggle} = ThemeSlice.actions ;
export default ThemeSlice.reducer ;