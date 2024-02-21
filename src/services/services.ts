import axios from "axios";

const API_URL = "http://localhost:8080/api";
const TRANSACTIONS_PATH = "/transactions";

export const findTransactions = async (
  name: string,
  status: string,
  fromDate: string,
  toDate: string
) => {
  try {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);
    if (fromDate) params.append('fromDate', fromDate);
    if (toDate) params.append('toDate', toDate);
    
    const queryString = API_URL.concat(TRANSACTIONS_PATH, '?', params.toString());

    const response = await axios.get(queryString);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const payTransactions = async (ids: string[], amount: number) => {
  try {
    const response = await axios.post(`${API_URL + TRANSACTIONS_PATH}/pay`, { ids, amount });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
