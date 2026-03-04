"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
import { LoadingScreen } from "@components/LoadingScreen/LoadingScreen";

export default function Home() {
  const { user, loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loadingAuth, router]);

  return <LoadingScreen />;
}
