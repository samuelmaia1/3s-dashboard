import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { EntityPageable } from "@/types/ApiTypes";
import { ContractWithDetails } from "@/types/Contract";
import { ApiError } from "@/types/Error";
import axios from "axios";

export async function downloadContractPdf(orderId: string, costumerId: string) {
    try {
    const response = await api.post(
      routes.contract.generate, 
      { 
        orderId,
        costumerId: costumerId,
        clausesIds: ['4fb58ab2-b6f3-4326-af0e-346ba334c8fb', '1ce714a9-07b9-477d-bcf2-bcbfde680dd5', '26aba21f-1818-4f80-bf4b-2d8efb5a9909', '3bc32ac1-09b3-4d17-a3df-f838febf4faa']
      },
      {
        responseType: "blob", 
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const pdfBlob = new Blob([response.data], { type: "application/pdf" });

    const fileUrl = window.URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = fileUrl;
    
    link.setAttribute("download", "contrato.pdf");

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(fileUrl);

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }

    throw error;
  }
}

export async function fetchContracts(): Promise<EntityPageable<ContractWithDetails>> {
  try {
    const response = await api.get(routes.users.contracts);
    return response.data;
  } catch (error) {
     if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }

    throw error;
  }
}

export async function updateContractStatus(contractId: string, newStatus: string) {
  try {
    const response = await api.put(`${routes.contract.generate}/${contractId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status do contrato:", error);
    throw error;
  }
}