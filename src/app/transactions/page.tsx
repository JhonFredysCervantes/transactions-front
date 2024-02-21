"use client";

import useTransactions from "@/components/Hooks/UseTransactions";
import { Button } from "@/components/shared/Button";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import { useState, useEffect } from "react";
import { payTransactions } from "@/services/services";
import { SearchParameters } from "@/models/SearchParameters";

interface TransactionsProps {
  searchParams: SearchParameters;
}

export default function TransactionsPage(props: TransactionsProps) {
  const { transactions, fetchTransactions } = useTransactions();
  const [selectedTransactions, setSelectedTransactions] = useState(
    [] as string[]
  );
  const [searchParams, setSearchParams] = useState(props.searchParams);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchTransactions(searchParams);
  }, []);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, name: event.target.value });
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, status: event.target.value });
  };

  const handleChangeFromDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, fromDate: event.target.value });
  };

  const handleChangeToDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, toDate: event.target.value });
  };

  const handleSelectedTransactions = (id: string) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(
        selectedTransactions.filter((transaction) => transaction !== id)
      );
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  const handleOnChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <div>
      <h1>Transactions</h1>
      <form
        onSubmit={() =>
          fetchTransactions(
            searchParams.name,
            searchParams.status,
            searchParams.fromDate,
            searchParams.toDate
          )
        }
      >
        <label>
          Nombre:
          <input
            type="text"
            value={searchParams.name}
            onChange={handleChangeName}
          />
        </label>
        <label>
          Estado:
          <select value={searchParams.status} onChange={handleChangeStatus}>
            <option value="">Todos</option>
            <option value="PENDING">Pendientes</option>
            <option value="PAID">Pagadas</option>
          </select>
        </label>
        <label>
          Desde:
          <input
            type="date"
            value={searchParams.fromDate}
            onChange={handleChangeFromDate}
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={searchParams.toDate}
            onChange={handleChangeToDate}
          />
        </label>
        <button type="submit">Filtrar</button>
      </form>
      <TransactionsList
        transactions={transactions}
        onChange={handleSelectedTransactions}
      />
      {selectedTransactions.length > 0 && (
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={handleOnChangeAmount}
        />
      )}
      <div>
        <Button onClick={() => payTransactions(selectedTransactions, amount)}>
          Pagar
        </Button>
      </div>
    </div>
  );
}
