import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { ApiError } from "@/types/Error";
import axios from "axios";

export async function downloadReceiptPdf(referenceId: string, costumerId: string, referenceType: "ORDER" | "RENT") {
  try {
    const response = await api.post(
      routes.receipt.generate,
      {
        referenceId,
        costumerId,
        referenceType,
      },
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
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

function generateBlob(response: any) {
  const pdfBlob = new Blob([response.data], { type: "application/pdf" });

  const fileUrl = window.URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = fileUrl;

  const contentDisposition = response.headers["content-disposition"];

  let filename = "recibo.pdf";

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
