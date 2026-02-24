"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
import { LoadingScreen } from "@components/LoadingScreen/LoadingScreen";
import { PublicHeader } from "@components/PublicHeader/PublicHeader";

interface PublicContentProps {
  children: ReactNode;
}

export function PublicContent({ children }: PublicContentProps) {
  const { user, loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && user) {
      router.replace("/dashboard");
    }
  }, [loadingAuth, user]);

  if (loadingAuth) {
    return <LoadingScreen />;
  }

  if (user) {
    return null;
  }

  return (
    <>
        <PublicHeader />
        {children}
    </>
  );
}