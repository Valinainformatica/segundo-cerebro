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
  const res = await fetch("/api/docs?action=list", { cache: "no-store" });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.docs;
}

export async function fetchDoc(id: string): Promise<DocFull> {
  const res = await fetch(`/api/docs?action=get&id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.doc;
}
