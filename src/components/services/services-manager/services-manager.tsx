"use client";
import React, { useState } from "react";
import ServiceCardForm from "../../admin/admin-service-form/admin-service-form";
import { useServices } from "@/hooks/useServices";
import ServicesList from "@/components/services/services-list/services-list";
import ControlPanel from "../../admin/control-panel/control-panel";
import Loading from "@/components/ui/loading/loading";
import { AdminActions } from "../../admin/admin-service-actions/admin-service-action";
import { ServiceCardType } from "@/types";

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
    return <div>Error loading services</div>;
  }

  return (
    <>
      <ControlPanel activeSection={activeSection} onSectionChange={handleSectionChange} />
      {renderActiveSection()}
    </>
  );
};

export default ServicesManager;
