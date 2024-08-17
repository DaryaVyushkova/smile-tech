import { isEmpty } from 'ramda'
import { User } from '../types/User'

export const filterUsersByText = (
  users: User[],
  filterText: string
): User[] => {
  if (!filterText) return users
  const lowerCasedFilter = filterText.toLowerCase()
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerCasedFilter) ||
      user.email.toLowerCase().includes(lowerCasedFilter) ||
      user.username.toLowerCase().includes(lowerCasedFilter)
  )
}

export const filterUsersByCity = (
  users: User[],
  selectedCities: string[]
): User[] => {
  if (isEmpty(selectedCities)) return users
  return users.filter((user) => selectedCities.includes(user.address.city))
}

export const filterUsersByCompany = (
  users: User[],
  selectedCompanies: string[]
): User[] => {
  if (isEmpty(selectedCompanies)) return users
  return users.filter((user) => selectedCompanies.includes(user.company.name))
}

export const sortUsers = (
  users: User[],
  sortField: keyof User | 'address.city' | 'company.name',
  sortDirection: 'asc' | 'desc'
): User[] => {
  return [...users].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    if (sortField === 'address.city') {
      aValue = a.address.city
      bValue = b.address.city
    } else if (sortField === 'company.name') {
      aValue = a.company.name
      bValue = b.company.name
    } else {
      aValue = a[sortField] as string | number
      bValue = b[sortField] as string | number
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })
}

export const paginateUsers = (
  users: User[],
  currentPage: number,
  perPage: number
): User[] => {
  const startIndex = (currentPage - 1) * perPage
  return users.slice(startIndex, startIndex + perPage)
}

export const createOptions = (
  users: User[],
  getField: (user: User) => string
): Array<{ value: string; label: string }> => {
  const uniqueValues = Array.from(new Set(users.map(getField)))
  return uniqueValues.map((value) => ({ value, label: value }))
}
