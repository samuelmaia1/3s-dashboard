import { formatToCurrency } from "@/formatter";
import { CartItem } from "@/types/Order";
import { Text } from "@components/Text/Text";
import { Box } from "@mui/material";

interface CartItemProps {
    item: CartItem
}

export function CartProduct({item}: CartItemProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text variant="body1">{item.quantity} x {item.product.name}</Text>
            <Text variant="body1" color="text.secondary">{formatToCurrency(item.product.price * item.quantity)}</Text>
        </Box>
    );

}