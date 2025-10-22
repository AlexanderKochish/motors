"use client";

import AppointmentsList from "../appointments-list/appointments-list";
import DataManager from "../../../../shared/components/data-manager/data-manager";
import FilterPanel from "../../../../widgets/filter-panel/filter-panel";
import { useState } from "react";
import { AppointmentStatus } from "@/types";
import { useAppointments } from "../../hooks/useAppointments";

export default function AppointmentsManager() {
  const [filter, setFilter] = useState<AppointmentStatus>("pending");
  const { data, total, counts, ...state } = useAppointments(filter, "", 2);

  const handleFilter = (filter: AppointmentStatus) => {
    setFilter(filter);
  };

  const filters = [
    { id: "all" as AppointmentStatus, label: "All", count: counts.all },
    { id: "pending" as AppointmentStatus, label: "Pending", count: counts.pending },
    { id: "confirmed" as AppointmentStatus, label: "Confirmed", count: counts.confirmed },
    { id: "completed" as AppointmentStatus, label: "Completed", count: counts.completed },
  ];

  return (
    <div>
      <FilterPanel activeFilter={filter} onFilterChange={handleFilter} filters={filters} />
      <DataManager
        title="Appointments Management"
        description="Manage all customer appointments"
        state={state}
      >
        <AppointmentsList appointments={data} />
      </DataManager>
    </div>
  );
}
