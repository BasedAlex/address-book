import { UserType } from '../types'
import { Button, Space, List } from 'antd'

type Props = {
	users: UserType[]
	onDeleteUser: (id: number) => void
	onAddToFav: (item: UserType) => void
}

export const User = ({ users, onDeleteUser, onAddToFav }: Props) => {
	return (
		<>
			<div>Normal Users</div>
			<List
				size='small'
				style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}
			>
				{users.map(user => (
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
