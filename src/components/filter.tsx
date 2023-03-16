import { FilterType } from '../types'
import { Input } from 'antd'
import { Select, Space } from 'antd'

type Props = {
	search: string
	setSearch: (value: string) => void
	filterType: FilterType
	clearInput: (option: FilterType) => void
}

export const Filter = ({
	search,
	setSearch,
	filterType,
	clearInput,
}: Props) => {
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
