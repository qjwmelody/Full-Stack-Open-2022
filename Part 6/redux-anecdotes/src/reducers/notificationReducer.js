import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux store works'
  }
]

const notificationReducer = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state.push({
        content
      })
    }
  }
})

export const { createNotification } = notificationReducer.actions
export default notificationReducer.reducer