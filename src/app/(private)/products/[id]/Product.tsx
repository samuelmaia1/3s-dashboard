'use client';

import { Product } from "@/types/Product";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { useState } from "react";
import {
  ActionBar,
  Container,
  DescriptionCard,
  DetailCard,
  DetailGrid,
  DetailList,
  DetailRow,
  Eyebrow,
  HeaderRow,
  HeroContent,
  HeroGrid,
  HeroSection,
  HeroTop,
  HighlightCard,
  HighlightRow,
  MetricCard,
  MetricHeader,
  MetricIconWrap,
  MetricsGrid,
  ProductImageFrame,
  ProductVisualCard,
  StatusBadge,
  TitleBlock,
} from "./style";
import { Text } from "@components/Text/Text";
import { formatToCurrency } from "@/formatter";
import { Button } from "@components/Button/Button";
import { Modal } from "@components/Modal/Modal";
import Image, { StaticImageData } from "next/image";
import FallbackImage from "@/assets/images/fallback-image.jpg";
import { ConfirmationModal } from "@components/ConfirmationModal/ConfirmationModal";
import { EditProductForm } from "./(components)/EditProductForm";
import axios from "axios";
import { ApiError } from "@/types/Error";
import { deleteProduct } from "@/services/product.service";
import { NotFound } from "@components/NotFound/NotFound";
import { useRouter } from "next/navigation";
import { RevenueAreaChart } from "@components/RevenueAreaChart/RevenueAreaChart";
import { Box, useTheme } from "@mui/material";
import { Icon } from "@components/Icon/Icon";

interface ProductClientProps {
  product: Product | null;
}

