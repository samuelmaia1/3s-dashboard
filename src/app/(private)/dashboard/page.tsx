'use client'

import { Button } from "@/components/Button/Button";
import { useTheme } from "@/hooks/useTheme";

export default function Dashboard() {
  const {toggleTheme} = useTheme();

  return <div className="page">
    <Button variant="filled" color="primary" shape="rounded" size="medium" onClick={() => toggleTheme()} fullWidth>
      Acessar dashboard
    </Button>
  </div>;
}