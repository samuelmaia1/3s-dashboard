import { UpdateProductFormInput, UpdateProductFormOutput, updateProductSchema } from "@/types/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DataStep } from "../../(components)/DataStep";
import { MultiStepForm } from "@components/MultStepForm/MultStepForm";

export function EditProductForm() {
    const methods = useForm<UpdateProductFormInput, any, UpdateProductFormOutput>({
        resolver: zodResolver(updateProductSchema),
        mode: "onChange",
    })

    const steps = [DataStep];

    async function onSubmit(data: UpdateProductFormOutput) {
        
    }

    return (
        <MultiStepForm
            methods={methods}
            steps={steps}
            onSubmit={() => {}}
        />
    )
}