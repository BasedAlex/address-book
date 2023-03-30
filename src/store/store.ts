import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'
import filterSlice from './slices/filterSlice'
import usersReducer from './slices/usersSlice'

// const applyMiddleware = redux.applyMiddleware

export const store = configureStore({
	reducer: {
		users: usersReducer,
		favorites: favoritesReducer,
		filter: filterSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
