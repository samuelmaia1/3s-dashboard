import { Order, OrderStatus } from "@/types/Order";
import { Container, TopInfoContainer } from "./style";
import { Text } from "@components/Text/Text";
import { TextTag, TextTagVariant } from "@components/TextTag/TextTag";
import { formatToCurrency } from "@/formatter";

interface OrderRowProps {
    order: Order
}

const statusBackground: Record<OrderStatus, TextTagVariant> = {
  [OrderStatus.REALIZADO]: "info",
  [OrderStatus.AGUARDANDO_ASSINATURA_CLIENTE]: "warning",
  [OrderStatus.CONTRATO_ASSINADO]: "info",
  [OrderStatus.AGUARDANDO_PAGAMENTO]: "warning",
  [OrderStatus.PAGAMENTO_APROVADO]: "success",
  [OrderStatus.AGUARDANDO_ENTREGA]: "warning",
  [OrderStatus.ENTREGUE]: "success",
  [OrderStatus.CONCLUIDO]: "success",
  [OrderStatus.CANCELADO]: "error",
};    

export function OrderRow({order}: OrderRowProps) {
    return (
        <Container>
            <TopInfoContainer>
                <Text variant="body2" weight="medium">N° {order.code}</Text>
                <TextTag text={order.status} variant={statusBackground[order.status]} width="50%"/>
            </TopInfoContainer>
            
            <Text color="text.secondary">{formatToCurrency(order.total)}</Text>
        </Container>
    )
}