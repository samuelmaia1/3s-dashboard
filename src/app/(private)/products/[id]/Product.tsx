'use client';

import { Product } from "@/types/Product";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { useState } from "react";
import { ButtonContainer, Container, ImageInfoContainer } from "./style";
import { Text } from "@components/Text/Text";
import { formatToCurrency } from "@/formatter";
import { Button } from "@components/Button/Button";
import { Modal } from "@components/Modal/Modal";
import Image, { StaticImageData } from "next/image";
import FallbackImage from "@/assets/images/fallback-image.jpg";
import { ConfirmationModal } from "@components/ConfirmationModal/ConfirmationModal";
import { EditProductForm } from "./(components)/EditProductForm";
import axios from "axios";
import { ApiError } from "@/types/Error";
import { deleteProduct } from "@/services/product.service";
import { NotFound } from "@components/NotFound/NotFound";
import { useRouter } from "next/navigation";

interface ProductClientProps {
  product: Product | null;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    product?.imageUri || FallbackImage
  );

  const { showMessage } = useFlashMessage();
  const router = useRouter();

  if (!product) {
    return <NotFound title="Produto não encontrado." text={'Infelizmente, este produto não existe na base de dados.'}/>;
  }

  async function handleDeleteProduct() {
    try {
      if (!product?.id)
        return;

      await deleteProduct(product.id);
      showMessage("Produto excluido com sucesso!", "success");
      router.replace("/products");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
    }
  }

  return (
    <Container>
        <Modal onClose={() => setEditProductModalOpen(false)} open={editProductModalOpen} title="Editar Produto">
          <EditProductForm />
        </Modal>

        <ConfirmationModal 
            onClose={() => setDeleteProductModalOpen(false)} 
            open={deleteProductModalOpen} 
            title="Excluir Produto"
            onCancel={() => setDeleteProductModalOpen(false)}
            onConfirm={handleDeleteProduct}
        >
          <Text variant="body1">Confirma que deseja excluir este produto?</Text>
        </ConfirmationModal>

      <ButtonContainer>
        <Button onClick={() => setEditProductModalOpen(true)} color="info">Adicionar Estoque</Button>
        <Button icon="pencil-line" onClick={() => setEditProductModalOpen(true)}/>
        <Button color="error" icon="trash" onClick={() => setDeleteProductModalOpen(true)}/>
      </ButtonContainer>

      <ImageInfoContainer>
        <Image
            src={imageSrc}
            alt={product.name}
            width={300}
            height={300}
            onError={() => setImageSrc(FallbackImage)}
            style={{
                borderRadius: "12px",
                objectFit: "cover",
            }}
        />

        <Text variant="h6" weight="bold">{product.name}</Text>
        <Text variant="body1">Descrição: {product.description}</Text>
        <Text variant="body1">Preço unitário: {formatToCurrency(product.price)}</Text>
        <Text variant="body1">Estoque {product.stock}</Text>
      </ImageInfoContainer>

      
    </Container>
  );
}