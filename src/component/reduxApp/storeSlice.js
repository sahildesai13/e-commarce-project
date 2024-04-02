import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    searchItems: [],
    category: [],
}


export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data = action.payload
            console.log(state.data)
        },
        SearchData: (state, action) => {
            console.log(action.payload);
            state.searchItems = state.data.filter((ele) => {
                return (ele.title.toLowerCase().includes(action.payload.toLowerCase()) || ele.description.toLowerCase().includes(action.payload.toLowerCase()) || ele.brand.toLowerCase().includes(action.payload.toLowerCase()) || ele.category.toLowerCase().includes(action.payload.toLowerCase()) )
            });
            console.log(state.searchItems);
        },
        addCategory: (state, action) => {
            state.category = action.payload;
            console.log(state.category);
        }
    },
})

export const { addData, SearchData ,addCategory } = storeSlice.actions

export default storeSlice.reducer