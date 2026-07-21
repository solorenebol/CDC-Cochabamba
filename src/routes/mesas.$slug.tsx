import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MESAS } from "@/lib/cdcc-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/mesas/$slug")({
  head: ({ params }) => {
    const m = MESAS.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: m ? `${m.corto} — Mesa ${m.num} · CDCC` : "Mesa no encontrada" },
        { name: "description", content: m?.descripcion ?? "Mesa de trabajo del CDCC Cochabamba" },
      ],
    };
  },
  loader: ({ params }) => {
    const mesa = MESAS.find(m => m.slug === params.slug);
    if (!mesa) throw notFound();
    return { mesa };
  },
  component: MesaDetail,
});

type Propuesta = { id: string; autor: string; provincia: string | null; contenido: string; created_at: string };

function MesaDetail() {
  const { mesa } = Route.useLoaderData();
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [form, setForm] = useState({ autor: "", provincia: "", contenido: "" });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("propuestas_mesa")
      .select("id, autor, provincia, contenido, created_at")
      .eq("mesa_slug", mesa.slug)
      .eq("aprobada", true)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => setPropuestas((data as Propuesta[]) ?? []));
  }, [mesa.slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.autor.trim() || form.contenido.trim().length < 10) {
      setOk("Escribe tu nombre y una propuesta de al menos 10 caracteres.");
      return;
    }
    setSending(true);
    const { data, error } = await supabase.from("propuestas_mesa").insert({
      mesa_slug: mesa.slug,
      autor: form.autor.trim().slice(0, 80),
      provincia: form.provincia.trim().slice(0, 60) || null,
      contenido: form.contenido.trim().slice(0, 1000),
    }).select().single();
    setSending(false);
    if (error) { setOk("No pudimos enviar tu propuesta. Intenta de nuevo."); return; }
    setOk("¡Gracias! Tu propuesta fue registrada.");
    setForm({ autor: "", provincia: "", contenido: "" });
    if (data) setPropuestas(p => [data as Propuesta, ...p]);
  }

  return (
    <>
      <section className="border-b border-border/60 py-20">
        <div className="container-cdcc max-w-4xl">
          <Link to="/mesas" className="text-sm text-muted-foreground hover:text-chicha mb-6 inline-block">← Todas las mesas</Link>
          <div className="flex items-baseline gap-6 mb-6">
            <span className="font-display text-7xl font-light text-chicha/30">{mesa.num}</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-chicha font-semibold">Mesa {mesa.num}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-6 text-balance">{mesa.titulo}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{mesa.descripcion}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-medium mb-4">Ejes temáticos</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {mesa.ejes.map((e: string) => (
                  <li key={e} className="bg-secondary rounded-lg p-4 text-sm">{e}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
                <h2 className="font-display text-2xl font-medium">Buzón de propuestas ciudadanas</h2>
                <span className="text-xs text-muted-foreground">{propuestas.length} propuestas</span>
              </div>

              <form onSubmit={submit} className="bg-card ring-1 ring-border rounded-xl p-6 space-y-4 mb-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required maxLength={80}
                    value={form.autor}
                    onChange={e => setForm(f => ({ ...f, autor: e.target.value }))}
                    placeholder="Tu nombre o colectivo *"
                    className="w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-chicha/40"
                  />
                  <input
                    maxLength={60}
                    value={form.provincia}
                    onChange={e => setForm(f => ({ ...f, provincia: e.target.value }))}
                    placeholder="Provincia (opcional)"
                    className="w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-chicha/40"
                  />
                </div>
                <textarea
                  required maxLength={1000} rows={4}
                  value={form.contenido}
                  onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))}
                  placeholder="Comparte tu propuesta para esta mesa…"
                  className="w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-chicha/40"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">{form.contenido.length}/1000 caracteres</span>
                  <button type="submit" disabled={sending} className="bg-chicha text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-chicha-deep disabled:opacity-50">
                    {sending ? "Enviando…" : "Enviar propuesta"}
                  </button>
                </div>
                {ok && <p className="text-sm text-chicha">{ok}</p>}
              </form>

              <div className="space-y-4">
                {propuestas.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">Sé la primera voz en esta mesa.</p>
                )}
                {propuestas.map(p => (
                  <article key={p.id} className="border-l-2 border-chicha/40 pl-4 py-1">
                    <div className="text-xs text-muted-foreground mb-1">
                      <span className="font-semibold text-ink">{p.autor}</span>
                      {p.provincia && <span> · {p.provincia}</span>}
                      <span> · {new Date(p.created_at).toLocaleDateString("es-BO")}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{p.contenido}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-ink text-cream rounded-xl p-6">
              <div className="text-[10px] uppercase tracking-widest text-cream/60 mb-2">Próxima sesión</div>
              <p className="font-display text-xl mb-2">{mesa.proximaSesion}</p>
              <p className="text-sm text-cream/70">{mesa.lugar}</p>
            </div>
            <div className="bg-secondary rounded-xl p-6">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Documentos</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-chicha">↓ Acta sesión anterior (PDF)</a></li>
                <li><a href="#" className="hover:text-chicha">↓ Reglamento de la mesa (PDF)</a></li>
                <li><a href="#" className="hover:text-chicha">↓ Plan de trabajo 2026 (PDF)</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
