import { createFileRoute, Link } from "@tanstack/react-router";
import aguayoHero from "@/assets/aguayo-hero.jpg";
import mapaProvincias from "@/assets/mapa-provincias.jpg";
import logoCdcc from "@/assets/logo_cdcc.jpg.asset.json";
import { MESAS, AGENDA, PROVINCIAS, RUTA_MANDATO } from "@/lib/cdcc-data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 weaving-pattern" aria-hidden />
        <div className="container-cdcc relative py-20 md:py-32">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha mb-6">
                Portal Cívico-Cultural Plurinacional
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight text-balance mb-8">
                El tejido vivo de las culturas de Cochabamba.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[52ch] text-pretty mb-10">
                Gestionamos la política pública cultural desde el territorio, articulando las voces de nuestras 16 provincias
                para fortalecer la identidad plurinacional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/registro" className="bg-chicha text-cream px-6 py-3.5 rounded-full text-sm font-medium ring-2 ring-chicha/20 hover:bg-chicha-deep transition-colors">
                  Regístrate como Artista
                </Link>
                <Link to="/mesas" className="bg-card text-ink px-6 py-3.5 rounded-full text-sm font-medium ring-1 ring-black/10 hover:bg-secondary transition-colors">
                  Únete a una Mesa
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-2xl shadow-chicha/10">
                <img src={aguayoHero} alt="Patrón aguayo digital, identidad visual del CDCC Cochabamba" className="w-full h-full object-cover" width={1024} height={1280} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indicators */}
      <section className="bg-ink py-14">
        <div className="container-cdcc">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "1,420", l: "Artistas Registrados" },
              { n: "05", l: "Mesas Activas" },
              { n: "12", l: "Convocatorias Abiertas" },
              { n: "16", l: "Provincias Vinculadas" },
            ].map(i => (
              <div key={i.l} className="border-l border-cream/10 pl-6">
                <span className="block font-display text-4xl font-light text-cream">{i.n}</span>
                <span className="text-[11px] uppercase tracking-widest text-cream/50 font-medium">{i.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-24">
        <div className="container-cdcc">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-2">Agenda Cultural</h2>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Próximos encuentros del ecosistema cochala</p>
            </div>
            <Link to="/agenda" className="text-chicha font-medium text-sm border-b border-chicha/30 pb-1 hover:border-chicha">Ver calendario completo</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {AGENDA.slice(0, 3).map(e => (
              <article key={e.titulo} className="group">
                <div className="aspect-[3/2] rounded-xl weaving-pattern bg-secondary ring-1 ring-black/5 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl text-chicha/20 font-medium">{e.fecha.split(" ")[0]}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center shrink-0">
                    <span className="block text-2xl font-display font-semibold leading-none">{e.fecha.split(" ")[0]}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{e.fecha.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-chicha uppercase tracking-wider mb-1 block">{e.cat}</span>
                    <h3 className="font-display text-lg font-medium mb-1 leading-tight">{e.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{e.lugar}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mesas */}
      <section className="py-24 bg-secondary/60">
        <div className="container-cdcc">
          <div className="mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Cogobernanza</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2">Las 5 Mesas de Trabajo</h2>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden ring-1 ring-border">
            {MESAS.map(m => (
              <Link
                to="/mesas/$slug"
                params={{ slug: m.slug }}
                key={m.slug}
                className="bg-cream p-7 group hover:bg-chicha transition-colors flex flex-col"
              >
                <span className="font-display text-5xl font-light text-border mb-10 block group-hover:text-cream/30 transition-colors">
                  {m.num}
                </span>
                <h4 className="font-display text-lg font-medium mb-4 group-hover:text-cream leading-snug">{m.corto}</h4>
                <div className="mt-auto pt-6">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-cream/60 mb-1">Próxima sesión</div>
                  <p className="text-sm text-ink group-hover:text-cream/90">{m.proximaSesion}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ruta del Mandato */}
      <section className="py-24">
        <div className="container-cdcc">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">La flecha del mandato</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2">Ruta desde las Jornadas 2026</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {RUTA_MANDATO.map((h, i) => (
                <div key={h.hito} className={`relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-10 items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                  <div className={`md:text-right ${i % 2 === 0 ? "" : "md:text-left md:col-start-2"}`}>
                    <div className="flex md:justify-end items-center gap-3 mb-1">
                      <span className={`text-[11px] uppercase tracking-widest font-semibold ${h.estado === "actual" ? "text-chicha" : "text-muted-foreground"}`}>{h.mes}</span>
                      {h.estado === "actual" && <span className="inline-block h-1.5 w-1.5 rounded-full bg-chicha animate-pulse" />}
                    </div>
                    <h5 className={`font-display text-lg font-medium ${h.estado === "futuro" ? "text-muted-foreground" : ""}`}>{h.hito}</h5>
                  </div>
                  <div className={`absolute left-4 md:left-1/2 top-2 -translate-x-1/2 size-3 rounded-full border-4 border-background ${h.estado === "actual" ? "bg-chicha" : h.estado === "hecho" ? "bg-ink" : "bg-border"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Provincias / Mapa */}
      <section className="py-24 border-t border-border/60">
        <div className="container-cdcc grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Territorio</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2 mb-8">16 Provincias, una identidad.</h2>
            <div className="max-h-[420px] overflow-y-auto pr-3 space-y-1">
              {PROVINCIAS.map(p => (
                <div key={p.nombre} className="flex justify-between py-2.5 border-b border-border/60 hover:text-chicha transition-colors">
                  <span className="text-sm font-medium">{p.nombre}</span>
                  <span className="text-xs text-muted-foreground">{p.region}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="aspect-[16/12] rounded-xl overflow-hidden ring-1 ring-black/5 bg-cream-2">
              <img src={mapaProvincias} alt="Mapa de las 16 provincias de Cochabamba" className="w-full h-full object-cover" loading="lazy" width={1280} height={960} />
            </div>
          </div>
        </div>
      </section>

      {/* Observatorio CTA */}
      <section className="py-20">
        <div className="container-cdcc">
          <div className="rounded-2xl bg-ink text-cream p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="weaving-pattern absolute inset-0" aria-hidden />
            <div className="relative">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ocre">Observatorio Cultural</span>
              <h3 className="font-display text-3xl md:text-4xl font-medium mt-2">Datos abiertos del sector cochala</h3>
            </div>
            <div className="relative">
              <p className="text-cream/70 mb-6">Consulta indicadores de artistas por disciplina, distribución territorial, presupuesto ejecutado y participación ciudadana en las mesas.</p>
              <Link to="/observatorio" className="inline-flex bg-ocre text-ink px-6 py-3 rounded-full text-sm font-semibold hover:bg-ocre/90 transition-colors">Explorar el Observatorio</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
