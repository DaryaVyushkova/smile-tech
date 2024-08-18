import {
  filterUsersByText,
  filterUsersByCity,
  filterUsersByCompany,
  sortUsers,
  paginateUsers,
  createOptions,
} from './userUtils'
import { User } from 'types/User'

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'john',
    email: 'john@example.com',
    address: { city: 'New York', street: '', suite: '', zipcode: '' },
    phone: '',
    website: '',
    company: { name: 'ABC Corp', catchPhrase: '', bs: '' },
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'jane',
    email: 'jane@example.com',
    address: { city: 'Los Angeles', street: '', suite: '', zipcode: '' },
    phone: '',
    website: '',
    company: { name: 'XYZ Inc', catchPhrase: '', bs: '' },
  },
]

describe('userUtils', () => {
  describe('filterUsersByText', () => {
    it('should return all users when filter text is empty', () => {
      expect(filterUsersByText(mockUsers, '')).toEqual(mockUsers)
    })

    it('should filter users by name', () => {
      const result = filterUsersByText(mockUsers, 'John')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('John Doe')
    })

    it('should filter users by email', () => {
      const result = filterUsersByText(mockUsers, 'jane@example')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Jane Smith')
    })
  })

  describe('filterUsersByCity', () => {
    it('should return all users when no cities are selected', () => {
      expect(filterUsersByCity(mockUsers, [])).toEqual(mockUsers)
    })

    it('should filter users by city', () => {
      const result = filterUsersByCity(mockUsers, ['New York'])
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('John Doe')
    })
  })

  describe('filterUsersByCompany', () => {
    it('should return all users when no companies are selected', () => {
      expect(filterUsersByCompany(mockUsers, [])).toEqual(mockUsers)
    })

    it('should filter users by company', () => {
      const result = filterUsersByCompany(mockUsers, ['XYZ Inc'])
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Jane Smith')
    })
  })

  describe('sortUsers', () => {
    it('should sort users by name in ascending order', () => {
      const result = sortUsers(mockUsers, 'name', 'asc')
      expect(result[0].name).toBe('Jane Smith')
      expect(result[1].name).toBe('John Doe')
    })

    it('should sort users by name in descending order', () => {
      const result = sortUsers(mockUsers, 'name', 'desc')
      expect(result[0].name).toBe('John Doe')
      expect(result[1].name).toBe('Jane Smith')
    })

    it('should sort users by city', () => {
      const result = sortUsers(mockUsers, 'address.city', 'asc')
      expect(result[0].address.city).toBe('Los Angeles')
      expect(result[1].address.city).toBe('New York')
    })
  })

  describe('paginateUsers', () => {
    it('should return correct page of users', () => {
      const result = paginateUsers(mockUsers, 1, 1)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('John Doe')
    })

    it('should return empty array for out of range page', () => {
      const result = paginateUsers(mockUsers, 3, 1)
      expect(result).toHaveLength(0)
    })
  })

  describe('createOptions', () => {
    it('should create options from user cities', () => {
      const result = createOptions(mockUsers, (user) => user.address.city)
      expect(result).toEqual([
        { value: 'New York', label: 'New York' },
        { value: 'Los Angeles', label: 'Los Angeles' },
      ])
    })

    it('should create unique options', () => {
      const usersWithDuplicates = [...mockUsers, mockUsers[0]]
      const result = createOptions(
        usersWithDuplicates,
        (user) => user.address.city
      )
      expect(result).toHaveLength(2)
    })
  })
})
