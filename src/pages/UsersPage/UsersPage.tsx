import React, { useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { User } from 'types/User'
import {
  selectFilterText,
  selectCityFilter,
  selectCompanyFilter,
} from 'slices/user/filterSlice'
import {
  selectUsers,
  selectIsLoading,
  selectError,
  selectCurrentPage,
  fetchUsers,
  setCurrentPage,
} from 'slices/user/userSlise'
import {
  selectSortField,
  selectSortDirection,
  setSortField,
  toggleSortDirection,
  SortField,
} from 'slices/user/sortSlice'
import NoDataMessage from 'components/NoDataMessage/NoDataMessage'
import UserTable from 'pages/UsersPage/components/UserTable/UserTable'
import TableFilters from 'pages/UsersPage/components/UserTable/components/TableFilters/TableFilters'
import { AppDispatch, RootState } from 'app/store'
import {
  filterUsersByText,
  filterUsersByCity,
  filterUsersByCompany,
  sortUsers,
  paginateUsers,
  createOptions,
} from 'utils/userUtils'

import './styles.scss'
import { isEmpty } from 'ramda'

const PER_PAGE = 10

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => selectUsers(state))
  const isLoading = useSelector((state: RootState) => selectIsLoading(state))
  const error = useSelector((state: RootState) => selectError(state))
  const currentPage = useSelector((state: RootState) =>
    selectCurrentPage(state)
  )
  const sortField = useSelector((state: RootState) => selectSortField(state))
  const sortDirection = useSelector((state: RootState) =>
    selectSortDirection(state)
  )
  const filterText = useSelector((state: RootState) => selectFilterText(state))
  const selectedCities = useSelector((state: RootState) =>
    selectCityFilter(state)
  )
  const selectedCompanies = useSelector((state: RootState) =>
    selectCompanyFilter(state)
  )

  const filteredAndSortedUsers = useMemo(() => {
    let result = users
    if (filterText) {
      result = filterUsersByText(result, filterText)
    }
    if (selectedCities.length > 0) {
      result = filterUsersByCity(result, selectedCities)
    }
    if (selectedCompanies.length > 0) {
      result = filterUsersByCompany(result, selectedCompanies)
    }
    return sortUsers(result, sortField, sortDirection)
  }, [
    users,
    filterText,
    selectedCities,
    selectedCompanies,
    sortField,
    sortDirection,
  ])

  const currentUsers = useMemo(
    () => paginateUsers(filteredAndSortedUsers, currentPage, PER_PAGE),
    [filteredAndSortedUsers, currentPage]
  )

  const totalPages = Math.ceil(filteredAndSortedUsers.length / PER_PAGE)

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      dispatch(setCurrentPage(pageNumber))
    },
    [dispatch]
  )

  const handleSortUsers = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        dispatch(toggleSortDirection())
      } else {
        dispatch(setSortField(field))
      }
    },
    [dispatch, sortField]
  )

  const cityOptions = useMemo(
    () => createOptions(users, (user: User) => user.address.city),
    [users]
  )

  const companyOptions = useMemo(
    () => createOptions(users, (user: User) => user.company.name),
    [users]
  )

  const handleLoadUsers = useCallback(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    handleLoadUsers()
  }, [])

  return (
    <div className="users-page">
      <header className="users-page__header">
        <h1 className="users-page__title">List of users</h1>
        <Button disabled={isLoading} onClick={handleLoadUsers}>
          Reload Users
        </Button>
      </header>

      <TableFilters cityOptions={cityOptions} companyOptions={companyOptions} />
      {isEmpty(filteredAndSortedUsers) && !isLoading ? (
        <NoDataMessage message="No users found" />
      ) : (
        <UserTable
          error={error}
          isLoading={isLoading}
          users={currentUsers}
          sortField={sortField}
          onUsersSort={handleSortUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default UsersPage
