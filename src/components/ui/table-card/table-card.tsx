import React, { ReactNode } from "react";
import styles from "./table-card.module.css";

interface Props {
  children: ReactNode;
}

const TableCard = ({ children }: Props) => {
  return <div className={styles.card}>{children}</div>;
};

export default TableCard;
