import { UserType } from '../types'
import { Button, Space, List } from 'antd'

type Props = {
	users: UserType[]
	onDeleteUser: (id: number) => void
	onAddToFav: (item: UserType) => void
	onDeleteFromFav: (id: number) => void
}

export const Favorites = ({ users, onDeleteFromFav, onAddToFav }: Props) => {
	return (
		<>
			<div>Favorites</div>
			<List
				size='small'
				style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}
			>
				{users.map(user => (
					<List.Item
						style={{ padding: 5, display: 'flex', gap: 10 }}
						key={user.id}
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
