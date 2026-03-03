"use client";

import { Modal } from "@components/Modal/Modal";
import { Container, SearchContainer, TopContainer } from "./style";
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
    size: 10,
    sort: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<Pageable>({
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const { showMessage } = useFlashMessage();

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
      size: 10,
      sort: "",
    });
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
    </Container>
  );
}
