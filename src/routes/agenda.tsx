import { createFileRoute } from "@tanstack/react-router";
import { AGENDA, DISCIPLINAS } from "@/lib/cdcc-data";
import { useState } from "react";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda Cultural — CDCC Cochabamba" },
      { name: "description", content: "Calendario cultural del departamento de Cochabamba: teatro, música, danza, saberes ancestrales, literatura y más." },
      { property: "og:title", content: "Agenda Cultural — CDCC Cochabamba" },
      { property: "og:description", content: "Calendario cultural del departamento: encuentros, festivales y ferias del ecosistema cochala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgendaPage,
});

function AgendaPage() {
  const [filtro, setFiltro] = useState<string>("Todos");
  const cats = ["Todos", ...Array.from(new Set(AGENDA.map(a => a.cat)))];
  const items = filtro === "Todos" ? AGENDA : AGENDA.filter(a => a.cat === filtro);

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-cdcc py-16 md:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Ecosistema cochala</span>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-3 mb-5 max-w-3xl">Agenda Cultural</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Encuentros, festivales, ferias y muestras del sector cultural en las 16 provincias del departamento.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-cdcc">
          <div className="flex flex-wrap gap-2 mb-10">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ring-1 ${filtro === c ? "bg-chicha text-cream ring-chicha" : "bg-card text-ink ring-border hover:ring-chicha/40"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="divide-y divide-border/60 rounded-2xl bg-card ring-1 ring-black/5 overflow-hidden">
            {items.map(e => (
              <article key={e.titulo} className="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-6 md:p-7 hover:bg-secondary/50 transition-colors">
                <div className="text-center w-16 shrink-0">
                  <div className="font-display text-3xl font-semibold leading-none">{e.fecha.split(" ")[0]}</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">{e.fecha.split(" ")[1]}</div>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-chicha uppercase tracking-widest">{e.cat}</span>
                  <h3 className="font-display text-lg md:text-xl font-medium leading-snug mt-1">{e.titulo}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.lugar}</p>
                </div>
                <div className="hidden md:block text-[11px] uppercase tracking-widest text-muted-foreground">Ver detalle →</div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-display text-2xl font-medium mb-4">Disciplinas convocantes</h2>
            <div className="flex flex-wrap gap-2">
              {DISCIPLINAS.map(d => (
                <span key={d} className="px-3 py-1.5 rounded-full text-xs bg-secondary text-ink ring-1 ring-border">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
