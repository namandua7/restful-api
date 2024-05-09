import axios from 'axios';

export const handleLogin = async (e, email, password) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:3000/api/v1/users/sign_in',
      { email, password }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};