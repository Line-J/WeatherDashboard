import axios from 'axios';

const API_BASE_URL = 'http://<your-local-ip>:3000';

export const getSnowflakeData = async () => {
  const response = await axios.get(`${API_BASE_URL}/data`);
  return response.data;
};

