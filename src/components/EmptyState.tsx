interface EmptyStateProps {
  hasDocuments: boolean;
}

export default function EmptyState({ hasDocuments }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>

        {hasDocuments ? (
          <>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Selecciona un documento
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Elige un documento de la barra lateral para ver su contenido.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Segundo Cerebro
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Tu base de conocimiento esta vacia. Los documentos apareceran aqui
              cuando Claude Code guarde progresos de las sesiones de trabajo.
            </p>
            <div className="text-xs text-muted bg-surface border border-border rounded-lg p-4 text-left font-[family-name:var(--font-mono)]">
              <p className="text-accent mb-1"># Formato de documento</p>
              <p>---</p>
              <p>title: Mi documento</p>
              <p>tags: [tag1, tag2]</p>
              <p>category: proyecto</p>
              <p>---</p>
              <p className="mt-1">Contenido en Markdown...</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
