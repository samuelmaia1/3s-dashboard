import { Button } from "@components/Button/Button";
import { Text } from "@components/Text/Text";
import { ButtonContainer } from "./style";
import { Fab } from "@components/Fab/Fab";
import { getCostumers } from "@/services/costumer.service";
import { useEffect, useState } from "react";
import { Filters } from "@/types/ApiTypes";
import { Input } from "@components/Input/Input";
import { Costumer } from "@/types/Costumer";
import { ApiError } from "@/types/Error";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { Box } from "@mui/material";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { useFormContext } from "react-hook-form";
import { CreateOrderFormData } from "@/types/Schemes";

interface CustomerStepProps {
    onBack: () => void;
    onNext: () => void;
}

export function CustomerStep({ onBack, onNext }: CustomerStepProps) {
    const [filters, setFilters] = useState<Filters>({page: 0, size: 10, sort: [{field: "name", direction: "asc"}], name: ""});
    const [costumers, setCostumers] = useState<Costumer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCostumerId, setSelectedCostumerId] = useState<string | null>(null);

    const { setValue } = useFormContext<CreateOrderFormData>();
    const {showMessage} = useFlashMessage();

    async function fetchCustomers() {
        setLoading(true);
        try {
            const response = await getCostumers(filters);
            setCostumers(response.content);
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao criar cliente: ${error.message}`, "error");
            } else {
                showMessage("Erro ao buscar clientes", "error");
            }

        } finally {
            setLoading(false);
        }
    }

    function handleSelectCustomer(costumerId: string) {
        console.log(costumerId);
        setSelectedCostumerId(costumerId);
        setValue("costumerId", costumerId, { shouldValidate: true });
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchCustomers();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [filters]);

    return (
        <>
            <Text variant="body1" sx={{ marginBottom: 4 }}>Selecione o cliente do pedido:</Text>

            <Input
                endIcon="search"
                value={filters.name || ""}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        page: 0,
                        name: e.target.value,
                    })
                }
                placeholder="Pesquise por clientes..."
            />

            {
                loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <LoadingSpinner/>
                    </Box>
                ) :
                (
                    <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {costumers.length > 0 ? (
                            costumers.map(costumer => (
                                <Box 
                                    key={costumer.id} 
                                    onClick={() => handleSelectCustomer(costumer.id)}
                                    sx={{
                                        padding: 2,
                                        border: '1px solid',
                                        borderColor: selectedCostumerId === costumer.id ? 'primary.main' : 'divider',
                                        backgroundColor: selectedCostumerId === costumer.id ? 'action.selected' : 'transparent',
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        transition: 'all 0.5s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                            borderColor: 'primary.main'
                                        }
                                    }}
                                >
                                    <Text variant="body1" fontWeight="bold">
                                        {costumer.name} {costumer.lastName}
                                    </Text>
                                    <Text variant="body2" color="text.secondary">
                                        CPF: {costumer.cpf}
                                    </Text>
                                    <Text variant="body2" color="text.secondary">
                                        {costumer.email}
                                    </Text>
                                </Box>
                            ))
                        ) : (
                            <Text variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                                Nenhum cliente encontrado.
                            </Text>
                        )}
                    </Box>
                )
            }

            <ButtonContainer>
                <Button icon="arrow-left" onClick={onBack} variant="text"/>
                {selectedCostumerId && <Fab icon="arrow-right" onClick={onNext} size={32} iconSize={20}/>}
            </ButtonContainer>
        </>
    )
}