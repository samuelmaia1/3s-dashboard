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
import Link from "next/link";
import { Costumer } from "@/types/Costumer";

type CostumersTableProps = {
  costumers: Costumer[];
};

export function CostumersTable({ costumers }: CostumersTableProps) {
  const theme = useTheme();

  return (
    <TableContainer sx={{ bgcolor: "transparent" }}>
      <Table sx={{ width: "100%", minWidth: 400, tableLayout: "auto" }} aria-label="tabela de produtos">
        <TableBody>
          {costumers.map((costumer) => (
            <TableRow
              component={Link}
              href={`/costumers/${costumer.id}`}
              key={costumer.id}
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
                  <Text variant="body2" sx={{ lineHeight: 1.2 }} truncate>
                    {`${costumer.name} ${costumer.lastName.split(" ")[0]}`}
                  </Text>
                </Box>
              </TableCell>

              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Text
                  variant="body2"
                  weight="medium"
                  sx={{ lineHeight: 1.2 }}
                  truncate
                  color="text.secondary"
                >
                  {costumer.email}
                </Text>
              </TableCell>

              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Text
                  variant="body2"
                  weight="medium"
                  sx={{ lineHeight: 1.2 }}
                  truncate
                  color="text.secondary"
                >
                  {`${costumer.address.neighborhood} - ${costumer.address.city}`}
                </Text>
              </TableCell>

              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Text
                  variant="body2"
                  weight="medium"
                  sx={{ lineHeight: 1.2 }}
                  truncate
                  color="text.secondary"
                >
                  {costumer.cpf}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
