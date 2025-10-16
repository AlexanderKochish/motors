"use client";
import styles from "./recentlist-card.module.css";

interface RecentListCardProps<T> {
  title: string;
  description: string;
  data?: T[];
  renderItem: (item: T) => React.ReactNode;
  viewAllLabel?: string;
  onViewAll?: () => void;
}

export default function RecentListCard<T>({
  title,
  description,
  data = [],
  renderItem,
  viewAllLabel = "View All",
  onViewAll,
}: RecentListCardProps<T>) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.list}>
          {data.length > 0 ? (
            data.map((item, i) => <div key={i}>{renderItem(item)}</div>)
          ) : (
            <p className={styles.empty}>No data available</p>
          )}
        </div>

        <button className={styles.viewAllButton} onClick={onViewAll}>
          {viewAllLabel}
        </button>
      </div>
    </div>
  );
}
