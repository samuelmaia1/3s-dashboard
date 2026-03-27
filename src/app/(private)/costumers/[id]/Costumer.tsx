"use client";

import { getCostumerById } from "@/services/costumer.service";
import { Costumer, FullCostumer } from "@/types/Costumer";
import { ApiError } from "@/types/Error";
import { Text } from "@components/Text/Text";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { useEffect, useState } from "react";
import { CardGrid, Container, InfoContainer } from "./style";
import { Card } from "@components/Card/Card";
import { formatAddressToString, formatDate } from "@/formatter";
import { TopContainer } from "../style";
import { Button } from "@components/Button/Button";
import { Order } from "@/types/Order";
import { agroupOrderByStatus } from "@/services/order.service";
import { useTheme } from "@mui/material";
import { OrderRow } from "@components/OrderRow/OrderRow";
import { LoadingContainer } from "../../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";

interface CostumerProps {
  id: string;
}

export function CostumerClient({ id }: CostumerProps) {
  const [costumer, setCostumer] = useState<FullCostumer | null>(null);
  const [groupedOrders, setGroupedOrders] = useState<{
    canceledOrders: Order[], 
    pendingOrders: Order[], 
    finishedOrders: Order[]
  }>({
    canceledOrders: [],
    pendingOrders: [],
    finishedOrders: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const { showMessage } = useFlashMessage();
  const theme = useTheme();

  async function fetchCostumer() {
    setIsLoading(true);
    try {
      const response = await getCostumerById(id);

      const {canceledOrders, pendingOrders, finishedOrders} = agroupOrderByStatus(response.orders);

      setGroupedOrders({
        canceledOrders,
        pendingOrders,
        finishedOrders
      });

      setCostumer(response);
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage(`${error.message}`, "error");
      }
      else {
        showMessage("Erro ao buscar cliente", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCostumer();
  }, []);

  return (
    <>
      {!isLoading ? <Container>
        <TopContainer>
          <Text variant="h5">Dados do cliente</Text>
          <Button variant="filled" icon="edit"/>
        </TopContainer>

        

        <CardGrid>
          <Card
          title="Dados pessoais"
          description="Dados pessoais do cliente"
        >
          <InfoContainer>
            <Text variant="body1">Nome: {`${costumer?.name} ${costumer?.lastName}`}</Text>
            <Text variant="body1">E-mail: {costumer?.email}</Text>
            <Text variant="body1">CPF: {costumer?.cpf}</Text>
            {costumer?.address && <Text variant="body1">{formatAddressToString(costumer?.address)}</Text>}
            <Text variant="body1">Data de cadastro: {formatDate(costumer?.createdAt || new Date())}</Text>
          </InfoContainer>
        </Card>

          <Card
            title={`${groupedOrders?.pendingOrders.length} Pedidos em andamento`}
            icon="circle-ellipsis"
            iconColor={theme.palette.info.main}
          >
            {groupedOrders?.pendingOrders.map((order) => (
              <OrderRow order={order} />
            ))}
          </Card>

          <Card
            title={`${groupedOrders?.finishedOrders.length} Pedidos concluídos`}
            icon="check"
            iconColor={theme.palette.success.main}
          >
            {groupedOrders?.finishedOrders.map((order) => (
              <OrderRow order={order} />
            ))}
          </Card>

          <Card
            title={`${groupedOrders?.canceledOrders.length} Pedidos cancelados`}
            icon="x"
            iconColor={theme.palette.error.main}
          >
            {groupedOrders?.canceledOrders.map((order) => (
              <OrderRow order={order} />
            ))}
          </Card>
        </CardGrid>

      </Container> : <LoadingContainer heightToShow={'50vh'}><LoadingSpinner /></LoadingContainer>}
    </>
  );
}