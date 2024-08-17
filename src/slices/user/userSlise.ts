import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'types/User'
import { userApi } from 'api/userApi/userApi'
import { RootState } from 'app/store'

interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
  currentPage: number
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  currentPage: 1,
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.getUsers(100)
    } catch (err) {
      return rejectWithValue('Failed to fetch users')
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage } = userSlice.actions

export const selectUsers = (state: RootState) => state.users.users
export const selectIsLoading = (state: RootState) => state.users.isLoading
export const selectError = (state: RootState) => state.users.error
export const selectCurrentPage = (state: RootState) => state.users.currentPage

export default userSlice.reducer
