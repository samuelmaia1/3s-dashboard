"use client";

import { ReactNode, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { LoadingScreen } from "@components/LoadingScreen/LoadingScreen";
import Sidebar from "@components/Sidebar/Sidebar";
import { Header } from "@components/Header/Header";
import { usePathname } from "next/navigation";
import { formatPath } from "@/formatter";

interface Props {
  children: ReactNode;
}

export function ProtectedContent({ children }: Props) {
  const { loadingAuth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();

  const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);

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
      <Header onOpenSidebar={openSidebar} title={formatPath(path)}/>
      
      <main style={{ flexGrow: 1, overflowY: 'auto', padding: '24px' }}>
        {children}
      </main>
    </div>
  </div>
);
}