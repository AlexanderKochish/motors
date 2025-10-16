import { Appointments } from "@/types";
import styles from "./sort-icon.module.css";

interface Props {
  field: keyof Appointments;
  sortField: keyof Appointments;
  sortDirection: "asc" | "desc";
}

export default function SortIcon({ field, sortField, sortDirection }: Props) {
  if (sortField !== field) {
    return (
      <svg
        className={styles.sortIcon}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
      </svg>
    );
  }

  return (
    <svg
      className={`${styles.sortIcon} ${sortDirection === "asc" ? styles.sortAsc : styles.sortDesc}`}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {sortDirection === "asc" ? <path d="M7 15l5 5 5-5" /> : <path d="M7 9l5-5 5 5" />}
    </svg>
  );
}
