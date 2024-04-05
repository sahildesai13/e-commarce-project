import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    searchItems: [],
    category: [],
    cart: [],
}

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data = action.payload
        },
        SearchData: (state, action) => {
            console.log(action.payload);
            state.searchItems = state.data.filter((ele) => {
                return (
                    ele.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    ele.description.toLowerCase().includes(action.payload.toLowerCase()) ||
                    ele.brand.toLowerCase().includes(action.payload.toLowerCase()) ||
                    ele.category.toLowerCase().includes(action.payload.toLowerCase())
                )
            });
        },
        addCategory: (state, action) => {
            state.category = action.payload;
        },
        AddToCart: (state, action) => {
            const existingItem = state.cart.find(c => c.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        },
        updateQuantity: (state, action) => {
            const item = state.cart.find(i => i.id === action.payload.id)
            if (item) {
                item.quantity = action.payload.quantity
            }
        },
    },
})

export const { addData, SearchData, addCategory, removeFromCart, AddToCart, updateQuantity } = storeSlice.actions
export default storeSlice.reducer