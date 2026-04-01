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
import { Rent, RentStatus } from "@/types/Rent";
import { Icon } from "@components/Icon/Icon";
import { downloadContractPdf } from "@/services/contract.service";

interface RentsTableProps {
  rents: Rent[];
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

export default function RentsTable({
  rents,
  onRequestStatusChange,
}: RentsTableProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRent, setSelectedRent] = useState<Rent | null>(null);

  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    rent: Rent,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRent(rent);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRent(null);
  };

  async function handleGenerateContract() {
    downloadContractPdf(selectedRent?.id!, selectedRent?.costumerId!);
    handleCloseMenu();
  }

  async function handleChangeStatus() {
    if (onRequestStatusChange) onRequestStatusChange(selectedRent!);
    handleCloseMenu();
  }

  return (
    <>
      <TableContainer sx={{ bgcolor: "transparent" }}>
        <Table
          sx={{ minWidth: 400, tableLayout: "auto" }}
          aria-label="tabela de aluguéis"
        >
          <TableBody>
            {rents.map((rent) => (
              <TableRow
                key={rent.id}
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
                <TableCell>
                  <Box>
                    <Text variant="body1" sx={{ lineHeight: 1.2 }}>
                      {rent.costumer.name}{" "}
                      {rent.costumer.lastName.split(" ")[0]}
                    </Text>
                  </Box>
                </TableCell>

                <TableCell>
                  <Text color={theme.palette.text.secondary} variant="body2">
                    {rent.code}
                  </Text>
                </TableCell>

                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <TextTag
                      text={rent.status}
                      variant={statusBackground[rent.status]}
                    />
                  </Box>
                </TableCell>

                {onRequestStatusChange && (
                  <TableCell align="right" sx={{width: '100px'}}>
                    <IconButton
                      onClick={(e) => handleOpenMenu(e, rent)}
                      aria-controls={openMenu ? "rent-menu" : undefined}
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
        id="rent-menu"
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
