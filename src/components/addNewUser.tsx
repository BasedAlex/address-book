import { Input } from 'antd'
import Button from 'antd/es/button'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { addUser } from '../store/slices/usersSlice'

type Props = {
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
		userName,
		setUserName,
		phone,
		setPhone,
		email,
		setEmail,
		clearAllInputs,
	} = props
	const [open, setOpen] = useState(false)
	const [errorPhone, setErrorPhone] = useState(false)

	const dispatch = useAppDispatch()

	const onSetPhone = (value: string) => {
		const regex = /^[0-9]+$/
		setErrorPhone(
			!(regex.test(value) && value.length >= 3 && value.length <= 12)
		)

		console.log(
			'!!!!!',
			!(regex.test(value) && value.length >= 3 && value.length <= 12)
		)
		setPhone(value)
	}

	const onAddUser = () => {
		const newUser = {
			id: new Date().valueOf(),
			name: userName,
			phone: phone,
			email: email,
		}
		dispatch(addUser(newUser))
	}

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
						style={
							errorPhone
								? { borderColor: 'red', width: 200 }
								: { borderColor: '', width: 200 }
						}
						onChange={e => onSetPhone(e.currentTarget.value)}
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
			{userName && (email || !errorPhone) ? (
				<Button
					onClick={() => {
						onAddUser()
						clearAllInputs()
						setOpen(!open)
					}}
				>
					Add User
				</Button>
			) : null}
		</>
	)
}
