'use client';

import { Modal } from "@components/Modal/Modal";
import { Container, Page, PaginationContainer, SearchContainer, TopContainer } from "./style";
import { useEffect, useState } from "react";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { CostumersTable } from "@components/CostumersTable/CostumersTable";
import { ApiError } from "@/types/Error";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { Pageable } from "@/types/ApiResponse";
import { Costumer } from "@/types/Costumer";
import { Text } from "@components/Text/Text";
import { LoadingContainer } from "../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { getCostumers } from "@/services/costumer.service";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Filters {
  page: number;
  size: number;
  sort: string;
  name?: string;
}

export default function Costumers() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        page: 0,
        size: 10,
        sort: "createdAt,desc",
        name: "",
    });

    const [costumers, setCostumers] = useState<Costumer[]>([]);
    const [page, setPage] = useState<Pageable>({
        number: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
    });

    const { showMessage } = useFlashMessage();

    const showPagination: boolean = page.totalPages > 1;

    async function fetchCostumers() {
        setLoading(true);
        try {
            const response = await getCostumers(filters);
            console.log(response);
            setCostumers(response.content);
            setPage(response.page);
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao criar produto: ${error.message}`, "error");
            }

            showMessage("Erro ao buscar produtos", "error");
        } finally {
            setLoading(false);
        }
    }
    
    function resetFilters() {
        setFilters({
            page: 0,
            size: 10,
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

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
          fetchCostumers();
        }, 500);
    
        return () => clearTimeout(delayDebounce);
      }, [filters]);

    useEffect(() => {
        const socket = new SockJS(
            `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/ws-costumers`,
        );
    
        const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            client.subscribe("/topic/costumers", (message: any) => {
                console.log(message.body);
                const newCostumer: Costumer = JSON.parse(message.body);
        
                setCostumers((prevCostumers) => {
                    return [newCostumer, ...prevCostumers];
                });
            });
        },
        onStompError: (frame: unknown) => {
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

    return (
        <Container>
            <Modal onClose={() => setOpen(false)} open={open} title="Novo Produto">
                <h1></h1>
            </Modal>
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
                />
            </SearchContainer>
            <Button color="primary" onClick={() => setOpen(true)} icon="plus" >Adicionar Cliente</Button>
            </TopContainer>
            {!loading && <CostumersTable costumers={costumers} />}
    
            {showPagination && !loading && 
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
    
            {loading && 
            <LoadingContainer heightToShow={'50vh'}>
                <LoadingSpinner size={24} />
            </LoadingContainer>
            }
        </Container>
    )
}