import { useAppSelector } from '../hooks/hooks'

import { FilterType, UserType } from '../types'

const isValidPhone = (phone: string, search: string): boolean => {
	if (phone.includes(search)) {
		return true
	}
	return phone.replaceAll('-', '').includes(search)
}

const filterPhone = (users: UserType[], search: string): UserType[] => {
	return users.filter(user => isValidPhone(user.phone, search))
}

export const filter = (
	users: UserType[],
	search: string,
	filterType: FilterType
): UserType[] => {
	if (filterType === 'name') {
		return users.filter(user =>
			user.name.toLowerCase().includes(search.toLowerCase())
		)
	}

	if (filterType === 'phone') {
		return filterPhone(users, search)
	}

	return users.filter(user =>
		user.email.toLowerCase().includes(search.toLowerCase())
	)
}
