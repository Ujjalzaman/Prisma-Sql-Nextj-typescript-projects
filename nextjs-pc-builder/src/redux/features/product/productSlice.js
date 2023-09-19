import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.product.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.product = state.product.filter((data) => data._id !== action.payload)
        },
        resetProduct:(state, action) =>{
            state.product = []
        }
    }
});

export default productSlice.reducer;
export const { addProduct, removeProduct,resetProduct } = productSlice.actions;