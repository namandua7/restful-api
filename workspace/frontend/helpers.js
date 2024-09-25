import axios from 'axios';

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/users/sign_in',
      { email, password }
    );
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};