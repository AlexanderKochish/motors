import {
  getAllRecentAppointments,
  getApplicationsPage,
  getAppointmentCounts,
  removeAppointment,
  updateAppointmentStatusById,
} from "@/app/actions/appointments";
import { usePaginatedQuery } from "@/shared/hooks/usePaginatedQuery";
import { AppointmentStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAppointments = (
  status?: AppointmentStatus,
  searchTerm?: string,
  limit?: number,
) => {
  const queryClient = useQueryClient();

  const paginatedData = usePaginatedQuery(
    "appointments",
    getApplicationsPage,
    limit ?? 6,
    status,
    searchTerm || "",
  );

  const { data: recentAppointments, isError: isRecentError } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllRecentAppointments,
  });

  const { data: counts, isError: isCountsError } = useQuery({
    queryKey: ["appointment-counts"],
    queryFn: getAppointmentCounts,
  });

  const { mutate: updateStatus, isPending: isUpdateStatusPending } = useMutation({
    mutationFn: (data: { id: string; status: AppointmentStatus }) =>
      updateAppointmentStatusById(data.id, data.status),
    onSuccess: (updatedAppointment) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["appointment-counts"],
      });

      paginatedData.refetch();
      toast.success(
        `Appointment for ${updatedAppointment.first_name} marked as ${updatedAppointment.status}`,
      );
    },
  });

  const { mutate: remove, isPending: isRemovePending } = useMutation({
    mutationFn: (id: string) => removeAppointment(id),
    onSuccess: (removedAppointment) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["appointment-counts"],
      });

      paginatedData.refetch();
      toast.success(`Appointment for ${removedAppointment.first_name} was deleted successfully`);
    },
  });

  const isErrorToGetData = isCountsError || isRecentError || paginatedData.isError;

  return {
    updateStatus,
    remove,
    isUpdateStatusPending,
    recentAppointments,
    isRemovePending,
    isErrorToGetData,
    ...paginatedData,
    counts: counts || { all: 0, pending: 0, confirmed: 0, completed: 0 },
  };
};
