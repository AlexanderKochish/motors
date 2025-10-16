import { getAllServices, removeServiceById } from "@/app/actions/services";
import { ServiceCardType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useServices = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useQuery<ServiceCardType[], Error>({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const { mutate: onDelete } = useMutation({
    mutationKey: ["services"],
    mutationFn: (data: { id: string }) => removeServiceById(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("The service has been successfully removed.");
    },
  });

  return {
    data,
    onDelete,
    ...rest,
  };
};
