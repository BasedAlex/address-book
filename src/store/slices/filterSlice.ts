import { createSlice } from '@reduxjs/toolkit'
import { FilterType, UserType } from '../../types'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
	search: string
	filterType: FilterType
}

const initialState: FilterState = {
	search: '',
	filterType: 'name',
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		addSearch: (state: FilterState, action: PayloadAction<string>) => {
			return { ...state, search: action.payload }
		},
		addFilterType: (state: FilterState, action: PayloadAction<FilterType>) => {
			return { ...state, filterType: action.payload }
		},
	},
})

export const { addSearch, addFilterType } = filterSlice.actions

export default filterSlice.reducer
