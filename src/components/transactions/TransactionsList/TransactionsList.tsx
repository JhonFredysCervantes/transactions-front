import { Transaction } from "@/models/Transaction";
import styles from "./TransactionsList.module.css";

interface TransactionsListProps {
  transactions: Transaction[];
  onSelect: (id: string) => void;
}

export function TransactionsList({
  transactions,
  onSelect,
}: TransactionsListProps) {
  return (
    <table className={styles.TransactionsList}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Selección</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.status}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.createdAt.split(" ")[0]}</td>
              <td>{transaction.createdAt.split(" ")[1]}</td>
              <td>
                <input
                  type="checkbox"
                  disabled={transaction.status === "PAID"}
                  onClick={() => onSelect(transaction.id)}
                ></input>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No hay registros</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
