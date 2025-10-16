import StatsGrid from "@/components/admin/stats-grid/stats-grid";
import styles from "./dashboard.module.css";
import RecentAppointments from "@/components/appointments/recent-appointments/recent-appointments";
import RecentReviews from "@/components/reviews/recent-reviews/recent-reviews";

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
