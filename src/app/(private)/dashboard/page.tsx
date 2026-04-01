"use client";

import { Text } from "@components/Text/Text";
import {
  CardContainer,
  Container,
  IconTextContainer,
  TableContainer,
} from "./style";
import { Card } from "@components/Card/Card";
import { api } from "@/lib/axios";
import { routes } from "@/constants/api-routes";
import { useEffect, useState } from "react";
import { DashboardSummary } from "@/types/User";
import { formatToCurrency } from "@/formatter";
import { Icon } from "@components/Icon/Icon";
import { useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { useAuth } from "@hooks/useAuth";
import OrdersTable from "@components/OrdersTable/OrdersTable";
import ContractsTable from "@components/ContractsTable/ContractsTable";
import { LoadingContainer } from "../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { ContractStatus } from "@/types/Contract";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const { showMessage } = useFlashMessage();

  const { isLoggingIn } = useAuth();

  const params = useSearchParams();

  const theme = useTheme();

  async function fetchDashboardSummary() {
    setLoading(true);
    try {
      const response = await api.get(routes.dashboard.summary);
      setSummary(response.data);
    } catch (error) {
      console.error("Erro ao buscar resumo do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  function onMarkContractAsSigned(contractId: string) {
    setSummary((prev) => {
      if (prev) {
        return {
          ...prev,
          lastContracts: prev.lastContracts.map((contract) => {
            if (contract.id === contractId) {
              return {
                ...contract,
                status: ContractStatus.ASSINADO,
              };
            }
            return contract;
          })
        };
      }
      return prev;
    })
  }

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  useEffect(() => {
    if (params.get("login") === "true" && isLoggingIn) {
      showMessage("Login realizado com sucesso!", "success");
    }
  }, []);

  return (
    <Container>
      {!loading && 
        <>
          <CardContainer>
            <Card
              title="Pedidos ativos"
              description="Aluguéis pendentes de entrega e devolução"
              icon="shopping-cart"
              textVariant="body1"
              textColor="primary"
            >
              <Text variant="h6" weight="bold">
                {summary?.activeRentals || 0}
              </Text>
            </Card>
            <Card
              title="Receita do mês"
              description="Pagamentos recebidos em Fevereiro de 2026"
              icon="dollar-sign"
              textVariant="body1"
              textColor="primary"
            >
              <IconTextContainer>
                <Text variant="h6" weight="bold">
                  {summary
                    ? formatToCurrency(summary.monthlyRevenue)
                    : formatToCurrency(0)}
                </Text>
                <Icon
                  name="trending-up"
                  size={20}
                  color={theme.palette.success.main}
                />
              </IconTextContainer>
            </Card>
            <Card
              title="Clientes cadastrados"
              description="Clientes cadastrados"
              icon="users"
              textVariant="body1"
              textColor="primary"
            >
              <Text variant="h6" weight="bold">
                {summary?.costumersCount || 0}
              </Text>
            </Card>
            <Card
              title="Contratos em aberto"
              description="Contratos gerados mas ainda não concluídos"
              icon="file-text"
              textVariant="body1"
              textColor="primary"
            >
              <Text variant="h6" weight="bold">
                {summary?.openContracts || 0}
              </Text>
            </Card>
          </CardContainer>

          <TableContainer>
            <Card
              title="Pedidos recentes"
              description="Últimas movimentações"
              icon="layout-list"
              textVariant="body1"
              textColor="primary"
            >
              <OrdersTable orders={summary?.lastOrders || []} />
            </Card>
            <Card
              title="Contratos recentes"
              description="Últimos contratos gerados"
              icon="file"
              textVariant="body1"
              textColor="primary"
            >
              <ContractsTable 
                contracts={summary?.lastContracts || []} 
                onMarkContractAsSigned={onMarkContractAsSigned} 
                hideMenu={true}
              />
            </Card>
          </TableContainer>
        </>
      }

      {loading && (
        <LoadingContainer heightToShow="60vh">
          <LoadingSpinner />
        </LoadingContainer>
      )}
    </Container>
  );
}
