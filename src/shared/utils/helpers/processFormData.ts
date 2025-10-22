export function processFormData<T>(formData: FormData): T & { file: File | null } {
  const fileEntry = formData.get("image");
  const data = Object.fromEntries(formData.entries()) as T;

  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  return {
    file,
    ...data,
  };
}
