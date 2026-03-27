import { MultiStepForm } from "@components/MultStepForm/MultStepForm";
import { useForm } from "react-hook-form";
import { AddressStep } from "./AddressStep";
import { CartItem, CreateOrder } from "@/types/Order";
import { ConfirmationStep } from "./ConfirmationStep";
import { creasteOrderSchema, CreateOrderFormData } from "@/types/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerStep } from "./CustomerStep";
import { createOrder } from "@/services/order.service";
import { parseToLocalDateTime } from "@/formatter";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";
import { on } from "events";

interface CreateOrderFormProps {
    items: CartItem[];
    onSubmitSuccess: () => void
}

export function CreateOrderForm({ items, onSubmitSuccess }: CreateOrderFormProps) {
    const { showMessage } = useFlashMessage();

    const methods = useForm<CreateOrderFormData>({
        resolver: zodResolver(creasteOrderSchema),
        defaultValues: {
            products: items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            })),
            costumerId: "",
        }
    });

    const steps = [ConfirmationStep , CustomerStep , AddressStep];

    async function onSubmit(data: CreateOrderFormData) {
        try {
            const payload: CreateOrder = {
                ...data,
                items: data.products.map(item => ({
                    productId: item.productId,
                    quantity: Number(item.quantity)
                })),
                costumerId: data.costumerId,
                deliveryDate: data.deliveryDate ? parseToLocalDateTime(data.deliveryDate) : undefined,
                deliveryAddress: data.address
            }

            await createOrder(payload);

            showMessage("Pedido criado com sucesso!", "success");

            onSubmitSuccess();
        } catch (error) {
            if (error instanceof ApiError)
                showMessage("Erro ao criar pedido: " + error.message, "error");
            else    
                showMessage("Erro ao criar pedido", "error");
        }
    }

    return <MultiStepForm methods={methods} steps={steps} onSubmit={onSubmit} stepProps={{items}}/>
}