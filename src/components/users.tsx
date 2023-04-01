import { UserType } from '../types'
import { Button, Space, List, Checkbox } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { deleteUser } from '../store/slices/usersSlice'
import { addFavUser, selectFavUser } from '../store/slices/favoritesSlice'
import { filter } from './utils'
import { useState } from 'react'

export const User = () => {
	const [checked, setChecked] = useState(false)

	const listUsers = useAppSelector(state => state.users.currentUsers)
	const { search, filterType } = useAppSelector(state => state.filter)

	const dispatch = useAppDispatch()

	const onDeleteUser = (id: number) => {
		dispatch(deleteUser({ id }))
	}

	const onAddToFav = (user: any) => {
		dispatch(addFavUser(user))
	}

	const onSelectToFav = (user: any) => {
		dispatch(selectFavUser(user))
	}

	return (
		<div
			style={{
				marginLeft: '20px',
			}}
		>
			<div
				style={{
					marginTop: '10px',
				}}
			>
				Normal Users
			</div>
			<div>
				{checked && (
					<div
						style={{
							display: 'flex',

							gap: '10px',
						}}
					>
						<Button>Add Selected</Button>
						<Button>Delete Selected</Button>
					</div>
				)}
			</div>
			<List size='small' style={{ marginTop: 5, display: 'flex', gap: 10 }}>
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
								style={{ marginLeft: 2 }}
								onClick={() => onAddToFav(user)}
							>
								ADD
							</Button>
							<Button
								size='small'
								style={{ marginLeft: 5 }}
								onClick={() => onDeleteUser(user.id)}
							>
								X
							</Button>
							<Checkbox
								onChange={() => (setChecked(true), onSelectToFav(user))}
							/>
						</Space>
					</List.Item>
				))}
			</List>
		</div>
	)
}
