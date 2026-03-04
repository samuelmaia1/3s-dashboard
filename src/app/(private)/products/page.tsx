"use client";

import { Modal } from "@components/Modal/Modal";
import { Button } from "@components/Button/Button";
import { useEffect, useState } from "react";
import { CreateProductForm } from "./(components)/CreateProductForm";
import ProductsTable from "@components/ProductsTable/ProductsTable";
import { Product } from "@/types/Product";
import { api } from "@/lib/axios";
import { routes } from "@/constants/api-routes";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";
import { Pageable } from "@/types/ApiResponse";
import { Input } from "@components/Input/Input";
import { LoadingContainer } from "../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Text } from "@components/Text/Text";
import { Container, Page, PaginationContainer, SearchContainer, TopContainer } from "./style";

interface Filters {
  page: number;
  size: number;
  sort: string;
}

export default function Products() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    size: 2,
    sort: "createdAt,desc",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<Pageable>({
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const { showMessage } = useFlashMessage();

  const showPagination: boolean = page.totalPages > 1;

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await api.get(routes.users.products, {
        params: filters,
      });
      setProducts(response.data.content);
      setPage(response.data.page);
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage(`Erro ao criar produto: ${error.message}`, "error");
      }

      showMessage("Erro ao buscar produtos", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/ws-products`,
    );

    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/products", (message) => {
          const newProduct: Product = JSON.parse(message.body);

          setProducts((prevProducts) => {
            return [newProduct, ...prevProducts];
          });

          resetFilters();
        });
      },
      onStompError: (frame) => {
        console.error("Erro no STOMP:", frame);
        showMessage("Erro na conexão em tempo real dos produtos", "error");
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, []);

  function resetFilters() {
    setFilters({
      page: 0,
      size: 2,
      sort: "createdAt,desc",
    });
  }

  function getVisiblePages(
    current: number,
    total: number,
    range = 2,
  ): number[] {
    const start = Math.max(0, current - range);
    const end = Math.min(total - 1, current + range);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
  }

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner size={24} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Modal onClose={() => setOpen(false)} open={open} title="Novo Produto">
        <CreateProductForm
          closeModal={() => setOpen(false)}
          cleanFilters={resetFilters}
        />
      </Modal>
      <TopContainer>
        <SearchContainer>
          <Input endIcon="search" />
        </SearchContainer>
        <Button color="primary" onClick={() => setOpen(true)} icon="plus" />
      </TopContainer>
      <ProductsTable products={products} />

      {showPagination && 
        <PaginationContainer>
            {page.number > 0 && 
                <Button
                    icon="arrow-left"
                    onClick={() => setFilters({ ...filters, page: page.number - 1 })}
                    variant="text"
                />
            }
            {getVisiblePages(page.number, page.totalPages).map((pageIndex) => (
                <Page
                    key={pageIndex}
                    onClick={() =>
                        setFilters({ ...filters, page: pageIndex })
                    }
                    active={page.number === pageIndex}
                >
                    <Text variant="body1" color="inherit">
                    {pageIndex + 1}
                    </Text>
                </Page>
            ))}
            {page.number < page.totalPages - 1 && 
                <Button
                    icon="arrow-right"
                    onClick={() => setFilters({ ...filters, page: page.number + 1 })}
                    variant="text"
                />
            }
        </PaginationContainer>
      }
    </Container>
  );
}
