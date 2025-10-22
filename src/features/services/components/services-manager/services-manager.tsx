"use client";
import React, { useState } from "react";
import { useServices } from "@/features/services/hooks/useServices";
import ServicesList from "@/features/services/components/services-list/services-list";
import Loading from "@/shared/components/loading/loading";
import { ServiceCardType } from "@/types";
import { AdminActions } from "@/features/admin/components/admin-service-actions/admin-service-action";
import ServiceCardForm from "@/features/admin/components/admin-service-form/admin-service-form";
import ControlPanel from "@/shared/components/control-panel/control-panel";
import ErrorBlock from "@/shared/components/error-block/error-block";

export type NavSection = "create" | "update" | "delete";

const ServicesManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSection>("create");
  const { data: services, isLoading, isError, onDelete } = useServices();

  const handleSectionChange = (section: NavSection) => {
    setActiveSection(section);
    setIsEditing(section === "update");
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (activeSection === "update") {
      setActiveSection("create");
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        onDelete({ id: serviceId });
      } catch (error) {
        console.error("Failed to delete service:", error);
      }
    }
  };

  const adminActions = (service: ServiceCardType) => (
    <AdminActions onDelete={handleDeleteService} serviceId={service.id} />
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "create":
      case "update":
        return (
          <ServiceCardForm services={services} isEditing={isEditing} onCancel={handleCancel} />
        );
      case "delete":
        return (
          <div style={{ marginTop: "1.5rem" }}>
            <ServicesList services={services} actions={adminActions} />
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorBlock title="Error Services" message="Error to get services list. Try again later" />
    );
  }

  return (
    <>
      <ControlPanel activeSection={activeSection} onSectionChange={handleSectionChange} />
      {renderActiveSection()}
    </>
  );
};

export default ServicesManager;
