import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompanyContact,
  updateCompanyContact,
  createCompanyContact,
} from "@/app/actions/company-contact";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactsSchema, ContactsSettingsFormData } from "@/schemas/form";
import { useEffect } from "react";

export const useCompanyContact = () => {
  const queryClient = useQueryClient();

  const form = useForm<ContactsSettingsFormData>({
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      workingHours: "",
    },
    resolver: zodResolver(contactsSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form;

  const {
    data: contact,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["company-contact"],
    queryFn: getCompanyContact,
  });

  useEffect(() => {
    if (contact) {
      reset({
        companyName: contact.company_name || "",
        email: contact.email_address || "",
        phone: contact.phone_number || "",
        address: contact.address || "",
        workingHours: contact.working_hours || "",
      });
    }
  }, [contact, reset]);

  const { mutate: updateContact, isPending: isUpdatePending } = useMutation({
    mutationFn: updateCompanyContact,
    onSuccess: (updatedContact) => {
      queryClient.invalidateQueries({ queryKey: ["company-contact"] });
      toast.success("Company contact information updated successfully");
      reset({
        companyName: updatedContact?.company_name,
        email: updatedContact?.email_address,
        phone: updatedContact?.phone_number,
        address: updatedContact?.address,
        workingHours: updatedContact?.working_hours,
      });
    },
    onError: (error) => {
      toast.error("Failed to update company contact");
    },
  });

  const { mutate: createContact, isPending: isCreatePending } = useMutation({
    mutationFn: createCompanyContact,
    onSuccess: (newContact) => {
      queryClient.invalidateQueries({ queryKey: ["company-contact"] });
      toast.success("Company contact information created successfully");
      reset({
        companyName: newContact.company_name,
        email: newContact.email_address,
        phone: newContact.phone_number,
        address: newContact.address,
        workingHours: newContact.working_hours,
      });
    },
    onError: (error) => {
      toast.error("Failed to create company contact");
    },
  });

  const onSubmit = async (data: ContactsSettingsFormData) => {
    const contactData = {
      company_name: data.companyName,
      email_address: data.email,
      phone_number: data.phone,
      address: data.address,
      working_hours: data.workingHours,
    };

    if (contact?.id) {
      updateContact({ ...contactData, id: contact.id });
    } else {
      createContact(contactData);
    }
  };

  const isLoadingState = isLoading || isUpdatePending || isCreatePending;

  return {
    control,
    contact,
    isLoading: isLoadingState,
    handleSubmit: handleSubmit(onSubmit),
    isError,
    error,
    updateContact,
    createContact,
    isUpdatePending,
    isCreatePending,
    isDirty,
    reset,
    form,
  };
};