export default function ProductClient({ product }: ProductClientProps) {
  console.log("Produto recebido no componente:", product); // Log para verificar os dados recebidos
  const [currentProduct, setCurrentProduct] = useState<Product | null>(product);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    product?.imageUri || FallbackImage
  );

  const { showMessage } = useFlashMessage();
  const router = useRouter();
  const theme = useTheme();

  if (!currentProduct) {
    return <NotFound title="Produto não encontrado." text={"Infelizmente, este produto não existe na base de dados."}/>;
  }

  const revenueData = currentProduct.revenueChart ?? [];
  const totalRevenue = revenueData.reduce((acc, item) => acc + item.total, 0);
  const averageRevenue = revenueData.length ? totalRevenue / revenueData.length : 0;
  const bestRevenueMonth = revenueData.reduce<(typeof revenueData)[number] | null>(
    (best, item) => (!best || item.total > best.total ? item : best),
    null
  );
  const inventoryValue = currentProduct.price * currentProduct.stock;

  const stockMeta =
    currentProduct.stock <= 0
      ? {
          label: "Sem estoque",
          tone: "error" as const,
          helper: "Reabastecimento necessário para retomar vendas.",
        }
      : currentProduct.stock <= 5
        ? {
            label: "Estoque baixo",
            tone: "warning" as const,
            helper: "Bom momento para planejar reposição.",
          }
        : {
            label: "Estoque saudável",
            tone: "success" as const,
            helper: "Quantidade confortável para novas vendas.",
          };

  const bestMonthLabel = bestRevenueMonth
    ? (() => {
        const formattedMonth = new Intl.DateTimeFormat("pt-BR", {
          month: "long",
          year: "numeric",
        }).format(new Date(`${bestRevenueMonth.reference}-01T00:00:00`));

        return formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
      })()
    : "Sem histórico";

  async function handleDeleteProduct() {
    try {
      if (!currentProduct?.id) {
        return;
      }

      await deleteProduct(currentProduct.id);
      showMessage("Produto excluido com sucesso!", "success");
      router.replace("/products");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
    }
  }

  function handleUpdateProduct(updatedProduct: Product) {
    setCurrentProduct(updatedProduct);
    setImageSrc(updatedProduct.imageUri || FallbackImage);
    showMessage("Produto atualizado com sucesso!", "success");
    setEditProductModalOpen(false);
  }

  return (
    <Container>
      <Modal onClose={() => setEditProductModalOpen(false)} open={editProductModalOpen} title="Editar Produto">
        <EditProductForm id={currentProduct.id} onUpdated={handleUpdateProduct}/>
      </Modal>

      <ConfirmationModal
        onClose={() => setDeleteProductModalOpen(false)}
        open={deleteProductModalOpen}
        title="Excluir Produto"
        onCancel={() => setDeleteProductModalOpen(false)}
        onConfirm={handleDeleteProduct}
      >
        <Text variant="body1">Confirma que deseja excluir este produto?</Text>
      </ConfirmationModal>

      <HeaderRow>
        <Box>
          <Text variant="body1" weight="bold">Visão do produto</Text>
        </Box>

        <ActionBar>
          <Button variant="outline" icon="pencil-line" onClick={() => setEditProductModalOpen(true)}>
            Editar produto
          </Button>
          <Button color="error" icon="trash" onClick={() => setDeleteProductModalOpen(true)}>
            Excluir
          </Button>
        </ActionBar>
      </HeaderRow>

      <HeroSection elevation={0}>
        <HeroGrid>
          <HeroContent>
            <HeroTop>
              <Eyebrow>
                <Icon name="package-search" size={16} color={theme.palette.text.secondary} />
                <Text variant="body2" color="text.secondary" weight="medium">
                  Catálogo de produtos
                </Text>
              </Eyebrow>

              <TitleBlock>
                <Text variant="h3" weight="bold" sx={{ lineHeight: 1.1 }}>
                  {currentProduct.name}
                </Text>
                <Text variant="body1" color="text.secondary">
                  ID do produto: {currentProduct.id}
                </Text>
              </TitleBlock>
            </HeroTop>

            <DescriptionCard>
              <Text variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
                Descrição
              </Text>
              <Text variant="body1" sx={{ lineHeight: 1.8 }}>
                {currentProduct.description || "Nenhuma descrição cadastrada para este produto."}
              </Text>
            </DescriptionCard>

            <MetricsGrid>
              <MetricCard>
                <MetricHeader>
                  <Text variant="body2" color="text.secondary">Preço unitário</Text>
                  <MetricIconWrap>
                    <Icon name="badge-dollar-sign" size={20} />
                  </MetricIconWrap>
                </MetricHeader>
                <Text variant="h5" weight="bold">{formatToCurrency(currentProduct.price)}</Text>
                <Text variant="body2" color="text.secondary">
                  Valor base praticado por unidade vendida.
                </Text>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <Text variant="body2" color="text.secondary">Valor em estoque</Text>
                  <MetricIconWrap>
                    <Icon name="wallet-cards" size={20} />
                  </MetricIconWrap>
                </MetricHeader>
                <Text variant="h5" weight="bold">{formatToCurrency(inventoryValue)}</Text>
                <Text variant="body2" color="text.secondary">
                  Estimativa considerando o volume disponível hoje.
                </Text>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <Text variant="body2" color="text.secondary">Faturamento médio</Text>
                  <MetricIconWrap>
                    <Icon name="chart-spline" size={20} />
                  </MetricIconWrap>
                </MetricHeader>
                <Text variant="h5" weight="bold">
                  {revenueData.length ? formatToCurrency(averageRevenue) : "Sem dados"}
                </Text>
                <Text variant="body2" color="text.secondary">
                  Média mensal com base no histórico disponível.
                </Text>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <Text variant="body2" color="text.secondary">Melhor mês</Text>
                  <MetricIconWrap>
                    <Icon name="sparkles" size={20} />
                  </MetricIconWrap>
                </MetricHeader>
                <Text variant="h5" weight="bold">
                  {bestRevenueMonth ? formatToCurrency(bestRevenueMonth.total) : "Sem dados"}
                </Text>
                <Text variant="body2" color="text.secondary">
                  {bestMonthLabel}
                </Text>
              </MetricCard>
            </MetricsGrid>
          </HeroContent>

          <ProductVisualCard>
            <ProductImageFrame>
              <Image
                src={imageSrc}
                alt={currentProduct.name}
                fill
                onError={() => setImageSrc(FallbackImage)}
                style={{ objectFit: "cover" }}
              />
            </ProductImageFrame>

            <Box display="flex" flexDirection="column" gap={1.5}>
              <StatusBadge $tone={stockMeta.tone}>
                <Icon
                  name={
                    stockMeta.tone === "error"
                      ? "octagon-alert"
                      : stockMeta.tone === "warning"
                        ? "triangle-alert"
                        : "circle-check-big"
                  }
                  size={16}
                />
                <Text variant="body2" weight="bold" color="inherit">
                  {stockMeta.label}
                </Text>
              </StatusBadge>

              <Text variant="h6" weight="bold">
                {currentProduct.stock} unidades disponíveis
              </Text>
              <Text variant="body2" color="text.secondary">
                {stockMeta.helper}
              </Text>
            </Box>
          </ProductVisualCard>
        </HeroGrid>
      </HeroSection>

      <RevenueAreaChart title="Comparativo de venda mensal" data={revenueData}/>

      <DetailGrid>
        <DetailCard elevation={0}>
          <Text variant="h6" weight="bold">Informações comerciais</Text>
          <DetailList>
            <DetailRow>
              <Text variant="body2" color="text.secondary">Produto</Text>
              <Text variant="body1" weight="medium">{currentProduct.name}</Text>
            </DetailRow>
            <DetailRow>
              <Text variant="body2" color="text.secondary">Preço unitário</Text>
              <Text variant="body1" weight="medium">{formatToCurrency(currentProduct.price)}</Text>
            </DetailRow>
            <DetailRow>
              <Text variant="body2" color="text.secondary">Estoque disponível</Text>
              <Text variant="body1" weight="medium">{currentProduct.stock} unidades</Text>
            </DetailRow>
            <DetailRow>
              <Text variant="body2" color="text.secondary">Potencial bruto</Text>
              <Text variant="body1" weight="medium">{formatToCurrency(inventoryValue)}</Text>
            </DetailRow>
            <DetailRow>
              <Text variant="body2" color="text.secondary">Histórico mensal</Text>
              <Text variant="body1" weight="medium">
                {revenueData.length ? `${revenueData.length} registros disponíveis` : "Nenhum histórico de faturamento"}
              </Text>
            </DetailRow>
          </DetailList>
        </DetailCard>

        <DetailCard elevation={0}>
          <Text variant="h6" weight="bold">Resumo operacional</Text>
          <HighlightCard>
            <HighlightRow>
              <Text variant="body2" color="text.secondary">Receita acumulada</Text>
              <Text variant="body1" weight="bold">
                {revenueData.length ? formatToCurrency(totalRevenue) : "Sem dados"}
              </Text>
            </HighlightRow>
            <HighlightRow>
              <Text variant="body2" color="text.secondary">Mês de pico</Text>
              <Text variant="body1" weight="bold">{bestMonthLabel}</Text>
            </HighlightRow>
            <HighlightRow>
              <Text variant="body2" color="text.secondary">Disponibilidade</Text>
              <Text variant="body1" weight="bold">{stockMeta.label}</Text>
            </HighlightRow>
          </HighlightCard>

          <DescriptionCard>
            <Text variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
              Leitura rápida
            </Text>
            <Text variant="body1" sx={{ lineHeight: 1.8 }}>
              {revenueData.length
                ? `O produto mantém ${revenueData.length} meses de histórico, com média de ${formatToCurrency(averageRevenue)} por mês e pico em ${bestMonthLabel}.`
                : "Ainda não há dados de faturamento suficientes para análises comparativas neste produto."}
            </Text>
          </DescriptionCard>
        </DetailCard>
      </DetailGrid>
    </Container>
  );
}
