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
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
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

export async function calculateDeliveryTax(originCode: string, destinationCode: string) {
 const OpenRoutesServiceKey = process.env.NEXT_PUBLIC_OPEN_ROUTE_API_KEY

  try {
    const originGeo = await api.get("https://api.openrouteservice.org/geocode/search", {
      params: {
        api_key: OpenRoutesServiceKey,
        text: originCode,
        size: 1,
      },
    });

    const originCoords = originGeo.data.features[0].geometry.coordinates; 

    const destGeo = await api.get("https://api.openrouteservice.org/geocode/search", {
      params: {
        api_key: OpenRoutesServiceKey,
        text: destinationCode,
        size: 1,
      },
    });
    const destCoords = destGeo.data.features[0].geometry.coordinates;

    const route = await api.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [originCoords, destCoords],
      },
      {
        headers: {
          Authorization: OpenRoutesServiceKey,
          "Content-Type": "application/json",
        },
      }
    );

    const distanceMeters = route.data.routes[0].summary.distance;
    const distanceKm = distanceMeters / 1000;

    const deliveryTax = distanceKm * 6;

    return {
      distanceKm: distanceKm.toFixed(2),
      deliveryTax: deliveryTax.toFixed(2),
    };
  } catch (error) {
    console.error("Erro ao calcular frete:", error);
    throw new Error("Não foi possível calcular o frete");
  }
}