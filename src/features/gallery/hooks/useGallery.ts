import { getCategories, getGalleryList, removeById } from "@/app/actions/gallery";
import { Category, GalleryItem } from "@/types";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useGallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["gallery"],
        queryFn: getGalleryList,
      },
      {
        queryKey: ["gallery-categories"],
        queryFn: getCategories,
      },
    ],
  });

  const { mutate: removeGalleryItem } = useMutation({
    mutationKey: ["gallery"],
    mutationFn: (id: string) => removeById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success(`The item with ID: ${data.id} was successfully deleted.`);
    },
  });

  const [galleryQuery, categoriesQuery] = results;

  const gallery = galleryQuery.data as GalleryItem[];
  const categories = categoriesQuery.data as Category[];

  const categoryMap = categories?.reduce(
    (acc, cat) => {
      acc[cat.id] = cat.key;
      return acc;
    },
    {} as Record<string, string>,
  );

  const filteredItems =
    activeFilter === "all"
      ? gallery
      : gallery?.filter((item) => categoryMap?.[item.category_id] === activeFilter);

  const isLoading = galleryQuery.isLoading || categoriesQuery.isLoading;
  const isError = galleryQuery.isError || categoriesQuery.isError;

  return {
    gallery,
    categories,
    filteredItems,
    activeFilter,
    setActiveFilter,
    isLoading,
    isError,
    isLoadingGallery: galleryQuery.isLoading,
    isLoadingCategories: categoriesQuery.isLoading,
    isErrorGallery: galleryQuery.isError,
    isErrorCategories: categoriesQuery.isError,
    removeGalleryItem,
  };
};
