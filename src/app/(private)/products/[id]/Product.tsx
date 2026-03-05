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
import { set } from "zod";

interface ProductClientProps {
  product: Product | null;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(product);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    currentProduct?.imageUri || FallbackImage
  );

  const { showMessage } = useFlashMessage();
  const router = useRouter();

  if (!currentProduct) {
    return <NotFound title="Produto não encontrado." text={'Infelizmente, este produto não existe na base de dados.'}/>;
  }

  async function handleDeleteProduct() {
    try {
      if (!currentProduct?.id)
        return;

      await deleteProduct(currentProduct.id);
      showMessage("Produto excluido com sucesso!", "success");
      router.replace("/products");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
    }
  }

  function handleUpdateProduct(updatedProduct: Product) {
    setCurrentProduct(updatedProduct);
    showMessage("Produto atualizado com sucesso!", "success");
    setEditProductModalOpen(false);
  }

  return (
    <Container>
        <Modal onClose={() => setEditProductModalOpen(false)} open={editProductModalOpen} title="Editar Produto">
          <EditProductForm id={currentProduct.id} onUpdated={handleUpdateProduct}/>
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
        <Button icon="pencil-line" onClick={() => setEditProductModalOpen(true)}/>
        <Button color="error" icon="trash" onClick={() => setDeleteProductModalOpen(true)}/>
      </ButtonContainer>

      <ImageInfoContainer>
        <Image
            src={imageSrc}
            alt={currentProduct.name}
            width={250}
            height={250}
            onError={() => setImageSrc(FallbackImage)}
            style={{
                borderRadius: "12px",
                objectFit: "cover",
            }}
        />

        <Text variant="h6" weight="bold">{currentProduct.name}</Text>
        <Text variant="body1">
          Descrição: <Text color="text.secondary" component='span'>{currentProduct.description}</Text>
        </Text>
        <Text variant="body1">
          Preço unitário: <Text color="text.secondary" component='span'>{formatToCurrency(currentProduct.price)}</Text>
        </Text>
        <Text variant="body1">
          Estoque: <Text color="text.secondary" component='span'>{currentProduct.stock}</Text>
        </Text>
      </ImageInfoContainer>

      
    </Container>
  );
}