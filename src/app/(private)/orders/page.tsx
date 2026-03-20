'use client';

import { Button } from "@components/Button/Button";
import { Container, TopContainer } from "./style";
import { useRouter } from "next/navigation";

export default function Orders() {
    const router = useRouter();

    return (
        <Container>
            <TopContainer>
                <Button onClick={() => router.push('/orders/create')}>Novo Pedido</Button>
            </TopContainer>
        </Container>
    );
}