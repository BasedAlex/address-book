import { useEffect, useState } from 'react'
import './App.css'
import { url } from './constants'
import { FilterType, UserType } from './types'
import { User } from './components/users'
import { Favorites } from './components/Favorites'
import { Filter } from './components/filter'
import { AddNewUser } from './components/addNewUser'
import { Button, Space } from 'antd'

export default function App() {
	const [users, setUsers] = useState<UserType[]>([])
	const [search, setSearch] = useState('')
	const [favorites, setFavorites] = useState<UserType[]>([])
	const [filterType, setFilterType] = useState<FilterType>('name')
	const [openFav, setOpenFav] = useState(false)

	const [userName, setUserName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const filter = (users: UserType[]): UserType[] => {
		if (filterType === 'name') {
			return users.filter(user =>
				user.name.toLowerCase().includes(search.toLowerCase())
			)
		}

		if (filterType === 'phone') {
			return filterPhone(users)
		}

		return users.filter(user =>
			user.email.toLowerCase().includes(search.toLowerCase())
		)
	}

	const filterPhone = (users: UserType[]): UserType[] => {
		return users.filter(user => isValidPhone(user.phone))
	}

	const isValidPhone = (phone: string): boolean => {
		if (phone.includes(search)) {
			return true
		}
		return phone.replaceAll('-', '').includes(search)
	}

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

	console.log(userName)
	console.log(phone)
	console.log(email)

	const onAddUser = () => {
		const newUser = {
			id: new Date().valueOf(),
			name: userName,
			phone: phone,
			email: email,
		}
		const newUsers = users.concat([newUser])
		setUsers(newUsers)
	}

	const onDeleteUser = (id: number) => {
		const newUsers = users.filter(user => user.id !== id)
		setUsers(newUsers)
	}

	const onAddToFav = (item: UserType) => {
		if (!favorites.includes(item)) {
			setFavorites([...favorites, item])
			console.log(favorites)
		}
	}

	const onDeleteFromFav = (id: number) => {
		const newUsers = favorites.filter(user => user.id !== id)
		setFavorites(newUsers)
	}

	useEffect(() => {
		fetch(url)
			.then(req => req.json())
			.then(data => setUsers(data))
	}, [])

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
					onAddUser={onAddUser}
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
			{openFav ? (
				<Favorites
					users={filter(favorites)}
					onDeleteUser={onDeleteUser}
					onAddToFav={onAddToFav}
					onDeleteFromFav={onDeleteFromFav}
				/>
			) : (
				<User
					users={filter(users)}
					onDeleteUser={onDeleteUser}
					onAddToFav={onAddToFav}
				/>
			)}
		</div>
	)
}

//  "Leanne Graham", 1-770-736-8031 x56442
// https://jsonplaceholder.typicode.com/users// - 10 users
// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   },
