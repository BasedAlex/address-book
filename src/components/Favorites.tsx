import { UserType } from '../types'
import { Button, Space, List } from 'antd'
import { useState } from 'react'

type Props = {
	users: UserType[]
	onDeleteUser: (id: number) => void
	onAddToFav: (item: UserType) => void
	onDeleteFromFav: (id: number) => void
}

export const Favorites = ({ users, onDeleteFromFav, onAddToFav }: Props) => {
	const [currentUser, setCurrentUser]: any = useState(null)

	const dragStartHandler = (e: any, user: any) => {
		console.log('drag', user)
		setCurrentUser(user)
	}

	const dragEndHandler = (e: any) => {}

	const dragOverHandler = (e: any) => {
		e.preventDefault()
	}

	const dropHandler = (e: any, user: UserType) => {
		e.preventDefault()
		console.log('drop', user)
		users.map((item: any) => {
			if (item.id === user.id) {
				return { ...item }
			}
			if (item.id === currentUser?.id) {
				return { currentUser }
			}
			return item
		})
	}

	console.log(currentUser)

	const sortUsers = (a: any, b: any) => {
		if (a.id != b.id) {
			return 1
		} else {
			return -1
		}
	}

	return (
		<>
			<div>Favorites</div>
			<List
				size='small'
				style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}
			>
				{users.sort(sortUsers).map((user: any) => (
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
						</Space>
					</List.Item>
				))}
			</List>
		</>
	)
}
