import { createClient } from "@/lib/supabase/server";

export async function uploadToStorage(
  file: File,
  bucket: string,
  folder: string = "",
): Promise<string> {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
