"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { DocFull } from "@/lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  proyecto: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  bug: "bg-red-500/15 text-red-400 border-red-500/20",
  arquitectura: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  sesion: "bg-green-500/15 text-green-400 border-green-500/20",
  referencia: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  sistema: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
  general: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
};

interface DocViewerProps {
  doc: DocFull;
}

export default function DocViewer({ doc }: DocViewerProps) {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${
            CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.general
          }`}>
            {doc.category}
          </span>
          <span className="text-xs text-muted">
            {new Date(doc.updated).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-3">
          {doc.title}
        </h1>

        {doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {doc.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="h-px bg-border mb-8" />

      {/* Content */}
      <article className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {doc.content}
        </ReactMarkdown>
      </article>

      {/* Footer meta */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Creado: {doc.created}</span>
          <span>{doc.filename} ({formatBytes(0)})</span>
        </div>
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "—";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
