import { Input } from 'antd'
import Button from 'antd/es/button'
import { useState } from 'react'

type Props = {
	onAddUser: () => void
	userName: string
	setUserName: (value: string) => void
	phone: string
	setPhone: (value: string) => void
	email: string
	setEmail: (value: string) => void
	clearAllInputs: () => void
}

export const AddNewUser = (props: Props) => {
	const {
		onAddUser,
		userName,
		setUserName,
		phone,
		setPhone,
		email,
		setEmail,
		clearAllInputs,
	} = props
	const [open, setOpen] = useState(false)

	return (
		<>
			{open && (
				<>
					<Input
						placeholder='Name'
						bordered={true}
						value={userName}
						onChange={e => setUserName(e.currentTarget.value)}
						style={{ width: 200 }}
					/>
					<Input
						placeholder='Phone'
						bordered={true}
						value={phone}
						style={{ width: 200 }}
						onChange={e => setPhone(e.currentTarget.value)}
					/>
					<Input
						placeholder='Email'
						bordered={true}
						value={email}
						style={{ width: 200 }}
						onChange={e => setEmail(e.currentTarget.value)}
					/>
				</>
			)}
			<Button onClick={() => setOpen(!open)}>Open User</Button>
			<Button
				onClick={() => {
					onAddUser()
					clearAllInputs()
					setOpen(!open)
				}}
			>
				Add User
			</Button>
		</>
	)
}
