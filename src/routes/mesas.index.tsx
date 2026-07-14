import { createFileRoute, Link } from "@tanstack/react-router";
import { MESAS } from "@/lib/cdcc-data";

export const Route = createFileRoute("/mesas/")({
  head: () => ({
    meta: [
      { title: "Mesas de Trabajo — CDCC Cochabamba" },
      { name: "description", content: "Las 5 mesas estratégicas del CDCC: derechos culturales, patrimonios, industrias creativas, formación y gobernanza territorial." },
      { property: "og:title", content: "Mesas de Trabajo del CDCC" },
      { property: "og:description", content: "Cogobernanza cultural plurinacional en las 16 provincias de Cochabamba." },
    ],
  }),
  component: MesasIndex,
});

function MesasIndex() {
  return (
    <>
      <section className="border-b border-border/60 py-20">
        <div className="container-cdcc max-w-4xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Cogobernanza · El corazón del CDCC</span>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-4 mb-6 text-balance">
            Las 5 Mesas de Trabajo del CDCC
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Cada mesa es un espacio abierto de deliberación, con actas públicas y buzón ciudadano. Participa, propone y descarga los acuerdos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc grid gap-px bg-border rounded-xl overflow-hidden ring-1 ring-border md:grid-cols-2">
          {MESAS.map(m => (
            <Link
              key={m.slug}
              to="/mesas/$slug"
              params={{ slug: m.slug }}
              className="bg-cream p-8 md:p-10 hover:bg-chicha group transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-6xl font-light text-border group-hover:text-cream/25 transition-colors">{m.num}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-cream/70 font-semibold text-right">
                  Próx. sesión<br />
                  <span className="text-ink group-hover:text-cream">{m.proximaSesion}</span>
                </span>
              </div>
              <h2 className="font-display text-2xl font-medium mb-4 group-hover:text-cream leading-snug">{m.titulo}</h2>
              <p className="text-sm text-muted-foreground group-hover:text-cream/80 leading-relaxed">{m.descripcion}</p>
              <span className="mt-8 text-sm font-medium text-chicha group-hover:text-cream border-t border-border group-hover:border-cream/20 pt-4">
                Ver mesa, actas y foro →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
