import { NextRequest, NextResponse } from "next/server";

const BRAIN_API_URL = "https://mitienda.tech/brain/api.php";
const BRAIN_API_KEY = "brain_sk_V4l1n4_2026_s3cr3t";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "list";
  const id = searchParams.get("id") || "";

  let url = `${BRAIN_API_URL}?action=${action}&key=${BRAIN_API_KEY}`;
  if (id) url += `&id=${id}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();

    // Verificar que es JSON válido
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json(
        { error: "Respuesta no valida del servidor", raw: text.substring(0, 200) },
        { status: 502 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error de conexion" },
      { status: 502 }
    );
  }
}
