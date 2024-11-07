import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProfile } from '~/services/authService';

const getProfileUser = createAsyncThunk('auth/getProfile', async () => {
  const res = await getProfile();
  return res;
});
export { getProfileUser };
