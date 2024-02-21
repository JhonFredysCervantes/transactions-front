"use client";

import { Button } from "@/components/shared/Button";
import styles from "./CreateTransaction.module.css";
import { useState } from "react";
import { createTransaction } from "@/services/services";
import { ModalCustom } from "@/components/shared/Modal";

export default function CreateTransaction() {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const handleSuccess = () => {
    setModalMessage("Operación exitosa");
    setIsErrorMessage(false);
    setIsModalOpen(true);
    window.location.href = "/transactions";
  };

  const handleError = (error?: string) => {
    setModalMessage("Operación fallida. \n" + error);
    setIsErrorMessage(true);
    setIsModalOpen(true);
  };

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div className={styles.CreateTransaction}>
      <h1>Crear transaction</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleNameChange} />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleAmountChange}
        />
        <Button
          isPrimary={true}
          disabled={false}
          onClick={() =>
            createTransaction(name, amount, handleSuccess, handleError)
          }
        >
          Crear
        </Button>
      </div>
      <ModalCustom
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalMessage={modalMessage}
        isErrorMessage={isErrorMessage}
        isWarningMessage={false}
      />
    </div>
  );
}
