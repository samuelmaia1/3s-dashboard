'use client'

import { getRents } from "@/services/rent.service";
import { Rent } from "@/types/Rent";
import RentsTable from "@components/RentsTable/RentsTable";
import { useEffect, useState } from "react";

export default function RentsPage() {
    const [rents, setRents] = useState<Rent[]>([]);

  async function fetchRents() {
    try {
        const response = await getRents();
        setRents(response.content);
    } catch (error) {
        console.error("Error fetching rents:", error);
    }
  }  

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <div>
      {rents && <RentsTable rents={rents} />}
    </div>
  );
}