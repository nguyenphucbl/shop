import axios from 'axios';
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response;
};
export default httpRequest;
