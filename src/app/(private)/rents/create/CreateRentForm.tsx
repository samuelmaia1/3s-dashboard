import { MultiStepForm } from "@components/MultStepForm/MultStepForm";
import { useForm } from "react-hook-form";
import { CartItem, CreateRent } from "@/types/Rent";
import { ConfirmationStep } from "./ConfirmationStep";
import { createRentSchema, CreateRentFormData } from "@/types/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerStep } from "./CustomerStep";
import { createRent } from "@/services/rent.service";
import { parseToLocalDateTime } from "@/formatter";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";
import { AddressStep } from "./AddressStep";

interface CreateRentFormProps {
  items: CartItem[];
  onSubmitSuccess: () => void;
}

export function CreateRentForm({ items, onSubmitSuccess }: CreateRentFormProps) {
  const { showMessage } = useFlashMessage();

  const methods = useForm<CreateRentFormData>({
    resolver: zodResolver(createRentSchema),
    defaultValues: {
      products: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      costumerId: "",
      deliveryType: "delivery",
      deliveryTax: 0,
    },
  });

  const steps = [ConfirmationStep, CustomerStep, AddressStep];

  async function onSubmit(data: CreateRentFormData) {
    try {
      const payload: CreateRent = {
        items: data.products.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
        })),
        costumerId: data.costumerId,
        deliveryDate: parseToLocalDateTime(data.deliveryDate),
        returnDate: parseToLocalDateTime(data.returnDate),
        deliveryAddress: data.deliveryType === "delivery" ? data.address : undefined,
        deliveryTax: data.deliveryType === "delivery" ? (data.deliveryTax ?? 0) : 0,
      };

      await createRent(payload);

      showMessage("Aluguel criado com sucesso!", "success");
      onSubmitSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        showMessage("Erro ao criar aluguel: " + error.message, "error");
      } else {
        showMessage("Erro ao criar aluguel", "error");
      }
    }
  }

  return (
    <MultiStepForm methods={methods} steps={steps} onSubmit={onSubmit} stepProps={{ items }} />
  );
}
