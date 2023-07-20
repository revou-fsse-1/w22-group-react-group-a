import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/client";
import { Session } from "@supabase/supabase-js";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession() as unknown as {
        data: {
            session: Session
        };
      };
      if (!data?.session?.access_token) {
        router.push("/auth/login");
      }
    };
    checkSession();
  }, []);

  return <>{children}</>;
}