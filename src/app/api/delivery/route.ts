import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function getAddressFromCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, '');
  const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
  
  if (response.data.erro) {
    throw new Error(`CEP ${cep} não encontrado no ViaCEP.`);
  }
  
  const { logradouro, bairro, localidade, uf } = response.data;
  return `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brasil`;
}

export async function POST(req: NextRequest) {
  try {
    const { originCep, destinationCep } = await req.json();
    const OpenRouteApiKey = process.env.OPEN_ROUTE_API_KEY;

    if (!originCep || !destinationCep) {
      return NextResponse.json({ error: "É necessário fornecer originCep e destinationCep" }, { status: 400 });
    }

    const originAddress = await getAddressFromCep(originCep);
    const destAddress = await getAddressFromCep(destinationCep);

    const normalizedOriginCep = String(originCep).replace(/\D/g, "");
    const normalizedDestinationCep = String(destinationCep).replace(/\D/g, "");

    if (normalizedOriginCep === normalizedDestinationCep) {
      return NextResponse.json({
        distanceKm: "0.00",
        deliveryTax: "0.00",
      });
    }

    const axiosConfig = {
      headers: { Authorization: OpenRouteApiKey, "Content-Type": "application/json" }
    };

    const [originGeo, destGeo] = await Promise.all([
      axios.get(`https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(originAddress)}&size=1`, axiosConfig),
      axios.get(`https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(destAddress)}&size=1`, axiosConfig),
    ]);

    if (!originGeo.data.features.length || !destGeo.data.features.length) {
      return NextResponse.json({ error: "Endereço não localizado no mapa para cálculo de rota." }, { status: 404 });
    }

    const originCoords = originGeo.data.features[0].geometry.coordinates;
    const destCoords = destGeo.data.features[0].geometry.coordinates;

    const route = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      { coordinates: [originCoords, destCoords] },
      axiosConfig
    );

    const distanceMeters = route.data?.routes?.[0]?.summary?.distance;

    if (typeof distanceMeters !== "number" || Number.isNaN(distanceMeters)) {
      return NextResponse.json(
        { error: "Não foi possível calcular a distância da rota." },
        { status: 502 }
      );
    }

    const distanceKm = distanceMeters / 1000;
    const deliveryTax = distanceKm * 6;

    return NextResponse.json({
      distanceKm: distanceKm.toFixed(2),
      deliveryTax: deliveryTax.toFixed(2),
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : undefined;
    if (errorMessage && errorMessage.includes("ViaCEP")) {
      return NextResponse.json({ error: "Um dos CEPs fornecidos é inválido." }, { status: 400 });
    }

    return NextResponse.json({ error: "Não foi possível calcular o frete. Tente novamente." }, { status: 500 });
  }
}
