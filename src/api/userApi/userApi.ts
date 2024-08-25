import axios from 'axios'
import { User } from 'types/User'

interface RandomUserName {
  first: string
  last: string
}

interface RandomUserLogin {
  uuid: string
  username: string
  salt: string
  md5: string
}

interface RandomUserLocation {
  street: {
    number: number
    name: string
  }
  city: string
  postcode: string
  timezone: {
    description: string
  }
}

interface RandomUserResult {
  name: RandomUserName
  login: RandomUserLogin
  email: string
  location: RandomUserLocation
  phone: string
  nat: string
}

interface RandomUserResponse {
  results: RandomUserResult[]
}

export const userApi = {
  getUsers: async (count = 100): Promise<User[]> => {
    try {
      const response = await axios.get<RandomUserResponse>(
        `https://randomuser.me/api/?results=${count}`
      )
      return response.data.results.map((user: RandomUserResult) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        username: user.login.username,
        email: user.email,
        address: {
          street: `${user.location.street.number} ${user.location.street.name}`,
          suite: user.location.postcode,
          city: user.location.city,
          zipcode: user.location.postcode,
        },
        phone: user.phone,
        website: user.nat,
        company: {
          name: user.location.timezone.description,
          catchPhrase: user.login.salt,
          bs: user.login.md5,
        },
      }))
    } catch (error) {
      throw new Error('Failed to get users')
    }
  },
}
