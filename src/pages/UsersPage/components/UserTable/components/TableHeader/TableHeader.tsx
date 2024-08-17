import React from 'react'
import { SortField } from 'slices/user/sortSlice'
import Icon from 'components/Icon'
import { ReactComponent as SortSVG } from 'assets/icons/sort.svg'
import styled from 'styled-components'

interface HeaderProps {
  sortField: SortField
  onUsersSort: (field: SortField) => void
}

const HeaderContent = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Header: React.FC<HeaderProps> = ({ sortField, onUsersSort }) => {
  const getSortIcon = (field: SortField) => {
    const isActive = sortField === field
    return (
      <Icon
        icon={SortSVG}
        className={`sort-icon ${isActive ? 'active' : ''}`}
        color={isActive ? '#000' : '#7e7777'}
      />
    )
  }

  const renderSortableHeader = (field: SortField, label: string) => (
    <th data-sortable={true} onClick={() => onUsersSort(field)}>
      <HeaderContent>
        {label}
        {getSortIcon(field)}
      </HeaderContent>
    </th>
  )

  return (
    <thead>
      <tr>
        {renderSortableHeader('name', 'Name')}
        {renderSortableHeader('username', 'Username')}
        <th>Email</th>
        {renderSortableHeader('address.city', 'City')}
        <th>Phone</th>
        {renderSortableHeader('company.name', 'Company')}
      </tr>
    </thead>
  )
}

export default Header
