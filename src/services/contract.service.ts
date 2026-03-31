import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { EntityPageable } from "@/types/ApiTypes";
import { Contract, ContractWithDetails } from "@/types/Contract";
import { ApiError } from "@/types/Error";
import axios from "axios";

export async function downloadContractPdf(orderId: string, costumerId: string) {
  try {
    const clausesResponse = await api.get(routes.clauses.getAllByUser);

    const clauses = clausesResponse.data;

    const response = await api.post(
      routes.contract.generate, 
      { 
        orderId,
        costumerId: costumerId,
        clausesIds: clauses.map((clause: any) => clause.id)
      },
      {
        responseType: "blob", 
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    generateBlob(response);

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }

    throw error;
  }
}

export async function fetchContracts(): Promise<EntityPageable<Contract>> {
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
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }
    throw error;
  }
}

export async function signContract(contractId: string) {
  try {
    const response = await api.put(`${routes.contract.sign}/${contractId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }
    throw error;
  }
}

export async function downloadContractByCode(code: string) {
  try {
    const response = await api.get(`${routes.contract.download}/${code}`, {
      responseType: "blob",
    });

    generateBlob(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {

      const errorText = await error.response.data.text();
      const errorJson = JSON.parse(errorText);
      
      throw new ApiError(errorJson);
    }
    throw error;
  }
}

function generateBlob(response: any) {
  const pdfBlob = new Blob([response.data], { type: "application/pdf" });

  const fileUrl = window.URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = fileUrl;

  const contentDisposition = response.headers["content-disposition"];

  let filename = "contrato.pdf";

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?(.+?)"?$/);
    if (match?.[1]) {
      filename = match[1];
    }
  }

  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(fileUrl);
}