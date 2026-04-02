import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Text } from "@components/Text/Text";
import { TextTag, TextTagVariant } from "@components/TextTag/TextTag";
import { Order, OrderStatus } from "@/types/Order";
import { Icon } from "@components/Icon/Icon";
import { downloadContractPdf } from "@/services/contract.service";

interface OrdersTableProps {
  orders: Order[];
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

export default function OrdersTable({
  orders,
  onRequestStatusChange,
}: OrdersTableProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: Order,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  async function handleGenerateContract() {
    downloadContractPdf(selectedOrder?.id!, selectedOrder?.costumerId!, "ORDER");
    handleCloseMenu();
  }

  async function handleChangeStatus() {
    if (onRequestStatusChange) onRequestStatusChange(selectedOrder!);
    handleCloseMenu();
  }

  return (
    <>
      <TableContainer sx={{ bgcolor: "transparent" }}>
        <Table
          sx={{ width: "100%", minWidth: 400, tableLayout: "auto" }}
          aria-label="tabela de pedidos"
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
                  borderRadius: 8,
                }}
              >
                <TableCell sx={{ width: "100%" }}>
                  <Box>
                    <Text variant="body1" sx={{ lineHeight: 1.2 }}>
                      {order.costumer.name}{" "}
                      {order.costumer.lastName.split(" ")[0]}
                    </Text>
                  </Box>
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Text color={theme.palette.text.secondary} variant="body2">
                    N° {order.code}
                  </Text>
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <TextTag
                      text={order.status}
                      variant={statusBackground[order.status]}
                      width="100%"
                    />
                  </Box>
                </TableCell>

                {onRequestStatusChange && (
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      onClick={(e) => handleOpenMenu(e, order)}
                      aria-controls={openMenu ? "order-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                    >
                      <Icon name="ellipsis" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        id="order-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 180 },
        }}
      >
        <MenuItem
          onClick={handleGenerateContract}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text variant="body1">Gerar contrato</Text>
          <Icon name="download" size={18} style={{ marginLeft: 10 }} />
        </MenuItem>
        <MenuItem
          onClick={handleChangeStatus}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text variant="body1">Atualizar status</Text>
          <Icon name="square-pen" size={18} style={{ marginLeft: 10 }} />
        </MenuItem>
      </Menu>
    </>
  );
}
