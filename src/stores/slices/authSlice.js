import { createSlice } from '@reduxjs/toolkit';
import { getProfileUser } from '../middlewares/authMiddleware';

const initialState = {
  user: null,
  profileStatus: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileUser.pending, state => {
        state.profileStatus = 'loading';
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.profileStatus = 'succeeded';
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.error = action.error.message || 'Failed to get profile';
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
