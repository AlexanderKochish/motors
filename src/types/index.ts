export interface Testimonial {
  id: string;
  name: string;
  car_model: string;
  rating: number;
  review_text: string;
  status: Status;
  created_at: string;
}

export type AppointmentStatus =
  | "all"
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | string;

export interface Appointments {
  id: string;
  first_name: string;
  phone: string;
  service_type: string;
  message: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface AppointmentFormData {
  first_name: string;
  phone: string;
  service_type: string;
  message?: string;
  source: "main" | "modal";
}

export interface ReviewFormData {
  name: string;
  car_model: string;
  rating: number;
  review_text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type Status = "pending" | "approved" | "cancelled";

export interface ServiceCardType {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

export interface Category {
  id: string;
  key: string;
  label: string;
}

export interface GalleryItem {
  id: string;
  category_id: string;
  image: string;
  alt: string;
  title: string;
  description: string;
}

export interface CompanyContact {
  id: string;
  company_name: string;
  email_address: string;
  phone_number: string;
  working_hours: string;
  address: string;
  created_at: string;
  updated_at: string;
}
