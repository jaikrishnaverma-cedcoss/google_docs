import { configureStore } from "@reduxjs/toolkit";
import MyReducer from "./slice";

// store for reducer which is MyReducer
export const Store = configureStore({
     reducer : MyReducer
})