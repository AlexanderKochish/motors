import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ServiceCardType } from "@/types";
import { createService, updateServiceById } from "@/app/actions/services";
import {
  createServiceSchema,
  ServiceFormData,
  updateServiceSchema,
} from "@/features/services/components/service-card-form/service-card-form.schema";

interface Props {
  services: ServiceCardType[] | undefined;
  isEditing?: boolean;
  onCancel?: () => void;
}

export function useServiceCardForm({ services, isEditing, onCancel }: Props) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(isEditing ? updateServiceSchema : createServiceSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      title: "",
      description: "",
      price: "",
      image: "",
      alt: "",
    },
  });

  const watchedServiceId = watch("id");
  const watchedValues = watch();

  const createMutation = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => createService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("The service was successfully created");
      reset();
      onCancel?.();
    },
    onError: (error) => {
      console.error("Create service error:", error);
      toast.error("Failed to create service");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateServiceById(id, formData),
    onSuccess: (updatedService) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });

      toast.success("The service was successfully updated");

      if (updatedService) {
        Object.entries(updatedService).forEach(([key, value]) => {
          const formKey = key as keyof ServiceFormData;
          if (formKey in createServiceSchema.shape) {
            setValue(formKey, value || "", {
              shouldValidate: true,
            });
          }
        });
      }
    },
    onError: (error) => {
      console.error("Update service item error:", error);
      toast.error("Failed to update service item");
    },
  });

  const servicesMap = useMemo(() => {
    if (!services) return new Map();
    return new Map(services.map((s) => [s.id, s]));
  }, [services]);

  const handleServiceSelect = useCallback(
    (serviceId: string) => {
      if (!isEditing) return;

      const selected = servicesMap.get(serviceId);
      if (selected) {
        Object.keys(selected).forEach((key) => {
          setValue(key as keyof ServiceFormData, selected[key] || "", {
            shouldValidate: true,
          });
        });
      } else {
        reset({
          id: "",
          title: "",
          description: "",
          price: "",
          image: "",
          alt: "",
        });
      }
    },
    [isEditing, servicesMap, setValue, reset],
  );

  useEffect(() => {
    if (watchedServiceId && isEditing) {
      handleServiceSelect(watchedServiceId);
    }
  }, [watchedServiceId, isEditing, handleServiceSelect]);

  useEffect(() => {
    if (!isEditing) {
      reset({
        id: "",
        title: "",
        description: "",
        price: "",
        image: "",
        alt: "",
      });
    }
  }, [isEditing, reset]);

  const handleFormSubmit = async (data: ServiceFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("alt", data.alt);
    formData.append("price", data.price);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    if (isEditing && "id" in data && data.id) {
      updateMutation.mutate({ id: data.id, formData });
    } else {
      createMutation.mutate({ formData });
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  const isMutationSubmitting = createMutation.isPending || updateMutation.isPending;

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleCancel,
    errors,
    isSubmitting: isSubmitting || isMutationSubmitting,
    isValid,
    watchedValues,
    watchedServiceId,
    mutationStatus: {
      create: createMutation.status,
      update: updateMutation.status,
    },
  };
}
