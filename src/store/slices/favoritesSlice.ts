import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../../types'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavUsersState {
	currentFavUsers: UserType[]
}

const initialState: FavUsersState = {
	currentFavUsers: [],
}

export const favoritesSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addFavUser: (state: FavUsersState, action: PayloadAction<UserType>) => {
			if (state.currentFavUsers.includes(action.payload)) {
				return
			}
			return { currentFavUsers: [...state.currentFavUsers, action.payload] }
		},
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
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { addFavUser, deleteFavUser } = favoritesSlice.actions

export default favoritesSlice.reducer
