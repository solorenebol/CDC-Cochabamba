import { createFileRoute } from "@tanstack/react-router";
import { DISCIPLINAS, PROVINCIAS } from "@/lib/cdcc-data";

export const Route = createFileRoute("/observatorio")({
  head: () => ({
    meta: [
      { title: "Observatorio Cultural — CDCC Cochabamba" },
      { name: "description", content: "Datos abiertos del sector cultural cochala: artistas por disciplina, distribución territorial, presupuesto ejecutado y participación en las mesas." },
      { property: "og:title", content: "Observatorio Cultural — CDCC Cochabamba" },
      { property: "og:description", content: "Datos abiertos del sector cultural cochabambino." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ObservatorioPage,
});

const INDICADORES = [
  { n: "1,420", l: "Artistas registrados", trend: "+18% año" },
  { n: "342", l: "Colectivos y gestores", trend: "+9% año" },
  { n: "Bs 4.2M", l: "Fondos ejecutados 2026", trend: "78% avance" },
  { n: "16/16", l: "Provincias vinculadas", trend: "cobertura total" },
];

const POR_DISCIPLINA = [
  { d: "Música", n: 312, pct: 0.22 },
  { d: "Artes Escénicas", n: 268, pct: 0.19 },
  { d: "Artes Visuales", n: 214, pct: 0.15 },
  { d: "Danza", n: 178, pct: 0.125 },
  { d: "Audiovisual y Cine", n: 142, pct: 0.10 },
  { d: "Saberes Ancestrales", n: 121, pct: 0.085 },
  { d: "Literatura", n: 98, pct: 0.069 },
  { d: "Artesanía", n: 87, pct: 0.061 },
] as const;

function ObservatorioPage() {
  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="weaving-pattern absolute inset-0" aria-hidden />
        <div className="container-cdcc py-16 md:py-24 relative">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ocre">Datos abiertos</span>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-3 mb-5 max-w-3xl">Observatorio Cultural</h1>
          <p className="text-lg text-cream/70 max-w-2xl">
            Indicadores del ecosistema cochala: participación, distribución territorial, presupuesto y ejecución de la
            política cultural departamental.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden ring-1 ring-border">
            {INDICADORES.map(i => (
              <div key={i.l} className="bg-card p-7">
                <span className="block font-display text-4xl font-medium text-ink">{i.n}</span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mt-1 block">{i.l}</span>
                <span className="text-xs text-chicha mt-3 block">{i.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/60 border-y border-border/60">
        <div className="container-cdcc grid gap-14 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Distribución</span>
            <h2 className="font-display text-3xl font-medium mt-2 mb-8">Artistas por disciplina</h2>
            <div className="space-y-4">
              {POR_DISCIPLINA.map(p => (
                <div key={p.d}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{p.d}</span>
                    <span className="text-muted-foreground tabular-nums">{p.n}</span>
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full bg-chicha rounded-full" style={{ width: `${p.pct * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Territorio</span>
            <h2 className="font-display text-3xl font-medium mt-2 mb-8">Cobertura provincial</h2>
            <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden ring-1 ring-border">
              {PROVINCIAS.map(p => (
                <div key={p.nombre} className="bg-card p-4">
                  <div className="font-medium text-sm">{p.nombre}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{p.region}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc">
          <div className="rounded-2xl bg-card ring-1 ring-black/5 p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Soberanía digital</span>
              <h3 className="font-display text-2xl md:text-3xl font-medium mt-2">Descarga los datos abiertos</h3>
              <p className="text-muted-foreground mt-3">Todos los indicadores del CDCC están disponibles en formatos abiertos (CSV, JSON) bajo licencia Creative Commons BY 4.0.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="bg-chicha text-cream px-5 py-3 rounded-full text-sm font-medium hover:bg-chicha-deep transition-colors">Descargar CSV</button>
              <button className="bg-card text-ink px-5 py-3 rounded-full text-sm font-medium ring-1 ring-border hover:bg-secondary transition-colors">API pública (JSON)</button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {DISCIPLINAS.map(d => (
              <span key={d} className="px-3 py-1.5 rounded-full text-xs bg-secondary text-ink ring-1 ring-border">{d}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
