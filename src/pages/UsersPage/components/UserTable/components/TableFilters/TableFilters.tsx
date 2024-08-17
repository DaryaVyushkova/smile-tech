import React from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux'
import FilterSelect from 'components/FilterSelect'
import {
  setFilterText,
  setCityFilter,
  setCompanyFilter,
  selectFilterText,
  selectCityFilter,
  selectCompanyFilter,
} from 'slices/user/filterSlice'
import FilterInput from 'components/FilterInput'

interface UserFiltersProps {
  cityOptions: { value: string; label: string }[]
  companyOptions: { value: string; label: string }[]
}

const TableFilters: React.FC<UserFiltersProps> = ({
  cityOptions,
  companyOptions,
}) => {
  const dispatch = useAppDispatch()
  const filterText = useAppSelector(selectFilterText)

  const handleFilterInputChange = (value: string) => {
    dispatch(setFilterText(value))
  }

  return (
    <div className="user-table__filters">
      <FilterInput
        value={filterText}
        onChange={handleFilterInputChange}
        placeholder="Filter users by name/username/email..."
      />
      <FilterSelect
        allowClear
        options={cityOptions}
        placeholder="Select cities"
        selector={selectCityFilter}
        action={setCityFilter}
      />
      <FilterSelect
        allowClear
        options={companyOptions}
        placeholder="Select companies"
        selector={selectCompanyFilter}
        action={setCompanyFilter}
      />
    </div>
  )
}

export default TableFilters
