import * as httpRequest from '~/utils/httpRequest';
const registerUser = async info => {
  try {
    const data = await httpRequest.post('/users', info);
    return data;
  } catch (error) {
    console.error('Error registering user', error);
  }
};
const login = async info => {
  try {
    const data = await httpRequest.post('/auth/login', info);

    return data;
  } catch (error) {
    console.log('Error logging in user', error.response?.data?.message);
    throw error;
  }
};
const getProfile = async () => {
  try {
    const data = await httpRequest.get('auth/profile');
    return data.data;
  } catch (error) {
    console.error('Error getting profile', error);
  }
};
export { registerUser, login, getProfile };
