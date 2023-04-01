import { FilterType } from '../types'
import { Input } from 'antd'
import { Select, Space } from 'antd'
import { useAppDispatch } from '../hooks/hooks'
import { useState } from 'react'

export const Filter = () => {
	const [search, setSearch] = useState('')
	const [filterType, setFilterType] = useState<FilterType>('name')
	const [userName, setUserName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const dispatch = useAppDispatch()

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

	/// сложить в стейт

	return (
		<div style={{ marginTop: 5, marginLeft: 20, display: 'flex', gap: 10 }}>
			<Input
				placeholder='Find your contacts'
				bordered={true}
				value={search}
				type={search}
				style={{ width: 400 }}
				onChange={e => setSearch(e.currentTarget.value)}
			/>

			<Space wrap>
				<Select
					value={filterType}
					onChange={clearInput}
					options={[
						{ value: 'name', label: 'Name' },
						{ value: 'phone', label: 'Phone' },
						{ value: 'email', label: 'Email' },
					]}
				></Select>
			</Space>
		</div>
	)
}
