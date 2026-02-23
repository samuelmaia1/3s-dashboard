"use client";

import { Text } from "@components/Text/Text";
import { CardContainer, Container } from "./style";
import { Card } from "@components/Card/Card";

export default function Dashboard() {

  return (
    <Container>
      <Text variant="h5" weight='medium'>Dashboard</Text>
      <Text variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Visão geral do seu negócio
      </Text>

      <CardContainer>
        <Card title="Aluguéis ativos" description="Aluguéis pendentes de entrega e devolução" icon="shopping-cart">
          <Text variant="h5" weight='bold'>2</Text>
        </Card>
        <Card title="Receita do mês" description="Total arrecadado em Fevereiro de 2026" icon="dollar-sign">
          <Text variant="h5" weight='bold'>2</Text>
        </Card>
        <Card title="Clientes cadastrados" description="Clientes cadastrados" icon="users">
          <Text variant="h5" weight='bold'>2</Text>
        </Card>
        <Card title="Contratos em aberto" description="Contratos gerados mas ainda não concluídos" icon="file-text">
          <Text variant="h5" weight='bold'>2</Text>
        </Card>
      </CardContainer>
    </Container>
  )
}
