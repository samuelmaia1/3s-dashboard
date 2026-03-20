import { formatToCurrency } from "@/formatter";
import { CartItem } from "@/types/Order";
import { Fab } from "@components/Fab/Fab";
import { Text } from "@components/Text/Text";
import { Box } from "@mui/material";

interface ConfirmationStepProps {
    items: CartItem[];
    onNext: () => void;
    onBack: () => void;
}

export function ConfirmationStep({ items, onNext, onBack }: ConfirmationStepProps) {
    return (
        <Box>
            <Text variant="h6" sx={{marginBottom: 4}}>Confirme os itens</Text>
            {items.map(item => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text variant="body1">{item.quantity} x {item.product.name}</Text>
                    <Text variant="body1" color="text.secondary">{formatToCurrency(item.product.price * item.quantity)}</Text>
                </Box>
            ))}

            <Text color="text.secondary" textAlign={'end'} sx={{marginTop: 4}}>
                Total: {formatToCurrency(items.reduce((acc, item) => acc + item.product.price * item.quantity, 0))}
            </Text>

            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab onClick={onNext} icon="arrow-right" size={32} iconSize={20}/>
            </Box>
        </Box>
    );
}