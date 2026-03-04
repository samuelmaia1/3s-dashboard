import { getProductById } from "@/services/product.service";
import { Product } from "@/types/Product";
import ProductClient from "./Product";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const {id} = await params;

  const product: Product | null = await getProductById(id)
    .catch(() => null);

  return <ProductClient product={product} />;
}