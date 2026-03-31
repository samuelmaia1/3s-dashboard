'use client';

import { fetchContracts } from "@/services/contract.service";
import { Contract, ContractStatus } from "@/types/Contract";
import { ApiError } from "@/types/Error";
import ContractsTable from "@components/ContractsTable/ContractsTable";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { useEffect, useState } from "react";

export default function ContractsPage() {
    const [contracts, setContracts] = useState<Contract[]>([]);

    const { showMessage } = useFlashMessage();

    async function loadContracts() {
        try {
            const response = await fetchContracts();
            setContracts(response.content);
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`${error.message}`, "error");
            } else {
                showMessage("Erro ao carregar contratos", "error");
            }
        }
    }

    function onMarkContractAsSigned(contractId: string) {
        setContracts((prev) => {
            return prev.map((contract) => {
                if (contract.id === contractId) {
                    return {
                        ...contract,
                        status: ContractStatus.ASSINADO,
                    };
                }
                return contract;
            })
        })
    }

    useEffect(() => {
        loadContracts();
    }, []);

    return (
        <div>
            {contracts && <ContractsTable contracts={contracts} onMarkContractAsSigned={onMarkContractAsSigned}/>}
        </div>
    );
}