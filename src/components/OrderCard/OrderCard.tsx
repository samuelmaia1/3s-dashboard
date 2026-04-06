import { formatAddressToString, formatDate, formatToCurrency } from "@/formatter";
import { downloadContractPdf } from "@/services/contract.service";
import { downloadReceiptPdf } from "@/services/receipt.service";
import { Order, OrderStatus, orderStatusIcons } from "@/types/Order";
import { Button } from "@components/Button/Button";
import { Card } from "@components/Card/Card";
import { Text } from "@components/Text/Text";
import { TextTag, TextTagVariant } from "@components/TextTag/TextTag";
import { useTheme } from "@mui/material";
import { ActionGroup, Footer, MetricItem, MetricsGrid, ProductsContainer } from "./style";

interface OrderCardProps {
  order: Order;
  onRequestStatusChange?: (order: Order) => void;
}

const statusBackground: Record<OrderStatus, TextTagVariant> = {
  [OrderStatus.REALIZADO]: "info",
  [OrderStatus.CONTRATO_ASSINADO]: "info",
  [OrderStatus.PAGAMENTO_APROVADO]: "success",
  [OrderStatus.AGUARDANDO_ENTREGA]: "warning",
  [OrderStatus.ENTREGUE]: "success",
  [OrderStatus.CONCLUIDO]: "success",
  [OrderStatus.CANCELADO]: "error",
};

export function OrderCard({ order, onRequestStatusChange }: OrderCardProps) {
  const theme = useTheme();

  const customerName = `${order.costumer.name} ${order.costumer.lastName}`;
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
  const productsPreview = order.items
    .slice(0, 2)
    .map((item) => item.product.name)
    .join(", ");
  const remainingItems = order.items.length - 2;

  function handleGenerateContract() {
    downloadContractPdf(order.id, order.costumerId, "ORDER");
  }

  function handleGenerateReceipt() {
    downloadReceiptPdf(order.id, order.costumerId, "ORDER");
  }

  return (
    <Card
      title={customerName}
      description={order.deliveryAddress ? formatAddressToString(order.deliveryAddress) : "Retirada"}
      icon={orderStatusIcons[order.status]}
      textVariant="body2"
      textColor="primary"
      iconColor={theme.palette.primary.main}
    >
      <MetricsGrid>
        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Pedido
          </Text>
          <Text variant="body1" weight="medium">
            N° {order.code}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Total
          </Text>
          <Text variant="body1" weight="medium">
            {formatToCurrency(order.total)}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Itens
          </Text>
          <Text variant="body1" weight="medium">
            {totalItems} unidade{totalItems !== 1 ? "s" : ""}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Frete
          </Text>
          <Text variant="body1" weight="medium">
            {order.deliveryAddress ? formatToCurrency(order.deliveryTax ?? 0) : "Sem frete"}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Entrega
          </Text>
          <Text variant="body1" weight="medium">
            {order.deliveryAddress ? formatDate(order.deliveryDate) : "Retirada"}
          </Text>
        </MetricItem>
      </MetricsGrid>

      <TextTag
        text={order.status}
        variant={statusBackground[order.status]}
        icon={orderStatusIcons[order.status]}
      />

      <ProductsContainer>
        <Text variant="caption" color="text.secondary">
          Produtos
        </Text>
        <Text variant="body2" lines={2}>
          {productsPreview}
          {remainingItems > 0 ? ` e mais ${remainingItems}` : ""}
        </Text>
      </ProductsContainer>

      <Footer>
        <div>
          <Text variant="caption" color="text.secondary">
            Criado em
          </Text>
          <Text variant="body2" weight="medium">
            {formatDate(order.createdAt, true)}
          </Text>
        </div>

        <ActionGroup>
          <Button variant="text" icon="download" onClick={handleGenerateContract}>
            Contrato
          </Button>
          <Button variant="text" icon="download" onClick={handleGenerateReceipt}>
            Recibo
          </Button>
          {onRequestStatusChange && (
            <Button
              variant="outline"
              icon="square-pen"
              onClick={() => onRequestStatusChange(order)}
            >
              Status
            </Button>
          )}
        </ActionGroup>
      </Footer>
    </Card>
  );
}
