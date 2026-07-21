import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/normativa")({
  head: () => ({
    meta: [
      { title: "Normativa e Incidencia — CDCC Cochabamba" },
      { name: "description", content: "Marco legal del sector cultural boliviano: leyes, decretos, reglamentos y resoluciones que sustentan el trabajo del CDCC." },
      { property: "og:title", content: "Normativa e Incidencia — CDCC Cochabamba" },
      { property: "og:description", content: "Marco legal del sector cultural: leyes, decretos y reglamentos vigentes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NormativaPage,
});

const NORMAS = [
  {
    grupo: "Marco Constitucional",
    items: [
      { titulo: "Constitución Política del Estado", ref: "CPE — Arts. 98–102", desc: "Diversidad cultural como base esencial del Estado Plurinacional; derechos culturales, patrimonio y participación." },
      { titulo: "Ley Marco de Autonomías y Descentralización", ref: "Ley N° 031 · Andrés Ibáñez", desc: "Competencias culturales concurrentes entre nivel central, gobernación y municipios." },
    ],
  },
  {
    grupo: "Ley Sectorial",
    items: [
      { titulo: "Ley Nacional de Culturas y del Patrimonio Cultural", ref: "Ley N° 1220 (2019)", desc: "Régimen boliviano de culturas: derechos, fomento, patrimonio y economías creativas." },
      { titulo: "Reglamento del Registro Plurinacional de Artistas (RPA)", ref: "D.S. Reglamentario", desc: "Procedimiento de pre-acreditación, categorías, derechos y arancel cero." },
    ],
  },
  {
    grupo: "Instrumentos Departamentales",
    items: [
      { titulo: "Estatuto Autonómico Departamental de Cochabamba", ref: "Estatuto Autonómico", desc: "Régimen competencial cultural del departamento y provincias." },
      { titulo: "Ley Departamental de Culturas de Cochabamba", ref: "En construcción participativa", desc: "Instrumento resultante del proceso de las 5 Mesas de Trabajo del CDCC." },
      { titulo: "Reglamento de las Mesas de Trabajo del CDCC", ref: "Resolución CDCC 2026", desc: "Cogobernanza, quórum, incidencia y aprobación de propuestas por consenso intercultural." },
    ],
  },
  {
    grupo: "Instrumentos Internacionales",
    items: [
      { titulo: "Convención UNESCO Diversidad Cultural", ref: "UNESCO 2005", desc: "Protección y promoción de la diversidad de expresiones culturales." },
      { titulo: "Declaración ONU Derechos de los Pueblos Indígenas", ref: "DNUDPI 2007", desc: "Autodeterminación cultural de pueblos indígena originario campesinos." },
    ],
  },
] as const;

function NormativaPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-cdcc py-16 md:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Marco jurídico</span>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-3 mb-5 max-w-3xl">Normativa e Incidencia</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Cuerpo legal que sustenta el ejercicio pleno de los derechos culturales en el departamento de
            Cochabamba y el Estado Plurinacional de Bolivia.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-2 text-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Contenido</div>
              {NORMAS.map(n => (
                <a key={n.grupo} href={`#${n.grupo.toLowerCase().replace(/\s+/g, "-")}`} className="block py-1.5 border-l-2 border-border pl-3 hover:border-chicha hover:text-chicha transition-colors">
                  {n.grupo}
                </a>
              ))}
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-14">
            {NORMAS.map(n => (
              <section key={n.grupo} id={n.grupo.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6 pb-3 border-b border-border">{n.grupo}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {n.items.map(i => (
                    <article key={i.titulo} className="rounded-xl bg-card ring-1 ring-black/5 p-6">
                      <div className="text-[10px] uppercase tracking-widest text-chicha font-bold mb-2">{i.ref}</div>
                      <h3 className="font-display text-lg font-medium leading-snug mb-2">{i.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{i.desc}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
