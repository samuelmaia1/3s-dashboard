'use client';

import { Modal } from "@components/Modal/Modal";
import { Container, TopContainer } from "./style";
import { Button } from "@components/Button/Button";
import { useState } from "react";
import { CreateProductForm } from "./(components)/CreateProductForm";

export default function Products() {
    const [open, setOpen] = useState(false);

    return (
        <Container>
            <Modal onClose={() => setOpen(false)} open={open} title="Novo Produto">
                <CreateProductForm closeModal={() => setOpen(false)} />
            </Modal>
            <TopContainer>
                <Button color="primary" onClick={() => setOpen(true)} icon="box">Novo Produto</Button>
            </TopContainer>
        </Container>
    );
}