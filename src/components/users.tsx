import { UserType } from '../types'
import { Button, Space, List } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { deleteUser } from '../store/slices/usersSlice'
import { addFavUser } from '../store/slices/favoritesSlice'
import { filter } from './utils'

export const User = () => {
	const listUsers = useAppSelector(state => state.users.currentUsers)
	const { search, filterType } = useAppSelector(state => state.filter)

	const dispatch = useAppDispatch()

	const onDeleteUser = (id: number) => {
		dispatch(deleteUser({ id }))
	}

	const onAddToFav = (user: any) => {
		dispatch(addFavUser(user))
	}

	return (
		<>
			<div>Normal Users</div>
			<List
				size='small'
				style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}
			>
				{filter(listUsers, search, filterType).map(user => (
					<List.Item
						style={{ padding: 5, display: 'flex', gap: 10 }}
						key={user.id}
						draggable={true}
						// onDrag={}
						// onDrop={}
						// onDragLeave={}
						// onDragOver={}
					>
						{`${user.name}, ${user.phone}, ${user.email}`}
						<Space wrap>
							<Button
								size='small'
								style={{ marginLeft: 5 }}
								onClick={() => onDeleteUser(user.id)}
							>
								X
							</Button>
							<Button
								size='small'
								style={{ marginLeft: 2 }}
								onClick={() => onAddToFav(user)}
							>
								ADD
							</Button>
						</Space>
					</List.Item>
				))}
			</List>
		</>
	)
}
