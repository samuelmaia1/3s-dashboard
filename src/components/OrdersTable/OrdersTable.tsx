import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Box,
  Avatar,
  useTheme, 
} from "@mui/material";
import { Text } from "@components/Text/Text";
import { TextTag, TextTagVariant } from "@components/TextTag/TextTag";
import { Order, OrderStatus } from "@/types/Order";
import { formatDate } from "@/formatter";

interface OrdersTableProps {
  orders: Order[];
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

export default function OrdersTable({ orders }: OrdersTableProps) {
  const theme = useTheme();

  return (
    <TableContainer sx={{ bgcolor: "transparent" }}>
      <Table
        sx={{ minWidth: 400, tableLayout: "auto" }}
        aria-label="tabela de aluguéis"
      >
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              sx={{
                "& td": {
                  border: "none",
                  py: 1.5,
                  px: 1.5,
                },
                "&:hover": {
                  bgcolor: "action.hover",
                  cursor: "pointer",
                },
                borderRadius: 8
              }}
            >
              <TableCell>
                <Box>
                  <Text variant="body1" weight="medium" sx={{ lineHeight: 1.2 }}>
                    {order.costumer.name} {order.costumer.lastName.split(" ")[0]}
                  </Text>
                </Box>
              </TableCell>

              <TableCell title="Data de entrega">
                <Text color={theme.palette.text.secondary} variant="body2">{formatDate(order.deliveryDate)}</Text>
              </TableCell>

              <TableCell align="right">
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <TextTag
                    text={order.status}
                    variant={statusBackground[order.status]}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}