import { CostumerClient } from "./Costumer";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CostumerPage({ params }: PageProps) {
  const { id } = await params;

  return <CostumerClient id={id} />;
}
