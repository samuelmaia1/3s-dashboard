"use client";

import { Text } from "@components/Text/Text";
import { CardContainer, Container, IconTextContainer } from "./style";
import { Card } from "@components/Card/Card";
import { api } from "@/lib/axios";
import { routes } from "@/constants/api-routes";
import { useEffect, useState } from "react";
import { DashboardSummary } from "@/types/User";
import { formatToCurrency } from "@/formatter";
import { Icon } from "@components/Icon/Icon";
import { useTheme } from "@mui/material";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  async function fetchDashboardSummary() {
    try {
      setLoading(true);
      const response = await api.get(routes.dashboard.summary);
      setSummary(response.data);
    } catch (error) {
      console.error("Erro ao buscar resumo do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  return (
    <Container>
      <CardContainer>
        <Card
          title="Aluguéis ativos"
          description="Aluguéis pendentes de entrega e devolução"
          icon="shopping-cart"
        >
          <Text variant="h6" weight="bold">
            {summary?.activeRentals || 0}
          </Text>
        </Card>
        <Card
          title="Receita do mês"
          description="Total arrecadado em Fevereiro de 2026"
          icon="dollar-sign"
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
        >
          <Text variant="h6" weight="bold">
            {summary?.costumersCount || 0}
          </Text>
        </Card>
        <Card
          title="Contratos em aberto"
          description="Contratos gerados mas ainda não concluídos"
          icon="file-text"
        >
          <Text variant="h6" weight="bold">
            {summary?.openContracts || 0}
          </Text>
        </Card>
      </CardContainer>
    </Container>
  );
}
