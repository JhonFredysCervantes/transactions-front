import { useState } from "react";
import { Transaction } from "@/models/Transaction";
import { findTransactions } from "@/services/services";
import { SearchParameters } from "@/models/SearchParameters";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([] as Transaction[]);

  const fetchTransactions = async (params: SearchParameters) => {
    const data = await findTransactions(params.name, params.status, params.fromDate, params.toDate);
    console.log(data);
    setTransactions(data);
  };

  return { transactions, fetchTransactions };
}
