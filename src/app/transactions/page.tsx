"use client";

import useTransactions from "@/components/Hooks/UseTransactions";
import { Button } from "@/components/shared/Button";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import { useState, useEffect } from "react";
import { payTransactions } from "@/services/services";
import { SearchParameters } from "@/models/SearchParameters";
import { TransactionsFilter } from "@/components/Filter";
import styles from "./Transactions.module.css";
import { ModalCustom } from "@/components/shared/Modal/Modal";

interface TransactionsProps {
  searchParams: SearchParameters;
}

export default function TransactionsPage(props: TransactionsProps) {
  const { transactions, fetchTransactions } = useTransactions();
  const [selectedTransactions, setSelectedTransactions] = useState(
    [] as string[]
  );
  const [amount, setAmount] = useState(0);
  const [buttonPayDisabled, setButtonPayDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const handleSuccess = () => {
    setModalMessage("Operación exitosa");
    setIsErrorMessage(false);
    setIsModalOpen(true);
  };

  const handleError = (error?: string) => {
    setModalMessage("Operación fallida. \n" + error);
    setIsErrorMessage(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTransactions(props.searchParams, handleError);
  }, []);

  const handleSelectedTransactions = (id: string) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(
        selectedTransactions.filter((transaction) => transaction !== id)
      );
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }

    if (selectedTransactions.length === 0) {
      setButtonPayDisabled(false);
    } else {
      setButtonPayDisabled(true);
    }
  };

  const handleOnChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <div className={styles.Transactions}>
      <h1>Transacciones</h1>
      <TransactionsFilter
        searchParams={props.searchParams}
        onSearch={fetchTransactions}
      />
      <TransactionsList
        transactions={transactions}
        onChange={handleSelectedTransactions}
      />
      <div className={styles.paySection}>
        {selectedTransactions.length > 0 && (
          <input
            className={styles.payInput}
            type="number"
            placeholder="Amount"
            min={0}
            value={amount}
            onChange={handleOnChangeAmount}
          />
        )}
        <Button
          disabled={buttonPayDisabled}
          onClick={() =>
            payTransactions(
              selectedTransactions,
              amount,
              handleSuccess,
              handleError
            )
          }
        >
          Pagar
        </Button>
      </div>
      <ModalCustom
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalMessage={modalMessage}
        isErrorMessage={isErrorMessage}
      />
    </div>
  );
}
