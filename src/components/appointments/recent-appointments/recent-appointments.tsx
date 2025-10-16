"use client";

import RecentListCard from "../../admin/recentlist-card/recentlist-card";
import RecentAppointmentCard from "../recent-appointment-card/recent-appointment-card";
import { useRouter } from "next/navigation";
import { useAppointments } from "@/hooks/useAppointments";

export default function RecentAppointments() {
  const router = useRouter();
  const { recentAppointments } = useAppointments();
  return (
    <RecentListCard
      title="Recent Appointments"
      description="Today and upcoming appointments"
      data={recentAppointments}
      onViewAll={() => router.push("/admin/appointments")}
      renderItem={(appointment) => <RecentAppointmentCard appointment={appointment} />}
    />
  );
}
