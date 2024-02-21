import { SearchParameters } from "@/models/SearchParameters";
import { useState } from "react";
import { Button } from "../shared/Button";
import styles from "./TransactionsFilter.module.css";

interface TransactionsFilterProps {
  searchParams: SearchParameters;
  onSearch: (searchParams: SearchParameters, handleError: () => void) => void;
  handleError: () => void;
}

export function TransactionsFilter(props: TransactionsFilterProps) {
  const [searchParams, setSearchParams] = useState(props.searchParams);
  const currentDate = new Date().toISOString().split("T")[0];

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

  return (
    <div className={styles.TransactionsFilter}>
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
          value={!searchParams.fromDate ? currentDate : searchParams.fromDate}
          onChange={handleChangeFromDate}
        />
      </label>
      <label>
        Hasta:
        <input
          type="date"
          value={!searchParams.toDate ? currentDate : searchParams.toDate}
          onChange={handleChangeToDate}
        />
      </label>
      <Button isPrimary={false} disabled={false} onClick={() => props.onSearch(searchParams, props.handleError)}>Filtrar</Button>
    </div>
  );
}
