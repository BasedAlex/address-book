import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserType } from '../../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { url } from '../../constants'

export const fetchUsers = createAsyncThunk(
	'users/fetchByIdStatus',
	async () => {
		const response = await fetch(url)
		const data = response.json()
		return data
	}
)

export interface UsersState {
	currentUsers: UserType[]
	loading: boolean
}

const initialState: UsersState = {
	currentUsers: [],
	loading: false,
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state: UsersState, action: PayloadAction<UserType>) => {
			return { ...state, currentUsers: [...state.currentUsers, action.payload] }
		},

		deleteUser: (state: UsersState, action: PayloadAction<{ id: number }>) => {
			return {
				...state,
				currentUsers: [
					...state.currentUsers.filter(user => user.id !== action.payload.id),
				],
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUsers.pending, state => {
			state.loading = true
		}),
			builder.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false
				state.currentUsers = action.payload
			}),
			builder.addCase(fetchUsers.rejected, state => {
				state.loading = false
			})
	},
})

export const { addUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer
