import React from 'react'
import { User } from 'types/User'
import { SortField } from 'slices/user/sortSlice'

import TableHeader from 'pages/UsersPage/components/UserTable/components/TableHeader'
import TableRow from 'pages/UsersPage/components/UserTable/components/TableRow'

import PageNavigator from 'components/PageNavigator'

import './styles.scss'

interface UserTableProps {
  users: User[]
  sortField: SortField
  onUsersSort: (field: SortField) => void
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  sortField,
  onUsersSort,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="user-table">
      <div className="user-table__container">
        <table>
          <TableHeader sortField={sortField} onUsersSort={onUsersSort} />
          <tbody>
            {users.map((user) => (
              <TableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <PageNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default UserTable
