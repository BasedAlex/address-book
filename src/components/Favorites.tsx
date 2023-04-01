import { UserType } from '../types'
import { Button, Space, List, Checkbox } from 'antd'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { deleteFavUser } from '../store/slices/favoritesSlice'
import { filter } from './utils'

export const Favorites = () => {
	const [currentUser, setCurrentUser]: any = useState(null)
	const [checked, setChecked] = useState(false)

	const listFavUsers = useAppSelector(state => state.favorites.currentFavUsers)
	const { search, filterType } = useAppSelector(state => state.filter)
	console.log(listFavUsers)
	const dispatch = useAppDispatch()

	const dragStartHandler = (e: any, user: any) => {
		console.log('drag', user)
		setCurrentUser(user)
	}

	const dragEndHandler = (e: any) => {}

	const dragOverHandler = (e: any) => {
		e.preventDefault()
	}

	const onDeleteFromFav = (id: number) => {
		dispatch(deleteFavUser({ id }))
	}

	const dropHandler = (e: any, user: UserType) => {
		e.preventDefault()
		console.log('drop', user)
		listFavUsers.map((item: any) => {
			if (item.id === user.id) {
				console.log('item', item.id)
				console.log('user', user.id)
				return { ...item }
			}
			if (item.id === currentUser?.id) {
				console.log('item', item.id)
				console.log('currentUser', currentUser.id)
				return { currentUser }
			}
			return item
		})
	}

	console.log(currentUser)

	return (
		<>
			<div>Favorites</div>
			<List
				size='small'
				style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}
			>
				{filter(listFavUsers, search, filterType).map((user: any) => (
					<List.Item
						style={{ padding: 5, display: 'flex', gap: 10 }}
						key={user.id}
						draggable={true}
						onDragStart={e => dragStartHandler(e, user)}
						onDragLeave={e => dragEndHandler(e)}
						onDragOver={e => dragOverHandler(e)}
						onDragEnd={e => dragEndHandler(e)}
						onDrop={e => dropHandler(e, user)}
					>
						{`${user.name}, ${user.phone}, ${user.email}`}
						<Space wrap>
							<Button
								size='small'
								style={{ marginLeft: 5 }}
								onClick={() => onDeleteFromFav(user.id)}
							>
								X
							</Button>
							<Checkbox onChange={() => setChecked(true)} />
						</Space>
					</List.Item>
				))}
			</List>
		</>
	)
}
