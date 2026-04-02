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
import { Contract, ContractStatus } from "@/types/Contract";
import { Icon } from "@components/Icon/Icon";
import { downloadContractByCode, signContract } from "@/services/contract.service";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";

interface ContractsTableProps {
  contracts: Contract[];
  onMarkContractAsSigned: (contractId: string) => void;
  hideMenu?: boolean;
}

const statusBackground: Record<ContractStatus, TextTagVariant> = {
  [ContractStatus.CANCELADO]: "error",
  [ContractStatus.ASSINADO]: "success",
  [ContractStatus.ASSINATURA_PENDENTE]: "warning",
};

export default function ContractsTable({ contracts, onMarkContractAsSigned, hideMenu = false }: ContractsTableProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const openMenu = Boolean(anchorEl);

  const { showMessage } = useFlashMessage();

  function handleOpenMenu(
    event: React.MouseEvent<HTMLButtonElement>,
    contract: Contract,
  ){
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedContract(contract);
  };

  function handleCloseMenu() {
    setAnchorEl(null);
    setSelectedContract(null);
  };

  async function handleGenerateContract() {
    if (!selectedContract) return;

    try {
      await downloadContractByCode(selectedContract.code);
      showMessage("Contrato gerado com sucesso!", "success");
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage(`${error.message}`, "error");
      } else {
        showMessage("Erro ao gerar contrato", "error");
      }
    } finally {
      handleCloseMenu();
    };
  }

  async function handleSignContract() {
    if (!selectedContract) return;

     try {
      await signContract(selectedContract.id);
      onMarkContractAsSigned(selectedContract.id);
      showMessage("Contrato assinado com sucesso!", "success");
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage(`${error.message}`, "error");
      }
      else {
        showMessage("Erro ao assinar contrato", "error");
      }
    } finally {
      handleCloseMenu();
    }
  }

  return (
    <>
      <TableContainer sx={{ bgcolor: "transparent" }}>
        <Table
          sx={{ width: "100%", minWidth: 400, tableLayout: "auto" }}
          aria-label="tabela de contratos"
        >
          <TableBody>
            {contracts.map((contract) => (
              <TableRow
                key={contract.id}
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
                      {contract.costumer.name} {contract.costumer.lastName}
                    </Text>
                  </Box>
                </TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Text color={theme.palette.text.secondary} variant="body2" lines={1}>
                    N °{contract.code}
                  </Text>
                </TableCell>

                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <TextTag
                      text={contract.status}
                      variant={statusBackground[contract.status]}
                    />
                  </Box>
                </TableCell>

                {!hideMenu && 
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      onClick={(e) => handleOpenMenu(e, contract)}
                      aria-controls={openMenu ? "contract-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                    >
                      <Icon name="ellipsis" />
                    </IconButton>
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        id="contract-menu"
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
          onClick={handleSignContract}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text variant="body1">Marcar como assinado</Text>
          <Icon name="check" size={18} style={{ marginLeft: 10 }} />
        </MenuItem>
        
        <MenuItem
          onClick={handleGenerateContract}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text variant="body1">Baixar PDF</Text>
          <Icon name="download" size={18} style={{ marginLeft: 10 }} />
        </MenuItem>
      </Menu>
    </>
  );
}