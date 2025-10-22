import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GalleryItem, Category } from "@/types";
import { createItem, updateById } from "@/app/actions/gallery";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGallerySchema, updateGallerySchema, GalleryFormData } from "@/shared/schemas/form";

interface Props {
  galleryItems: GalleryItem[] | undefined;
  categories: Category[];
  isEditing?: boolean;
  onCancel?: () => void;
}

export function useGalleryForm({ galleryItems, isEditing, onCancel }: Props) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<GalleryFormData>({
    mode: "onChange",
    resolver: zodResolver(isEditing ? updateGallerySchema : createGallerySchema),
    defaultValues: {
      id: "",
      category_id: "",
      image: "",
      alt: "",
      title: "",
      description: "",
    },
  });

  const watchedItemId = watch("id");
  const watchedValues = watch();

  const createMutation = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => createItem(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Gallery item was successfully created");
      reset();
      onCancel?.();
    },
    onError: (error) => {
      console.error("Create gallery item error:", error);
      toast.error("Failed to create gallery item");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) =>
      updateById(id, formData),
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Gallery item was successfully updated");

      if (updatedItem) {
        Object.keys(updatedItem).forEach((key) => {
          setValue(key as keyof GalleryItem, updatedItem[key] || "", {
            shouldValidate: true,
          });
        });
      }
    },
    onError: (error) => {
      console.error("Update gallery item error:", error);
      toast.error("Failed to update gallery item");
    },
  });

  const galleryItemsMap = useMemo(() => {
    if (!galleryItems) return new Map();
    return new Map(galleryItems.map((item) => [item.id, item]));
  }, [galleryItems]);

  const handleItemSelect = useCallback(
    (itemId: string) => {
      if (!isEditing) return;

      const selected = galleryItemsMap.get(itemId);
      if (selected) {
        Object.keys(selected).forEach((key) => {
          setValue(key as keyof GalleryItem, selected[key] || "", {
            shouldValidate: true,
          });
        });
      } else {
        reset({
          id: "",
          category_id: "",
          image: "",
          alt: "",
          title: "",
          description: "",
        });
      }
    },
    [isEditing, galleryItemsMap, setValue, reset],
  );

  useEffect(() => {
    if (watchedItemId && isEditing) handleItemSelect(watchedItemId);
  }, [watchedItemId, isEditing, handleItemSelect]);

  useEffect(() => {
    if (!isEditing) {
      reset({
        id: "",
        category_id: "",
        image: "",
        alt: "",
        title: "",
        description: "",
      });
    }
  }, [isEditing, reset]);

  const handleFormSubmit = async (data: GalleryFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("alt", data.alt);
    formData.append("category_id", data.category_id);

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
    watchedItemId,
  };
}
