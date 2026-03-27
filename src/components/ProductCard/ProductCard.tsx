"use client";

import { useState } from "react";
import { Text } from "@components/Text/Text";
import { Button } from "@components/Button/Button";
import { Product } from "@/types/Product";
import { formatToCurrency } from "@/formatter";
import {
  CardContainer,
  ContentContainer,
  FooterContainer,
  HeaderRow,
  ImageWrapper,
  OutOfStockBadge,
  QuantityControls,
} from "./style";
import { TextTag } from "@components/TextTag/TextTag";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  onQuantityChange?: (product: Product, quantity: number) => void;
  showQuantityControls?: boolean;
}

export function ProductCard({
  product,
  onQuantityChange,
  showQuantityControls,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const isOutOfStock = product.stock <= 0;

  const router = useRouter();

  function handleIncrement() {
    if (quantity < (product.stock ?? 0)) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(product, newQuantity);
    }
  }

  function handleDecrement() {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(product, newQuantity);
    }
  }

  return (
    <CardContainer
      $isOutOfStock={isOutOfStock}
      onClick={() => router.push(`/products/${product.id}`)}
    >
      {isOutOfStock && <OutOfStockBadge>Indisponível</OutOfStockBadge>}
      <ImageWrapper>
        <img src={product.imageUri} alt={product.name} loading="lazy" />
      </ImageWrapper>

      <ContentContainer>
        <HeaderRow>
          <Text weight="bold" variant="body1" lines={1} style={{ flex: 1 }}>
            {product.name}
          </Text>
          <Text color="succesmain" weight="bold">
            {formatToCurrency(product.price)}
          </Text>
        </HeaderRow>

        <Text variant="body2" color="text.secondary" lines={3} sx={{ mb: 2 }}>
          {product.description}
        </Text>

        <FooterContainer>
          <Text variant="caption" color="text.secondary" weight="medium">
            Estoque: {product.stock} un.
          </Text>

          {showQuantityControls && (
            <QuantityControls>
              <Button
                variant="text"
                size="small"
                onClick={handleDecrement}
                disabled={quantity === 0}
                style={{ minWidth: "36px" }}
              >
                -
              </Button>

              <Text weight="bold" color="text.primary">
                {quantity}
              </Text>

              <Button
                variant="filled"
                size="small"
                color="primary"
                onClick={handleIncrement}
                disabled={quantity >= (product.stock ?? 0)}
                style={{ minWidth: "36px" }}
                shape="square"
              >
                +
              </Button>
            </QuantityControls>
          )}
        </FooterContainer>
      </ContentContainer>
    </CardContainer>
  );
}
