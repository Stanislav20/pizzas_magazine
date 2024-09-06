import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activeIndexCategory: 0,
	selectedSort: {name:'популярности', sortProperty:'raiting'}
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActiveIndexCategory(state, actions) {
			state.activeIndexCategory = actions.payload
		},
		setSelectedSort(state, actions) {
			state.selectedSort = actions.payload
		},
	},
});

export const { setActiveIndexCategory, setSelectedSort } = filterSlice.actions;

export default filterSlice.reducer;