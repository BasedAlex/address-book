import { Input } from 'antd'
import Button from 'antd/es/button'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { addUser } from '../store/slices/usersSlice'
import Modal from '../UI/Modal/Modal'

export const AddNewUser = () => {
	const [userName, setUserName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
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

	const clearAllInputs = () => {
		setUserName('')
		setPhone('')
		setEmail('')
	}

	return (
		<>
			<div>
				{open && (
					<Modal active={open} setActive={setOpen}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								margin: 'auto 0',
								alignItems: 'center',
								justifyItems: 'center',
							}}
						>
							<Input
								placeholder='Name'
								bordered={true}
								value={userName}
								onChange={e => setUserName(e.currentTarget.value)}
								style={{ width: '60%' }}
							/>
							<Input
								placeholder='Phone'
								bordered={true}
								value={phone}
								style={
									errorPhone
										? { borderColor: 'red', width: '60%' }
										: { borderColor: '', width: '60%' }
								}
								onChange={e => onSetPhone(e.currentTarget.value)}
							/>
							<Input
								placeholder='Email'
								bordered={true}
								value={email}
								style={{ width: '60%' }}
								onChange={e => setEmail(e.currentTarget.value)}
							/>
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
						</div>
					</Modal>
				)}
				<Button onClick={() => setOpen(!open)}>Open User</Button>
			</div>
		</>
	)
}
