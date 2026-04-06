"use client";

import { useEffect, useState } from "react";
import { getRents, updateRentStatus } from "@/services/rent.service";
import { Filters, Pageable } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { Rent, RentStatus, rentStatusIcons } from "@/types/Rent";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { Button } from "@components/Button/Button";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
// import RentsTable from "@components/RentsTable/RentsTable";
import { RentCard } from "@components/RentCard/RentCard";
import { Text } from "@components/Text/Text";
import { LoadingContainer } from "../style";
import { Container, Page, PaginationContainer, RentsGrid } from "./style";
import { Modal } from "@components/Modal/Modal";
import { Box } from "@mui/material";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { useRouter } from "next/navigation";

export default function RentsPage() {
  const [loading, setLoading] = useState(true);
  const [rents, setRents] = useState<Rent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentToUpdate, setRentToUpdate] = useState<Rent | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RentStatus | null>(null);
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    size: 12,
    sort: [{ field: "createdAt", direction: "desc" }],
  });
  const [page, setPage] = useState<Pageable>({
    number: 0,
    size: 12,
    totalElements: 0,
    totalPages: 0,
  });

  const { showMessage } = useFlashMessage();
  const router = useRouter();

  const showPagination = page.totalPages > 1;

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

  function handleOpenStatusModal(rent: Rent) {
    setRentToUpdate(rent);
    setSelectedStatus(rent.status);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setRentToUpdate(null);
    setSelectedStatus(null);
  }

  async function handleSaveStatus() {
    if (!selectedStatus || !rentToUpdate) return;

    try {
      await updateRentStatus(rentToUpdate.id, selectedStatus);
      setRents((prev) => {
        return prev.map((rent) => {
          if (rent.id === rentToUpdate.id) {
            return { ...rent, status: selectedStatus };
          }
          return rent;
        });
      });
      showMessage("Status atualizado com sucesso", "success");
    } catch {
      showMessage("Erro ao atualizar status", "error");
    } finally {
      handleCloseModal();
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      async function fetchRents() {
        setLoading(true);

        try {
          const response = await getRents(filters);
          setRents(response.content);
          setPage(response.page);
        } catch (error) {
          if (error instanceof ApiError) {
            showMessage(`Erro ao buscar locacoes: ${error.message}`, "error");
          } else {
            showMessage("Erro ao buscar locacoes", "error");
          }
        } finally {
          setLoading(false);
        }
      }

      fetchRents();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters]);

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/ws-rents`,
    );

    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/rents", (message: IMessage) => {
          const newRent: Rent = JSON.parse(message.body);

          setRents((prevRents) => {
            return [newRent, ...prevRents];
          });
        });
      },
      onStompError: (frame) => {
        console.error("Erro no STOMP:", frame);
        showMessage("Erro na conexão em tempo real das locacoes", "error");
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
        <Button onClick={() => router.push("/rents/create")}>Novo Aluguel</Button>
      </Box>

      {!loading && (
        <RentsGrid>
          {rents.map((rent) => (
            <RentCard
              key={rent.id}
              rent={rent}
              onRequestStatusChange={handleOpenStatusModal}
            />
          ))}
        </RentsGrid>
      )}

       <Modal onClose={handleCloseModal} open={isModalOpen}>
          <Text variant="h6">Atualizar status do pedido</Text>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px", marginBottom: "24px" }}>
              {Object.values(RentStatus).map((status) => (
                  <Button
                      key={status}
                      variant={selectedStatus === status ? "filled" : "text"} 
                      onClick={() => {
                          setSelectedStatus(status); 
                      }}
                      alignLeft
                      icon={rentStatusIcons[status]}
                  >
                      {status}
                  </Button>
              ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              <Button onClick={handleCloseModal} fullWidth color="error">
                  Cancelar
              </Button>
              <Button 
                  variant="filled" 
                  onClick={handleSaveStatus}
                  disabled={!selectedStatus || selectedStatus === rentToUpdate?.status}
                  fullWidth
                  color="success"
              >
                  Atualizar
              </Button>
          </Box>
      </Modal>

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
