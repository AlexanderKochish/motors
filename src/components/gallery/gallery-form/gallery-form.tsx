"use client";

import React, { useState, useRef } from "react";
import styles from "./gallery-form.module.css";
import { Category, GalleryItem } from "@/types";
import { useGalleryForm } from "@/hooks/useGalleryForm";
import FormField from "@/components/ui/form-field/form-field";
import { Controller } from "react-hook-form";

interface Props {
  galleryItems: GalleryItem[] | undefined;
  categories: Category[];
  isEditing?: boolean;
  onCancel?: () => void;
}

const GalleryForm = ({ galleryItems, categories, isEditing, onCancel }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    control,
    handleSubmit,
    handleCancel,
    isSubmitting,
    isValid,
    watchedValues,
    watchedItemId,
  } = useGalleryForm({
    galleryItems,
    categories,
    isEditing,
    onCancel,
  });

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!galleryItems) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.card} encType="multipart/form-data">
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isEditing ? "Edit Gallery Item" : "Add New Gallery Item"}
            </h1>
            <p className={styles.subtitle}>
              {isEditing ? "Update image information" : "Add new image to gallery"}
            </p>
            {isSubmitting && <div className={styles.loadingIndicator}>Saving changes...</div>}
          </div>

          <div className={styles.formContent}>
            {isEditing && (
              <FormField
                as="select"
                name="id"
                control={control}
                label="Select a gallery item"
                required
                helpText={`ID: ${watchedItemId || "not selected"}`}
              >
                <option value="">-- Select a gallery item --</option>
                {galleryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </FormField>
            )}

            <div className={styles.gridContainer}>
              <div className={styles.column}>
                <FormField
                  control={control}
                  as="select"
                  name="category_id"
                  label="Category"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </FormField>

                <FormField
                  control={control}
                  name="title"
                  required
                  label="Title"
                  placeholder="Enter image title"
                />

                <Controller
                  control={control}
                  name="image"
                  render={({ field, fieldState }) => (
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>
                        Image {!isEditing && <span className={styles.required}>*</span>}
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          field.onChange(file);

                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setImagePreview(reader.result as string);
                            reader.readAsDataURL(file);
                          } else {
                            setImagePreview(watchedValues.image || "");
                          }
                        }}
                      />

                      <div className={styles.fileActions}>
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className={styles.uploadButton}
                          disabled={isSubmitting}
                        >
                          {imagePreview || watchedValues.image ? "Change Image" : "Choose Image"}
                        </button>

                        {(imagePreview || watchedValues.image) && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview("");
                              field.onChange(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className={styles.removeButton}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {fieldState.error && (
                        <p className={styles.errorText}>{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {(imagePreview || watchedValues.image) && (
                  <div className={styles.previewContainer}>
                    <p className={styles.previewLabel}>Image Preview:</p>
                    <div className={styles.imagePreview}>
                      <img
                        src={imagePreview || watchedValues.image}
                        alt="Preview"
                        className={styles.previewImage}
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPsSwem9icmF6aGVuaWU8L3RleHQ+PC9zdmc+";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.column}>
                <FormField
                  control={control}
                  name="alt"
                  placeholder="Description for accessibility"
                  required
                  label="Alt text"
                  helpText="Important for SEO and accessibility"
                />
                <FormField
                  control={control}
                  name="description"
                  as="textarea"
                  rows={8}
                  placeholder="Detailed description of the image..."
                  helpText={`${watchedValues.description?.length || 0} / 500 characters`}
                />
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleCancel}
                className={`${styles.button} ${styles.buttonCancel}`}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.buttonSubmit}`}
                  disabled={isSubmitting || !isValid || (!imagePreview && !watchedValues.image)}
                >
                  {isSubmitting ? "Saving..." : "Save Item"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryForm;
