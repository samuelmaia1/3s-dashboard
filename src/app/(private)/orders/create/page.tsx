'use client';

import { getProducts } from "@/services/product.service";
import { Filters, Pageable } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { Product } from "@/types/Product";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { useEffect, useState } from "react";
import { PaginationContainer, TopContainer, SearchContainer, Page, ProductsGrid } from "./style";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { Text } from "@components/Text/Text";
import { LoadingContainer } from "../../style";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";
import { ProductCard } from "@components/ProductCard/ProductCard";
import CartSidebar from "@components/CartSidebar/CartSidebar";
import { Badge, Box } from "@mui/material";
import { Modal } from "@components/Modal/Modal";
import { formatToCurrency } from "@/formatter";
import { CartItem } from "@/types/Order";
import { CreateOrderForm } from "./CreateOrderForm";
import { useRouter } from "next/navigation";

export default function CreateOrder() {
    const [loading, setLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
    const [finishModalOpen, setFinishModalOpen] = useState(false);
    
    const [filters, setFilters] = useState<Filters>({
        page: 0,
        size: 12,
        sort: [{field: "name", direction: "asc"}],
        name: "",
    });

    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<Pageable>({
        number: 0,
        size: 12,
        totalElements: 0,
        totalPages: 0,
    });

    const { showMessage } = useFlashMessage();
    const router = useRouter();

    const showPagination: boolean = page.totalPages > 1;
    
    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await getProducts(filters);
            setProducts(response.content);
            setPage(response.page);
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao buscar produtos: ${error.message}`, "error");
            } else {
                showMessage("Erro ao buscar produtos", "error");
            }
        } finally {
            setLoading(false);
        }
    }

    function getVisiblePages(current: number, total: number, range = 2): number[] {
        const start = Math.max(0, current - range);
        const end = Math.min(total - 1, current + range);
        const pages: number[] = [];
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }

    function setCartItems(products: CartItem[]) {
        setCartProducts(products);
    }

    function handleCartUpdate(product: Product, quantity: number) {
        setCartProducts(prev => {
            const exists = prev.find(item => item.product.id === product.id);
            if (exists) {
                if (quantity === 0) {
                    return prev.filter(item => item.product.id !== product.id);
                } else {
                    return prev.map(item => 
                        item.product.id === product.id 
                        ? { ...item, quantity } 
                        : item
                    );
                }
            } else {
                return [...prev, { product, quantity }];
            }
        });
    }

    function onClickFinish() {
        setIsCartOpen(false);
        setFinishModalOpen(true);
    }

    function onSubmitSuccess() {
        setCartProducts([]);
        setFinishModalOpen(false);
        router.replace("/orders");
    }
    
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchProducts();
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [filters]);

    return (
        <Box>
            <CartSidebar 
                open={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cartItems={cartProducts}
                onSetCartItems={setCartItems}
                onFinish={onClickFinish}
            />

            <Modal open={finishModalOpen} onClose={() => setFinishModalOpen(false)}>
                <CreateOrderForm items={cartProducts} onSubmitSuccess={onSubmitSuccess}/>
            </Modal>

            <TopContainer>
                <SearchContainer>
                    <Input
                        endIcon="search"
                        placeholder="Pesquisar produto..."
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
                <Badge badgeContent={cartProducts.length} color="primary">
                    <Button 
                        color="primary" 
                        onClick={() => setIsCartOpen(true)} 
                        icon="shopping-cart" 
                        shape="square"
                        variant="text"
                    />
                </Badge>
            </TopContainer>

            <Text variant="body1" sx={{ marginBottom: 4 }}>
                Selecione os produtos do pedido
            </Text>

            {!loading && (
                <ProductsGrid>
                    {products.map((product) => (
                        <ProductCard key={product.id || product.name} product={product} onQuantityChange={handleCartUpdate} showQuantityControls/>
                    ))}
                </ProductsGrid>
            )}
        
            {showPagination && !loading && (
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
                            onClick={() => setFilters({ ...filters, page: pageIndex })}
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
            )}
        
            {loading && 
                <LoadingContainer heightToShow={'50vh'}>
                    <LoadingSpinner size={24} />
                </LoadingContainer>
            }
        </Box>
    );
}