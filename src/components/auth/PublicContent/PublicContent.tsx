"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
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