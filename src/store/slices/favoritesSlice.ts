import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../../types'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavUsersState {
	currentFavUsers: UserType[]
	selectedFavUsers: UserType[]
}

const initialState: FavUsersState = {
	currentFavUsers: [],
	selectedFavUsers: [],
}

export const favoritesSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addFavUser: (state: FavUsersState, action: PayloadAction<UserType>) => {
			if (state.currentFavUsers.includes(action.payload)) {
				return
			}
			return {
				currentFavUsers: [...state.currentFavUsers, action.payload],
				selectedFavUsers: [...state.selectedFavUsers],
			}
		},
		selectFavUser: (state: FavUsersState, action: PayloadAction<UserType>) => {
			if (state.selectedFavUsers.includes(action.payload)) {
				return
			}
			return {
				currentFavUsers: [...state.currentFavUsers],
				selectedFavUsers: [...state.selectedFavUsers, action.payload],
			}
		},
		// favoriteSelected: (
		// 	state: FavUsersState,
		// 	action: PayloadAction<UserType>
		// ) => {
		// 	if (state.currentFavUsers.includes(action.payload)) {
		// 		return
		// 	}
		// 	return {
		// 		currentFavUsers: [
		// 			...state.currentFavUsers,
		// 			state.currentFavUsers.push(action.payload),
		// 		],
		// 		selectedFavUsers: [],
		// 	}
		// },
		deleteFavUser: (
			state: FavUsersState,
			action: PayloadAction<{ id: number }>
		) => {
			return {
				currentFavUsers: [
					...state.currentFavUsers.filter(
						user => user.id !== action.payload.id
					),
				],
				selectedFavUsers: [...state.selectedFavUsers],
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { addFavUser, deleteFavUser, selectFavUser, favoriteSelected } =
	favoritesSlice.actions

export default favoritesSlice.reducer
