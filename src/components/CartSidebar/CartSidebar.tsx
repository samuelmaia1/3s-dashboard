'use client';

import { Box, IconButton } from "@mui/material";
import { Icon } from "@components/Icon/Icon";
import { Text } from "@components/Text/Text";
import { Button } from "@components/Button/Button";
import { Product } from "@/types/Product";
import { CartContent, CartFooter, CartHeader, StyledCartDrawer, TotalRow } from "./style";
import { useEffect, useState } from "react";
import { formatToCurrency } from "@/formatter";
import { CartItem } from "@/types/Order";
import { CartProduct } from "./CartProduct";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSetCartItems: (items: CartItem[]) => void;
  onFinish?: () => void;
}

export default function CartSidebar({ open, onClose, cartItems, onSetCartItems, onFinish }: CartSidebarProps) {
    const [total, setTotal] = useState(0);

    function clearCart() {
        onSetCartItems([]);
    }

    function calculateTotal() {
        const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotal(total);
    }

    useEffect(() => {
        calculateTotal();
    }, [cartItems])

  return (
    <StyledCartDrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <CartHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Icon name="shopping-cart" size={20} />
          <Text weight="bold" variant="body1">Meu Carrinho</Text>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button size="small" onClick={clearCart} icon="trash" color="error" shape="square"/>
            <IconButton onClick={onClose} size="small" sx={{ color: 'inherit' }}>
              <Icon name="x" size={20} />
            </IconButton>
        </Box>
      </CartHeader>

      <CartContent>
        {cartItems.length === 0 ? 
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Icon name="shopping-bag" size={36} style={{ opacity: 0.2, marginBottom: 16 }} />
                <Text color="text.secondary">Seu carrinho está vazio</Text>
            </Box> : 
            cartItems.map(item => (
                <CartProduct key={item.product.id} item={item} />
            ))
        }
      </CartContent>

      <CartFooter>
        <TotalRow>
          <Text weight="medium">Total:</Text>
          <Text weight="bold" variant="h6" color="succesmain">
            {formatToCurrency(total)}
          </Text>
        </TotalRow>
        
        <Button 
          fullWidth 
          color="primary" 
          variant="filled"
          size="large"
          disabled={cartItems.length === 0}
          onClick={onFinish}
        >
          Finalizar Pedido
        </Button>
      </CartFooter>
    </StyledCartDrawer>
  );
}