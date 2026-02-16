"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchDocs, fetchDoc, type DocMeta, type DocFull } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import DocViewer from "@/components/DocViewer";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [docs, setDocs] = useState<DocMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeDoc, setActiveDoc] = useState<DocFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [docLoading, setDocLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDocs();
  }, []);

  async function loadDocs() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDocs();
      setDocs(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error cargando documentos");
    } finally {
      setLoading(false);
    }
  }

  async function selectDoc(id: string) {
    if (id === selectedId) return;
    setSelectedId(id);
    setDocLoading(true);
    try {
      const doc = await fetchDoc(id);
      setActiveDoc(doc);
    } catch {
      setActiveDoc(null);
    } finally {
      setDocLoading(false);
    }
  }

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    docs.forEach((d) => {
      cats.set(d.category, (cats.get(d.category) || 0) + 1);
    });
    return Array.from(cats.entries()).sort((a, b) => b[1] - a[1]);
  }, [docs]);

  const filteredDocs = useMemo(() => {
    let filtered = docs;
    if (activeCategory) {
      filtered = filtered.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.excerpt.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [docs, search, activeCategory]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        docs={filteredDocs}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedId={selectedId}
        onSelect={selectDoc}
        search={search}
        setSearch={setSearch}
        loading={loading}
        error={error}
        onRefresh={loadDocs}
        totalCount={docs.length}
      />

      <main className="flex-1 overflow-y-auto">
        {docLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-muted">Cargando documento...</div>
          </div>
        ) : activeDoc ? (
          <DocViewer doc={activeDoc} />
        ) : (
          <EmptyState hasDocuments={docs.length > 0} />
        )}
      </main>
    </div>
  );
}
