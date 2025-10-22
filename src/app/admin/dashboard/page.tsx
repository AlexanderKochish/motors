import StatsGrid from "@/features/statistics/components/stats-grid/stats-grid";
import styles from "./dashboard.module.css";
import RecentAppointments from "@/features/appointments/components/recent-appointments/recent-appointments";
import RecentReviews from "@/features/reviews/components/recent-reviews/recent-reviews";

export default function Dashboard() {
  return (
    <div className={styles.dashboardContent}>
      <StatsGrid />
      <div className={styles.dashboardGrid}>
        <RecentAppointments />
        <RecentReviews />
      </div>
    </div>
  );
}
