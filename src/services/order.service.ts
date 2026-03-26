import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { EntityPageable, Filters } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { CreateOrder, Order, OrderStatus } from "@/types/Order";
import axios from "axios";

export async function createOrder(data: CreateOrder) {
    try {
        const response = await api.post(routes.users.orders, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

export async function getOrders(params?: Filters): Promise<EntityPageable<Order>> {
    try {
        const response = await api.get(routes.users.orders, {params});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response?.data) {
            console.log(error.response.data);
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

export async function updateStatus(orderId: string, status: OrderStatus) {
    const actionKey = Object.keys(OrderStatus).find(
        (key) => OrderStatus[key as keyof typeof OrderStatus] === status
    );

    try {
        const response = await api.put(`${routes.orders.updateStatus}/${orderId}`, { action: actionKey });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

export function agroupOrderByStatus(orders: Order[]) {
    const canceledOrders: Order[] = [];
    const pendingOrders: Order[] = [];
    const finishedOrders: Order[] = [];

    for (const order of orders) {
        switch (order.status) {
            case OrderStatus.CANCELADO:
                canceledOrders.push(order);
                break;
            
            case OrderStatus.CONCLUIDO:
                finishedOrders.push(order);
                break;

            default:
                pendingOrders.push(order);
                break;
        }
    }
    return {
        canceledOrders,
        pendingOrders,
        finishedOrders
    };
}