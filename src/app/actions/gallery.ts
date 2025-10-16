"use server";
import { Gallery } from "@/repositories/gallery";
import { GalleryItem } from "@/types";
import { uploadToStorage } from "./uploadToStorage";
import { processFormData } from "@/utils/helpers/processFormData";

const service = new Gallery();

export async function getCategories() {
  return await service.getCategories();
}

export async function getGalleryList() {
  return await service.getGalleryList();
}

export async function createItem(formData: FormData) {
  try {
    const { file, title, description, alt, category_id, image } =
      processFormData<GalleryItem>(formData);

    if (!title || !category_id) {
      throw new Error("Title and category are required");
    }

    let imageUrl = image || "";

    if (file) {
      try {
        imageUrl = await uploadToStorage(file, "gallery", "public");
      } catch (uploadError) {
        throw uploadError;
      }
    }

    if (!imageUrl) {
      throw new Error("Image is required");
    }

    const newItem: Omit<GalleryItem, "id"> = {
      title: title.trim(),
      description: (description || "").trim(),
      alt: (alt || "").trim(),
      category_id: category_id.trim(),
      image: imageUrl.trim(),
    };

    const result = await service.createItem(newItem);
    return result;
  } catch (error) {
    throw error;
  }
}
export async function updateById(id: string, formData: FormData) {
  const { file, title, description, alt, category_id, image } =
    processFormData<GalleryItem>(formData);

  let imageUrl = image || "";

  if (file) {
    try {
      imageUrl = await uploadToStorage(file, "gallery", "public");
    } catch (error) {
      console.error("Failed to upload image:", error);
      throw new Error("Failed to upload image");
    }
  }

  if (!imageUrl) {
    try {
      const currentItem = await service.getGalleryItemById(id);
      imageUrl = currentItem?.image || "";
    } catch (error) {
      console.error("Failed to get current image:", error);
    }
  }

  if (!imageUrl) {
    throw new Error("Image is missing. Please reselect or provide an existing image URL");
  }

  const updatedItem: GalleryItem = {
    title,
    description: description || "",
    alt,
    category_id,
    image: imageUrl,
    id,
  };

  return await service.updateById(id, updatedItem);
}
export async function removeById(id: string) {
  return await service.removeById(id);
}
