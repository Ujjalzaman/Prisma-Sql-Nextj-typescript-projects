import { configureStore } from '@reduxjs/toolkit'
import productSlice from '@/redux/features/product/productSlice';
export const store = configureStore({
    reducer: {
        products: productSlice,
    }
})