import axios from "axios";

const API_URL = "http://localhost:8080/api";
const TRANSACTIONS_PATH = "/transactions";

export const createTransaction = async (
  name: string,
  amount: number,
  handleSusses: () => void,
  handleError: (error: string) => void
) => {
  try {
    await axios.post(API_URL + TRANSACTIONS_PATH, { name, amount });
    handleSusses();
  } catch (error) {
    handleError(error as string);
  }
};

export const findTransactions = async (
  name: string,
  status: string,
  fromDate: string,
  toDate: string,
  handleError: (error: string) => void
) => {
  try {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (status) params.append("status", status);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    const queryString = API_URL.concat(
      TRANSACTIONS_PATH,
      "?",
      params.toString()
    );

    const response = await axios.get(queryString);
    return response.data;
  } catch (error) {
    handleError(error as string);
  }
};

export const payTransactions = async (
  ids: string[],
  amount: number,
  handleSusses: () => void,
  handleError: (error: string) => void,
  handleWarning: (string: string) => void
) => {
  try {
    const response = await axios.post(`${API_URL + TRANSACTIONS_PATH}/pay`, {
      ids,
      amount,
    });
    handleSusses();
    var data = response.data;
    if (
      data.map((transaction: any) => transaction.status).includes("PENDING")
    ) {
      handleWarning("Algunas transacciones no se pudieron pagar");
    }
  } catch (error) {
    handleError(error as string);
  }
};
