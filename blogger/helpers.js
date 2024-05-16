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

export const handleSearch = async (value) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/articles/search`, {
      params: { q: value }
    });
    if (response.data.length === 0) {
      return { title: '', desciption: "I don't have the answer of the given keyword." };
    }
    const { title, desciption } = response.data[0];
    return { title, desciption };
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

export const handleArticleCreation = async (title, desciption, keyword) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/articles',
      { title, desciption, keyword }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}

export const getArticleKeywords = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/articles/');
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}