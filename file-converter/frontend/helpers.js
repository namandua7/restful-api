export const fileUploading = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post('http://localhost:3001/api/v1/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}