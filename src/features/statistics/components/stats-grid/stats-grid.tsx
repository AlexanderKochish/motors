import { Statistics } from "@/features/statistics/repositories/statistics";
import styles from "./stats-grid.module.css";
import { QueryClient } from "@tanstack/react-query";

export default async function StatsGrid() {
  const service = new Statistics();

  const [appointments, reviews, pendingReviews, average] = await Promise.all([
    service.getTableCount("appointments"),
    service.getTableCount("reviews"),
    service.getPendigTableCount("reviews"),
    service.getAverageRating(),
  ]);

  const getBadgeVariant = (trend: string) => {
    return trend === "up" ? styles.badgeDefault : styles.badgeDestructive;
  };

  const stats = [
    {
      title: "Total Appointments",
      value: appointments,
      change: "+12%",
      description: "From last month",
      icon: "📅",
      trend: "up",
    },
    {
      title: "Pending Reviews",
      value: reviews,
      change: pendingReviews > 0 ? `+${pendingReviews}` : 0,
      description: "Awaiting moderation",
      icon: "⭐",
      trend: "up",
    },
    {
      title: "Customer Satisfaction",
      value: average,
      change: "+0.2",
      description: "Average rating",
      icon: "😊",
      trend: "up",
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{stat.title}</h3>
            <div className={styles.cardIcon}>{stat.icon}</div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardValue}>{stat.value}</div>
            <div className={styles.cardFooter}>
              <span className={`${styles.badge} ${getBadgeVariant(stat.trend)}`}>
                {stat.change}
              </span>
              <p className={styles.cardDescription}>{stat.description}</p>
            </div>
          </div>
          <div className={styles.accentBar}></div>
        </div>
      ))}
    </div>
  );
}
