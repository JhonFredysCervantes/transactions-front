import { Transaction } from "@/models/Transaction";
import styles from "./TransactionsList.module.css";

interface TransactionsListProps {
  transactions: Transaction[];
  onChange: (id: string) => void;
}

export function TransactionsList({
  transactions,
  onChange,
}: TransactionsListProps) {
  return (
    <table className={styles.TransactionsList}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Selección</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.name}</td>
            <td>{transaction.status}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.createdAt}</td>
            <td>
              <input type="checkbox" onChange={() => onChange(transaction.id) }></input>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
