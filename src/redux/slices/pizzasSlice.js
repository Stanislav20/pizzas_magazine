import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params) => {
		const { sortBy,	order, category } = params;
    const res = await axios.get(`https://646cb6e27b42c06c3b2bdaff.mockapi.io/items_pizza?${category}&sortBy=${sortBy}&order=${order}`);
    return res.data
  }
);

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {

		setItemsPizzas(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending] : (state) => {
			state.status = 'loading'
			state.items = []
		},
		[fetchPizzas.fulfilled] : (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[fetchPizzas.rejected] : (state) => {
			state.status = 'error';
			state.items = [];
		},
	},
});

export const { setItemsPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;