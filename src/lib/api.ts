const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mitienda.tech/brain/api.php'

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

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}?action=${endpoint}`

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Enviar cookies de sesión
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    cache: 'no-store',
  })

  // Si recibimos 401, redirigir a login
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://mitienda.tech/brain/login.php'
    }
    throw new Error('No autorizado')
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchDocs(): Promise<DocMeta[]> {
  const data = await apiRequest<{ success: boolean; docs: DocMeta[] }>('list')
  if (!data.success) throw new Error('Error cargando documentos')
  return data.docs
}

export async function fetchDoc(id: string): Promise<DocFull> {
  const data = await apiRequest<{ success: boolean; doc: DocFull }>(`get&id=${id}`)
  if (!data.success) throw new Error('Error cargando documento')
  return data.doc
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://mitienda.tech/brain/logout.php'
  }
}
