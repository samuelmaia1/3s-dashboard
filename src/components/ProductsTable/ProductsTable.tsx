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
import { TextTag } from "@components/TextTag/TextTag";
import { formatToCurrency } from "@/formatter";
import { Product } from "@/types/Product";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const theme = useTheme();

  return (
    <TableContainer sx={{ bgcolor: "transparent" }}>
      <Table
        sx={{ tableLayout: "auto" }}
        aria-label="tabela de produtos"
      >
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
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
              <TableCell sx={{ width: "80%" }}>
                <Box>
                  <Text variant="body2" weight="medium" sx={{ lineHeight: 1.2 }} truncate>
                    {product.name}
                  </Text>
                </Box>
              </TableCell>

              <TableCell align="right" sx={{ whiteSpace: "nowrap" }} width={50}>
                <TextTag 
                  text={product.stock === 0 ? "Esgotado" : "Em estoque"} 
                  variant={product.stock === 0 ? "error" : "success"} 
                />
              </TableCell>

              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Text variant="body2" weight="medium" sx={{ lineHeight: 1.2 }} color={theme.palette.text.secondary}>
                        {formatToCurrency(product.price)}
                    </Text>
                </Box>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}