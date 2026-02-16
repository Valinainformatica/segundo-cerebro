"use client";

import type { DocMeta } from "@/lib/api";

const CATEGORY_ICONS: Record<string, string> = {
  proyecto: "📁",
  bug: "🐛",
  arquitectura: "🏗️",
  sesion: "💬",
  referencia: "📖",
  sistema: "⚙️",
  general: "📄",
};

const CATEGORY_COLORS: Record<string, string> = {
  proyecto: "bg-blue-500/15 text-blue-400",
  bug: "bg-red-500/15 text-red-400",
  arquitectura: "bg-purple-500/15 text-purple-400",
  sesion: "bg-green-500/15 text-green-400",
  referencia: "bg-amber-500/15 text-amber-400",
  sistema: "bg-zinc-500/15 text-zinc-400",
  general: "bg-zinc-500/15 text-zinc-400",
};

interface SidebarProps {
  docs: DocMeta[];
  categories: [string, number][];
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  totalCount: number;
}

export default function Sidebar({
  docs,
  categories,
  activeCategory,
  setActiveCategory,
  selectedId,
  onSelect,
  search,
  setSearch,
  loading,
  error,
  onRefresh,
  totalCount,
}: SidebarProps) {
  return (
    <aside className="w-80 border-r border-border flex flex-col bg-surface h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-sm font-semibold text-foreground tracking-tight">
              Segundo Cerebro
            </h1>
          </div>
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-md hover:bg-surface-hover transition-colors text-muted hover:text-foreground"
            title="Refrescar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
              <path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar documentos..."
            className="w-full bg-background border border-border rounded-md pl-8 pr-3 py-1.5 text-sm placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-3 py-2 border-b border-border-subtle flex gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
            !activeCategory
              ? "bg-accent/15 text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          Todos ({totalCount})
        </button>
        {categories.map(([cat, count]) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-accent/15 text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {CATEGORY_ICONS[cat] || "📄"} {cat} ({count})
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-border rounded w-3/4 mb-2" />
                <div className="h-3 bg-border-subtle rounded w-full mb-1" />
                <div className="h-3 bg-border-subtle rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-400 text-sm mb-2">{error}</p>
            <button onClick={onRefresh} className="text-xs text-accent hover:underline">
              Reintentar
            </button>
          </div>
        ) : docs.length === 0 ? (
          <div className="p-4 text-center text-muted text-sm">
            {search ? "Sin resultados" : "Sin documentos"}
          </div>
        ) : (
          <div className="py-1">
            {docs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => onSelect(doc.id)}
                className={`w-full text-left px-4 py-3 border-l-2 transition-all ${
                  selectedId === doc.id
                    ? "bg-accent/8 border-accent"
                    : "border-transparent hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`text-sm font-medium leading-tight ${
                    selectedId === doc.id ? "text-foreground" : "text-[#c4c4c4]"
                  }`}>
                    {doc.title}
                  </h3>
                </div>
                <p className="text-xs text-muted line-clamp-2 mb-1.5 leading-relaxed">
                  {doc.excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.general
                  }`}>
                    {doc.category}
                  </span>
                  {doc.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] text-muted">
                      #{tag}
                    </span>
                  ))}
                  <span className="text-[10px] text-muted ml-auto">
                    {formatDate(doc.updated)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border text-[10px] text-muted flex items-center justify-between">
        <span>Valina Informatica</span>
        <span>{docs.length} docs</span>
      </div>
    </aside>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "ahora";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
