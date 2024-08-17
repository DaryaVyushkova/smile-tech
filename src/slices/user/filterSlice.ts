import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

interface FilterState {
  filterText: string
  cityFilter: string[]
  companyFilter: string[]
}

const initialState: FilterState = {
  filterText: '',
  cityFilter: [],
  companyFilter: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload
    },
    setCityFilter: (state, action: PayloadAction<string[]>) => {
      state.cityFilter = action.payload
    },
    setCompanyFilter: (state, action: PayloadAction<string[]>) => {
      state.companyFilter = action.payload
    },
  },
})

export const { setFilterText, setCityFilter, setCompanyFilter } =
  filterSlice.actions

export const selectFilterText = (state: RootState) => state.filter.filterText
export const selectCityFilter = (state: RootState) => state.filter.cityFilter
export const selectCompanyFilter = (state: RootState) =>
  state.filter.companyFilter

export default filterSlice.reducer
