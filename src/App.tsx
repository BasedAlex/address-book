import { useEffect, useState } from 'react'
import './App.css'
import { User } from './components/users'
import { Favorites } from './components/Favorites'
import { Filter } from './components/filter'
import { AddNewUser } from './components/addNewUser'
import { Button } from 'antd'
import { useAppDispatch } from './hooks/hooks'
import { fetchUsers } from './store/slices/usersSlice'
import { Routes, Route, Link } from 'react-router-dom'

export default function App() {
	const [openFav, setOpenFav] = useState(true)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	return (
		<div>
			<Filter />

			<div style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}>
				<AddNewUser />
				<Button>
					{openFav ? (
						<Link to='/favorites' onClick={() => setOpenFav(!openFav)}>
							Favorites
						</Link>
					) : (
						<Link to='/' onClick={() => setOpenFav(!openFav)}>
							Users
						</Link>
					)}
				</Button>
			</div>
			<Routes>
				<Route path='/' element={<User />} />
				<Route path='/favorites' element={<Favorites />} />
			</Routes>
		</div>
	)
}
