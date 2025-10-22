"use client";

import React, { useRef, useState } from "react";
import styles from "./admin-service-form.module.css";
import { ServiceCardType } from "@/types";
import { useServiceCardForm } from "@/features/services/hooks/useServiceCardForm";
import FormField from "@/shared/components/form-field/form-field";
import { Controller } from "react-hook-form";
import { ServiceCardPreview } from "@/features/services/components/service-card-preview/service-card-preview";

interface Props {
  services: ServiceCardType[] | undefined;
  isEditing?: boolean;
  onCancel?: () => void;
}

const ServiceCardForm = ({ services, isEditing, onCancel }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");
  const {
    control,
    handleSubmit,
    handleCancel,
    isSubmitting,
    isValid,
    watchedValues,
    watchedServiceId,
  } = useServiceCardForm({ services, isEditing, onCancel });

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!services) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{isEditing ? "Edit service" : "Add a new service"}</h1>
            <p className={styles.subtitle}>
              {isEditing ? "Update service information" : "Create a new service card"}
            </p>
            {isSubmitting && <div className={styles.loadingIndicator}>Saving changes...</div>}
          </div>

          <div className={styles.formContent}>
            {isEditing && (
              <FormField
                as="select"
                name="id"
                control={control}
                label="Select a service"
                required
                helpText={`ID of the selected service: ${watchedServiceId || "not selected"}`}
              >
                <option value="">-- Select a service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </FormField>
            )}

            <div className={styles.gridContainer}>
              <div className={styles.gridTop}>
                <FormField
                  name="title"
                  control={control}
                  label="Service name"
                  required
                  type="text"
                  placeholder="The name will be automatically filled in when you select a service."
                />

                <FormField
                  name="price"
                  control={control}
                  label="Price"
                  required
                  type="text"
                  placeholder="For example: 100$ or Free"
                />
              </div>
              <div className={styles.column}>
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

                <FormField
                  name="alt"
                  control={control}
                  label="Alternative Text"
                  required
                  type="text"
                  placeholder="Image description for accessibility"
                />
              </div>

              <div className={styles.column}>
                <FormField
                  as="textarea"
                  name="description"
                  control={control}
                  label="Description"
                  required
                  rows={8}
                  placeholder="A detailed description of the service, its benefits, and features..."
                  helpText={`${watchedValues.description?.length || 0} / 500 symbols`}
                />

                <ServiceCardPreview service={watchedValues} />
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
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? "Saving..." : "Save service"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCardForm;
