import React from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  current: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ current, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  const addPage = (page: number | string) => pages.push(page);

  // всегда показываем первую
  addPage(1);

  // если далеко от начала
  if (current > 4) addPage("...");

  // диапазон около текущей
  for (let p = Math.max(2, current - 2); p <= Math.min(totalPages - 1, current + 2); p++) {
    addPage(p);
  }

  // если далеко от конца
  if (current < totalPages - 3) addPage("...");

  // последняя
  if (totalPages > 1) addPage(totalPages);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
      >
        {"<"}
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`${styles.page} ${p === current ? styles.active : ""}`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className={styles.ellipsis}>
            {p}
          </span>
        ),
      )}

      <button
        className={styles.arrow}
        disabled={current === totalPages}
        onClick={() => onPageChange(current + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
