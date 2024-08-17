import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

export type SortField = 'name' | 'username' | 'address.city' | 'company.name'
export type SortDirection = 'asc' | 'desc'
interface SortState {
  sortField: SortField
  sortDirection: SortDirection
}

const initialState: SortState = {
  sortField: 'name',
  sortDirection: 'asc',
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload
      state.sortDirection = 'asc'
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc'
    },
  },
})

export const { setSortField, toggleSortDirection } = sortSlice.actions

export const selectSortField = (state: RootState) => state.sort.sortField
export const selectSortDirection = (state: RootState) =>
  state.sort.sortDirection

export default sortSlice.reducer
