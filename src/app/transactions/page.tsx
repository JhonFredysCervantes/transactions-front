"use client";

import useTransactions from "@/components/Hooks/UseTransactions";
import { Button } from "@/components/shared/Button";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import { useState, useEffect } from "react";
import { payTransactions, deleteTransactions } from "@/services/services";
import { SearchParameters } from "@/models/SearchParameters";
import { TransactionsFilter } from "@/components/Filter";
import styles from "./Transactions.module.css";
import { ModalCustom } from "@/components/shared/Modal";
import Image from "next/image";

interface TransactionsProps {
  searchParams: SearchParameters;
}

export default function TransactionsPage(props: TransactionsProps) {
  const { transactions, fetchTransactions } = useTransactions();
  const [selectedTransactions, setSelectedTransactions] = useState(
    [] as string[]
  );
  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isWarningMessage, setIsWarningMessage] = useState(false);

  const handleSuccess = () => {
    setModalMessage("Operación exitosa");
    setIsErrorMessage(false);
    setIsWarningMessage(false);
    setIsModalOpen(true);
    fetchTransactions(props.searchParams, handleError);
  };

  const handleError = (error?: string) => {
    setModalMessage("Operación fallida. \n" + error);
    setIsErrorMessage(true);
    setIsWarningMessage(false);
    setIsModalOpen(true);
  };

  const handleWarning = (message: string) => {
    setModalMessage("Importante. \n" + message);
    setIsWarningMessage(true);
    setIsErrorMessage(false);
    setIsModalOpen(true);
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

  useEffect(() => {
    fetchTransactions(props.searchParams, handleError);
  },);

  return (
    <div className={styles.Transactions}>
      <h1>Transacciones</h1>
      <Image
        className={styles.Img}
        src="/images/transaction-icon.jpg"
        width={100}
        height={100}
        alt="Icono de transacción"
    
      />
      <TransactionsFilter
        searchParams={props.searchParams}
        onSearch={fetchTransactions}
        handleError={handleError}
      />
      <Button
        typeButton="secondary"
        disabled={false}
        onClick={() => {
          window.location.href = "/transactions/create";
        }}
      >
        Ir a crear
      </Button>
      <TransactionsList
        transactions={transactions}
        onSelect={handleSelectedTransactions}
      />
      <div className={styles.paySection}>
        <span>$</span>
        <input
          className={styles.payInput}
          disabled={selectedTransactions.length === 0}
          type="number"
          placeholder="Amount"
          min={0}
          value={amount}
          onChange={handleOnChangeAmount}
        />
        <Button
          typeButton="warning"
          disabled={selectedTransactions.length === 0}
          onClick={() =>
            //showWarningToDelete()
            deleteTransactions(selectedTransactions, handleSuccess, handleError)
          }
        >
          Eliminar
        </Button>
        <Button
          typeButton="primary"
          disabled={selectedTransactions.length === 0}
          onClick={() =>
            payTransactions(
              selectedTransactions,
              amount,
              handleSuccess,
              handleError,
              handleWarning
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
        isWarningMessage={isWarningMessage}
      />
    </div>
  );
}
