"use client";
import { getMonthlyAppointments } from "@/app/actions/analytics";
import styles from "./analytics.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/loading/loading";
import ErrorBlock from "@/components/ui/error-block/error-block";

export default function AnalyticsDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics", "appointments"],
    queryFn: getMonthlyAppointments,
  });

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Appointments Analytics</h2>
          <p className={styles.cardDescription}>Monthly revenue and services performance</p>
        </div>

        <div className={styles.cardContent}>
          {isLoading && <Loading />}
          {isError && <ErrorBlock message="Failed to load analytics data" />}

          {!isLoading && !isError && data && (
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#10b981"
                    fill="url(#colorTotal)"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#059669" }}
                    name="Total Appointments"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
