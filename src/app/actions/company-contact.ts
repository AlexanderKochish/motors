"use server";

import { CompanyContact } from "@/types";
import { Company } from "@/features/company/repositories/company";

const service = new Company();

export async function getCompanyContact(): Promise<CompanyContact | null> {
  return await service.getCompanyContact();
}

export async function updateCompanyContact(
  contactData: Partial<CompanyContact>,
): Promise<CompanyContact | null> {
  return await service.updateCompanyContact(contactData);
}

export async function createCompanyContact(
  contactData: Omit<CompanyContact, "id" | "created_at" | "updated_at">,
): Promise<CompanyContact> {
  return await service.createCompanyContact(contactData);
}
