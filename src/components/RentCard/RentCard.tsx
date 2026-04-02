import { formatAddressToString, formatDate, formatToCurrency } from "@/formatter";
import { downloadContractPdf } from "@/services/contract.service";
import { Rent, RentStatus, rentStatusIcons } from "@/types/Rent";
import { Button } from "@components/Button/Button";
import { Card } from "@components/Card/Card";
import { Text } from "@components/Text/Text";
import { TextTag, TextTagVariant } from "@components/TextTag/TextTag";
import { useTheme } from "@mui/material";
import { ActionGroup, Footer, MetricItem, MetricsGrid, ProductsContainer } from "@components/OrderCard/style";

interface RentCardProps {
  rent: Rent;
  onRequestStatusChange?: (rent: Rent) => void;
}

const statusBackground: Record<RentStatus, TextTagVariant> = {
  [RentStatus.REALIZADO]: "info",
  [RentStatus.CONTRATO_ASSINADO]: "info",
  [RentStatus.PAGAMENTO_APROVADO]: "success",
  [RentStatus.AGUARDANDO_ENTREGA]: "warning",
  [RentStatus.ENTREGUE]: "success",
  [RentStatus.CONCLUIDO]: "success",
  [RentStatus.CANCELADO]: "error",
};

export function RentCard({ rent, onRequestStatusChange }: RentCardProps) {
  const theme = useTheme();

  const customerName = `${rent.costumer.name} ${rent.costumer.lastName}`;
  const totalItems = rent.items.reduce((acc, item) => acc + item.quantity, 0);
  const productsPreview = rent.items
    .slice(0, 2)
    .map((item) => item.product.name)
    .join(", ");
  const remainingItems = rent.items.length - 2;
  const locationLabel = rent.deliveryAddress
    ? formatAddressToString(rent.deliveryAddress)
    : "Retirada no local";

  function handleGenerateContract() {
    downloadContractPdf(rent.id, rent.costumerId, "RENT");
  }

  return (
    <Card
      title={customerName}
      description={locationLabel}
      icon={rentStatusIcons[rent.status]}
      textVariant="body2"
      textColor="primary"
      iconColor={theme.palette.primary.main}
    >
      <MetricsGrid>
        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Locação
          </Text>
          <Text variant="body1" weight="medium">
            N° {rent.code}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Total
          </Text>
          <Text variant="body1" weight="medium">
            {formatToCurrency(rent.total)}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Frete
          </Text>
          <Text variant="body1" weight="medium">
            {rent.deliveryAddress ? formatToCurrency(rent.deliveryTax ?? 0) : "Sem frete"}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Período
          </Text>
          <Text variant="body1" weight="medium">
            {formatDate(rent.deliveryDate)}
            {rent.returnDate ? ` - ${formatDate(rent.returnDate)}` : ""}
          </Text>
        </MetricItem>

        <MetricItem>
          <Text variant="caption" color="text.secondary">
            Modalidade
          </Text>
          <Text variant="body1" weight="medium">
            {rent.deliveryAddress ? "Entrega" : "Retirada"}
          </Text>
        </MetricItem>
      </MetricsGrid>

      <TextTag
        text={rent.status}
        variant={statusBackground[rent.status]}
        icon={rentStatusIcons[rent.status]}
      />

      <ProductsContainer>
        <Text variant="caption" color="text.secondary">
          Itens alugados
        </Text>
        <Text variant="body2" lines={2}>
          {productsPreview}
          {remainingItems > 0 ? ` e mais ${remainingItems}` : ""}
        </Text>
        <Text variant="body2" color="text.secondary">
          {totalItems} unidade{totalItems !== 1 ? "s" : ""}
        </Text>
      </ProductsContainer>

      <Footer>
        <div>
          <Text variant="caption" color="text.secondary">
            Criado em
          </Text>
          <Text variant="body2" weight="medium">
            {formatDate(rent.createdAt, true)}
          </Text>
        </div>

        <ActionGroup>
          <Button variant="text" icon="download" onClick={handleGenerateContract}>
            Contrato
          </Button>
          {onRequestStatusChange && (
            <Button
              variant="outline"
              icon="square-pen"
              onClick={() => onRequestStatusChange(rent)}
            >
              Status
            </Button>
          )}
        </ActionGroup>
      </Footer>
    </Card>
  );
}
