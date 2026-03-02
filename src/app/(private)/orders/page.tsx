'use client';

import { Button } from "@components/Button/Button";
import { Container } from "./style";
import { Modal } from "@components/Modal/Modal";
import { useState } from "react";
import { RegisterForm } from "@/app/(public)/register/(components)/RegisterForm";

export default function Orders() {
    const [open, setOpen] = useState(false);

    return (
        <Container>
            <Modal onClose={() => setOpen(false)} open={open} title="Novo Pedido">
                <RegisterForm />
            </Modal>
            <Button color="success" icon="plus" onClick={() => setOpen(true)}/>
        </Container>
    );
}   