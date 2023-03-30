import { useEffect, useState } from 'react'
import './App.css'
import { url } from './constants'
import { FilterType, UserType } from './types'
import { User } from './components/users'
import { Favorites } from './components/Favorites'
import { Filter } from './components/filter'
import { AddNewUser } from './components/addNewUser'
import { Button, Space } from 'antd'
import { useAppDispatch } from './hooks/hooks'
import { addUser, fetchUsers } from './store/slices/usersSlice'
import { addFavUser } from './store/slices/favoritesSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export default function App() {
	const [search, setSearch] = useState('')
	const [filterType, setFilterType] = useState<FilterType>('name')
	const [openFav, setOpenFav] = useState(false)
	const [userName, setUserName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const dispatch = useAppDispatch()

	const clearInput = (option: FilterType) => {
		if (option !== filterType) {
			setSearch('')
		}
		setFilterType(option)
	}

	const clearAllInputs = () => {
		setUserName('')
		setPhone('')
		setEmail('')
	}

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	return (
		<div>
			<Filter
				search={search}
				setSearch={setSearch}
				filterType={filterType}
				clearInput={clearInput}
			/>

			<div style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}>
				<AddNewUser
					userName={userName}
					setUserName={setUserName}
					phone={phone}
					setPhone={setPhone}
					email={email}
					setEmail={setEmail}
					clearAllInputs={clearAllInputs}
				/>
				<Button onClick={() => setOpenFav(!openFav)}>Favorites</Button>
			</div>
			{openFav ? <Favorites /> : <User />}
		</div>
	)
}
