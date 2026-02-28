import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  useTheme,
} from "@mui/material";
import { Text } from "@components/Text/Text";
import { TextTag, TextTagVariant } from "@components/TextTag/TextTag";
import { Contract, ContractStatus } from "@/types/Contract";

interface ContractsTableProps {
  contracts: Contract[];
}

const statusBackground: Record<ContractStatus, TextTagVariant> = {
  [ContractStatus.CANCELADO]: "error",
  [ContractStatus.ASSINADO]: "success",
  [ContractStatus.ASSINATURA_PENDENTE]: "warning",
};

export default function ContractsTable({ contracts }: ContractsTableProps) {
  const theme = useTheme();

  return (
    <TableContainer sx={{ bgcolor: "transparent" }}>
      <Table
        sx={{ minWidth: 400, tableLayout: "auto" }}
        aria-label="tabela de aluguéis"
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
              <TableCell>
                <Box>
                  <Text
                    variant="body1"
                    weight="medium"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {contract.costumer.name} {contract.costumer.lastName}
                  </Text>
                </Box>
              </TableCell>

              <TableCell>
                <Text color={theme.palette.text.secondary} variant="body2">
                  N° {contract.code}
                </Text>
              </TableCell>

              <TableCell align="right">
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <TextTag
                    text={contract.status}
                    variant={statusBackground[contract.status]}
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
