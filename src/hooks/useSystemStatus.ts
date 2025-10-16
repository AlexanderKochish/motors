import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export function useSystemStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  useEffect(() => {
    const checkSupabaseStatus = async () => {
      try {
        setIsLoading(true);

        const { error } = await supabase.from("appointments").select("id").limit(1);

        setIsOnline(!error);
      } catch (error) {
        console.error("Supabase status check failed:", error);
        setIsOnline(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSupabaseStatus();
    const interval = setInterval(checkSupabaseStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return { isOnline, isLoading };
}
