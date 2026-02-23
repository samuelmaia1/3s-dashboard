"use client";

import { ReactNode, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { LoadingScreen } from "@components/LoadingScreen/LoadingScreen";
import Sidebar from "@components/Sidebar/Sidebar";
import { Header } from "@components/Header/Header";

interface Props {
  children: ReactNode;
}

export function ProtectedContent({ children }: Props) {
  const { loadingAuth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

   function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  if (loadingAuth) {
    return <LoadingScreen />;
  }

  return (
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
    <Sidebar mobileOpen={sidebarOpen} onClose={closeSidebar} />
    
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
      <Header onOpenSidebar={openSidebar} />
      
      <main style={{ flexGrow: 1, overflowY: 'auto', padding: '24px' }}>
        {children}
      </main>
    </div>
  </div>
);
}