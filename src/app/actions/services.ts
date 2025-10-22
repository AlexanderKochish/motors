"use server";

import { Services } from "@/features/services/repositories/services";
import { ServiceCardType } from "@/types";
import { uploadToStorage } from "./uploadToStorage";
import { processFormData } from "@/shared/utils/helpers/processFormData";

const service = new Services();

export async function getAllServices() {
  return await service.getAllServices();
}

export async function createService(formData: FormData) {
  try {
    const { file, title, description, alt, price, image } =
      processFormData<ServiceCardType>(formData);

    if (!title || !price) {
      throw new Error("Title and category are required");
    }

    let imageUrl = image || "";

    if (file) {
      try {
        imageUrl = await uploadToStorage(file, "services", "public");
      } catch (uploadError) {
        throw uploadError;
      }
    }

    if (!image) {
      throw new Error("Image is required");
    }

    const newItem: Omit<ServiceCardType, "id"> = {
      title: title.trim(),
      description: (description || "").trim(),
      alt: (alt || "").trim(),
      price: price.trim(),
      image: imageUrl.trim(),
    };

    return await service.createService(newItem);
  } catch (error) {
    throw error;
  }
}

export async function updateServiceById(id: string, formData: FormData) {
  const { file, title, description, alt, price, image } =
    processFormData<ServiceCardType>(formData);

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
      const currentItem = await service.getServiceItemById(id);
      imageUrl = currentItem?.image || "";
    } catch (error) {
      console.error("Failed to get current image:", error);
    }
  }

  if (!imageUrl) {
    throw new Error("Image is missing. Please reselect or provide an existing image URL");
  }

  const updatedItem: ServiceCardType = {
    title,
    description: description || "",
    alt,
    price,
    image: imageUrl,
    id,
  };

  return await service.updateServiceById(id, updatedItem);
}

export async function removeServiceById(id: string) {
  return await service.removeServiceById(id);
}
