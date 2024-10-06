import axios from 'axios';

// Fetch the API base URL from environment variables or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

/**
 * Sends data to the /predict endpoint of the Flask API to get an election prediction
 * @param data - The data to be sent for prediction (e.g., election data)
 * @returns - The result of the prediction
 */
export const predictElection = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    console.log("abdul", response.data);
    return response.data;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};

/**
 * Fetches polling data from the /fetch-data endpoint of the Flask API
 * @returns - The polling data from the API
 */
export const fetchPollingData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-data`);
    return response.data;
  } catch (error) {
    console.error('Fetch Data API error:', error);
    throw error;
  }
};
