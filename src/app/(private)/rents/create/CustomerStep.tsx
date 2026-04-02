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
import { CreateRentFormData } from "@/types/Schemes";
import { Card } from "@components/Card/Card";
import { formatDate } from "@/formatter";

interface CustomerStepProps {
  onBack: () => void;
  onNext: () => void;
}

export function CustomerStep({ onBack, onNext }: CustomerStepProps) {
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    size: 10,
    sort: [{ field: "name", direction: "asc" }],
    name: "",
  });
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCostumerId, setSelectedCostumerId] = useState<string | null>(null);

  const { setValue } = useFormContext<CreateRentFormData>();
  const { showMessage } = useFlashMessage();

  async function fetchCustomers() {
    setLoading(true);
    try {
      const response = await getCostumers(filters);
      setCostumers(response.content);
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage(`Erro ao buscar cliente: ${error.message}`, "error");
      } else {
        showMessage("Erro ao buscar clientes", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelectCustomer(costumerId: string) {
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
      <Text variant="body1" sx={{ marginBottom: 4 }}>
        Selecione o cliente do aluguel:
      </Text>

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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <LoadingSpinner />
        </Box>
      ) : (
        <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          {costumers.length > 0 ? (
            costumers.map((costumer) => {
              const selected = selectedCostumerId === costumer.id;

              return (
                <Box
                  key={costumer.id}
                  onClick={() => handleSelectCustomer(costumer.id)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    outline: selected ? "2px solid" : "1px solid transparent",
                    outlineColor: selected ? "primary.main" : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Card
                    title={`${costumer.name} ${costumer.lastName}`}
                    description={costumer.address?.city || "Sem cidade cadastrada"}
                    textVariant="body1"
                    textColor="primary"
                    icon={selected ? "check" : "user-round"}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                      <Text variant="body2" color="text.secondary">
                        CPF: {costumer.cpf}
                      </Text>
                      <Text variant="body2" color="text.secondary">
                        {costumer.email}
                      </Text>
                      <Text variant="body2" color="text.secondary">
                        Cliente desde {formatDate(costumer.createdAt)}
                      </Text>
                    </Box>
                  </Card>
                </Box>
              );
            })
          ) : (
            <Text variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
              Nenhum cliente encontrado.
            </Text>
          )}
        </Box>
      )}

      <ButtonContainer>
        <Button icon="arrow-left" onClick={onBack} variant="text" />
        {selectedCostumerId && <Fab icon="arrow-right" onClick={onNext} size={32} iconSize={20} />}
      </ButtonContainer>
    </>
  );
}
