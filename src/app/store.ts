import { configureStore } from '@reduxjs/toolkit'
import sortReducer from 'slices/user/sortSlice'
import filterReducer from 'slices/user/filterSlice'
import userReducer from 'slices/user/userSlise'

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    filter: filterReducer,
    users: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
