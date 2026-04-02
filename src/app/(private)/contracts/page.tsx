"use client";

import {
  Container,
  Page,
  PaginationContainer,
  SearchContainer,
  TopContainer,
} from "./style";
import { useEffect, useState } from "react";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import ContractsTable from "@components/ContractsTable/ContractsTable";
import { ApiError } from "@/types/Error";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { Filters, Pageable } from "@/types/ApiTypes";
import { Contract, ContractRealtimePayload, ContractStatus } from "@/types/Contract";
import { Text } from "@components/Text/Text";
import { LoadingContainer } from "../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { fetchContracts } from "@/services/contract.service";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Contracts() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    size: 10,
    sort: [{ field: "createdAt", direction: "asc" }]
  });

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [page, setPage] = useState<Pageable>({
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const { showMessage } = useFlashMessage();

  const showPagination: boolean = page.totalPages > 1;

  async function fetchContractsData() {
    setLoading(true);
    try {
      const response = await fetchContracts(filters);
      setContracts(response.content);
      setPage(response.page);
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage(`Erro ao buscar contratos: ${error.message}`, "error");
      } else {
        showMessage("Erro ao buscar contratos", "error");
      }
    } finally {
      setLoading(false);
    }
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

  function onMarkContractAsSigned(contractId: string) {
    setContracts((prev) => {
      return prev.map((contract) => {
        if (contract.id === contractId) {
          return {
            ...contract,
            status: ContractStatus.ASSINADO,
          };
        }
        return contract;
      });
    });
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchContractsData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters]);

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/ws-contracts`,
    );

    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/contracts", (message) => {
          const newContract: ContractRealtimePayload = JSON.parse(message.body);

          setContracts((prevContracts) => {
            return [newContract.summary, ...prevContracts];
          });
        });
      },
      onStompError: (frame) => {
        console.error("Erro no STOMP:", frame);
        showMessage("Erro na conexão em tempo real dos contratos", "error");
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

  return (
    <Container>
      <TopContainer>
        <SearchContainer>
          <Input
            endIcon="search"
            value={filters.name || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                page: 0,
                name: e.target.value,
              })
            }
            placeholder="Pesquise por contratos..."
          />
        </SearchContainer>
      </TopContainer>
      {!loading && <ContractsTable contracts={contracts} onMarkContractAsSigned={onMarkContractAsSigned} />}

      {showPagination && !loading && (
        <PaginationContainer>
          {page.number > 0 && (
            <Button
              icon="arrow-left"
              onClick={() => setFilters({ ...filters, page: page.number - 1 })}
              variant="text"
            />
          )}
          {getVisiblePages(page.number, page.totalPages).map((pageIndex) => (
            <Page
              key={pageIndex}
              onClick={() => setFilters({ ...filters, page: pageIndex })}
              active={page.number === pageIndex}
            >
              <Text variant="body1" color="inherit">
                {pageIndex + 1}
              </Text>
            </Page>
          ))}
          {page.number < page.totalPages - 1 && (
            <Button
              icon="arrow-right"
              onClick={() => setFilters({ ...filters, page: page.number + 1 })}
              variant="text"
            />
          )}
        </PaginationContainer>
      )}

      {loading && (
        <LoadingContainer heightToShow={"50vh"}>
          <LoadingSpinner size={24} />
        </LoadingContainer>
      )}
    </Container>
  );
}
