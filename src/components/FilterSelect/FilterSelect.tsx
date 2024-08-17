import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux'
import { Select } from 'antd'
import { RootState } from 'app/store'

const { Option } = Select

interface Option {
  value: string
  label: string
}

interface FilterProps {
  options: Option[]
  placeholder: string
  selector: (state: RootState) => string[]
  action: (value: string[]) => { type: string; payload: string[] }
  className?: string
  allowClear: boolean
}

const FilterSelect: React.FC<FilterProps> = ({
  options,
  placeholder,
  selector,
  action,
  className,
  allowClear = false,
}) => {
  const dispatch = useAppDispatch()
  const filterValue = useAppSelector(selector)

  const handleChange = useCallback(
    (selectedValues: string[]) => {
      if (!selectedValues || selectedValues.length === 0) {
        dispatch(action([]))
      } else {
        dispatch(action(selectedValues))
      }
    },
    [dispatch, action]
  )

  return (
    <div className={className}>
      <Select
        allowClear={allowClear}
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={placeholder}
        value={filterValue}
        onChange={handleChange}
        optionFilterProp="children"
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  )
}

FilterSelect.displayName = 'FilterSelect'

export default FilterSelect
