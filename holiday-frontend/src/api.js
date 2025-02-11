import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Adjust if your backend runs on a different port

export const getHolidays = async (country = "US", year = "2024") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/holidays/`, {
            params: { country, year }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return [];
    }
};
