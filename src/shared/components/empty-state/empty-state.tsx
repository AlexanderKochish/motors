import { FC, ReactNode } from "react";
import styles from "./empty-state.module.css";

interface Props {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({
  title = "No data found",
  description = "There's nothing to display at the moment",
  icon,
  action,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        {icon || (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default EmptyState;
