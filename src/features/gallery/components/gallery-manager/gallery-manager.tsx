"use client";
import React, { useState } from "react";
import styles from "./gallery-manager.module.css";
import GalleryForm from "../gallery-form/gallery-form";
import { GalleryItem } from "@/types";
import { useGallery } from "@/features/gallery/hooks/useGallery";
import ControlPanel from "@/shared/components/control-panel/control-panel";
import GalleryList from "../gallery-list/gallery-list";
import Loading from "@/shared/components/loading/loading";
import { AdminActions } from "@/features/admin/components/admin-service-actions/admin-service-action";
import ErrorBlock from "@/shared/components/error-block/error-block";

export type GalleryNavSection = "create" | "update" | "delete";

const GalleryManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<GalleryNavSection>("create");

  const { gallery: galleryItems, categories, isLoading, isError, removeGalleryItem } = useGallery();

  const handleSectionChange = (section: GalleryNavSection) => {
    setActiveSection(section);
    setIsEditing(section === "update");
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (activeSection === "update") {
      setActiveSection("create");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      try {
        removeGalleryItem(itemId);
      } catch (error) {
        console.error("Failed to delete gallery item:", error);
      }
    }
  };

  const adminActions = (item: GalleryItem) => (
    <AdminActions onDelete={handleDeleteItem} serviceId={item.id} />
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorBlock title="Error loading gallery" message="Something went wrong.Try again later." />
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "create":
      case "update":
        return (
          <GalleryForm
            galleryItems={galleryItems}
            categories={categories || []}
            isEditing={isEditing}
            onCancel={handleCancel}
          />
        );
      case "delete":
        return (
          <div style={{ marginTop: "1.5rem" }}>
            <GalleryList
              galleryItems={galleryItems}
              actions={adminActions}
              categories={categories}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ControlPanel activeSection={activeSection} onSectionChange={handleSectionChange} />
      {renderActiveSection()}
    </>
  );
};

export default GalleryManager;
