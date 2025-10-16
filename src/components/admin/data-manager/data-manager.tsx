"use client";
import styles from "./data-manager.module.css";
import Loading from "@/components/ui/loading/loading";
import ErrorBlock from "@/components/ui/error-block/error-block";
import { Pagination } from "@/components/ui/pagination/pagination";
import React from "react";

interface DataManagerProps {
  title?: string;
  description?: string;
  state: {
    isLoading: boolean;
    isError: boolean;
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
  };
  children: React.ReactNode;
}

export default function DataManager({ title, description, state, children }: DataManagerProps) {
  const { isLoading, isError, page, totalPages, setPage } = state;

  const showPagination = totalPages > 1;

  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{title}</h2>
        {description && <p className={styles.cardDescription}>{description}</p>}
      </header>

      <div className={styles.cardContent}>
        {isLoading && <Loading />}
        {isError && <ErrorBlock />}
        {!isLoading && !isError && children}

        {!isLoading && !isError && React.Children.count(children) === 0 && (
          <div className={styles.emptyState}>
            <p>No appointments found</p>
          </div>
        )}
      </div>

      {showPagination && (
        <Pagination current={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
