const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export interface DocMeta {
  id: string;
  filename: string;
  title: string;
  tags: string[];
  category: string;
  created: string;
  updated: string;
  size: number;
  excerpt: string;
}

export interface DocFull extends DocMeta {
  content: string;
  raw: string;
}

export async function fetchDocs(): Promise<DocMeta[]> {
  const res = await fetch(`${API_URL}?action=list&key=${API_KEY}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.docs;
}

export async function fetchDoc(id: string): Promise<DocFull> {
  const res = await fetch(`${API_URL}?action=get&id=${id}&key=${API_KEY}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.doc;
}
