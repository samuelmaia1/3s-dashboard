'use client';

import { Button } from "@components/Button/Button";
import { Container, TopContainer } from "./style";
import { useRouter } from "next/navigation";
import OrdersTable from "@components/OrdersTable/OrdersTable";
import { useEffect, useState } from "react";
import { Filters, Pageable } from "@/types/ApiTypes";
import { Order, OrderStatus } from "@/types/Order";
import { Page, PaginationContainer } from "./create/style";
import { Text } from "@components/Text/Text";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";
import { getOrders, updateStatus } from "@/services/order.service";
import { LoadingContainer } from "../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { Modal } from "@components/Modal/Modal";
import { Box } from "@mui/material";

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        page: 0,
        size: 10,
        sort: [{ field: "createdAt", direction: "desc" }],
    });
    
      const [page, setPage] = useState<Pageable>({
        number: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
      });
    
    const showPagination: boolean = page.totalPages > 1;

    const router = useRouter();
    const { showMessage } = useFlashMessage();

    async function fetchOrders() {
        setLoading(true);
        try {
            const response = await getOrders(filters);
            setOrders(response.content);
            setPage(response.page);
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao buscar pedidos: ${error.message}`, "error");
            } else {
                showMessage("Erro ao buscar pedidos", "error");
            }
        } finally {
            setLoading(false);
        }
    }

    function handleOpenStatusModal(order: Order) {
        setOrderToUpdate(order);
        setSelectedStatus(order.status);
        setIsModalOpen(true);
    }

    async function handleSaveStatus() {
        if (!selectedStatus || !orderToUpdate) return;

        setIsModalOpen(false);
        try {
            await updateStatus(orderToUpdate.id, selectedStatus);
            setOrders((prev) => {
                return prev.map((order) => {
                    if (order.id === orderToUpdate?.id) {
                        return { ...order, status: selectedStatus }; 
                    }
                    return order;
                });
            }) 

            showMessage("Status atualizado com sucesso!", "success");
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao atualizar status: ${error.message}`, "error");
            }

            showMessage("Erro ao atualizar status", "error");
        } finally {
            setOrderToUpdate(null);
            setSelectedStatus(null);
        }
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setOrderToUpdate(null);
        setSelectedStatus(null);
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchOrders();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [filters]);

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

    return (
        <Container>
            <TopContainer>
                <Button onClick={() => router.push('/orders/create')}>Novo Pedido</Button>
            </TopContainer>

            <OrdersTable orders={orders} onRequestStatusChange={handleOpenStatusModal}/>

            <Modal onClose={handleCloseModal} open={isModalOpen}>
                <Text variant="body1">Atualizar status do pedido</Text>
    
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px", marginBottom: "24px" }}>
                    {Object.entries(OrderStatus).map(([key, value]) => (
                        <Button
                            key={key}
                            variant={selectedStatus === value ? "filled" : "outline"} 
                            onClick={() => {
                                setSelectedStatus(value as OrderStatus); 
                            }}
                        >
                            {value}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <Button variant="outline" onClick={handleCloseModal} fullWidth>
                        Cancelar
                    </Button>
                    <Button 
                        variant="filled" 
                        onClick={handleSaveStatus}
                        disabled={!selectedStatus || selectedStatus === orderToUpdate?.status}
                        fullWidth
                    >
                        Confirmar
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