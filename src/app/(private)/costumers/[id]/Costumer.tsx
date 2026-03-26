"use client";

import { Costumer } from "@/types/Costumer";
import { useState } from "react";

interface CostumerProps {
  id: string;
}

export function CostumerClient({ id }: CostumerProps) {
  const [costumer, setCostumer] = useState<Costumer | null>(null);

  return <div>{id}</div>;
}
