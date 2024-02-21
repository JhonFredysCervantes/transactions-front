import { useState } from "react";
import { Transaction } from "@/models/Transaction";
import { findTransactions } from "@/services/services";
import { SearchParameters } from "@/models/SearchParameters";
import { format, parseISO } from "date-fns";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([] as Transaction[]);

  const fetchTransactions = async (params: SearchParameters, 
    handleError: (error: string) => void) => {
    let fromDate: string = "";
    let toDate: string = "";
    if (!params.fromDate) {
      fromDate = format(new Date(), "yyyy-MM-dd") + "T00:00:00-05:00[America/Bogota]";
    } else {
      fromDate = format(parseISO(params.fromDate), "yyyy-MM-dd") + "T00:00:00-05:00[America/Bogota]";
    }

    if (!params.toDate) {
      toDate = format(new Date(), "yyyy-MM-dd") + "T23:59:59-05:00[America/Bogota]";
    } else {
      toDate = format(parseISO(params.toDate), "yyyy-MM-dd") + "T23:59:59-05:00[America/Bogota]";
    }

    const data = await findTransactions(
      params.name,
      params.status,
      fromDate,
      toDate,
      handleError
    );
    data.forEach((transaction: Transaction) => {
      transaction.createdAt = format(
        parseISO(transaction.createdAt),
        "dd/MM/yyyy HH:mm:ss"
      );
    });
    setTransactions(data);
  };

  return { transactions, fetchTransactions };
}
