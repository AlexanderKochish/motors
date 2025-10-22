"use client";

import Loading from "@/shared/components/loading/loading";
import RecentListCard from "@/shared/components/recentlist-card/recentlist-card";
import { useAppointments } from "../../hooks/useAppointments";
import RecentAppointmentCard from "../recent-appointment-card/recent-appointment-card";
import { useRouter } from "next/navigation";
import ErrorBlock from "@/shared/components/error-block/error-block";

export default function RecentAppointments() {
  const router = useRouter();
  const { recentAppointments, isLoading, isErrorToGetData } = useAppointments();
  if (isLoading) {
    return <Loading />;
  }

  if (isErrorToGetData) {
    return (
      <ErrorBlock
        title="Error Recent Appointments"
        message="Something went wrong.Try again later."
      />
    );
  }
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
