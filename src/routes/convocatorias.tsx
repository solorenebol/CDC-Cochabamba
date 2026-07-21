import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/convocatorias")({
  head: () => ({
    meta: [
      { title: "Convocatorias — CDCC Cochabamba" },
      { name: "description", content: "Fondos concursables, becas y convocatorias culturales abiertas para artistas y gestores de las 16 provincias de Cochabamba." },
      { property: "og:title", content: "Convocatorias — CDCC Cochabamba" },
      { property: "og:description", content: "Fondos concursables, becas y convocatorias culturales abiertas del sector cochala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConvocatoriasPage,
});

type Convocatoria = {
  id: string;
  titulo: string;
  entidad: string;
  categoria: string;
  monto: string | null;
  deadline: string | null;
  descripcion: string | null;
  enlace: string | null;
};

function ConvocatoriasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["convocatorias"],
    queryFn: async (): Promise<Convocatoria[]> => {
      const { data, error } = await supabase
        .from("convocatorias")
        .select("id,titulo,entidad,categoria,monto,deadline,descripcion,enlace")
        .eq("activa", true)
        .order("deadline", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-cdcc py-16 md:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Fomento cultural</span>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-3 mb-5 max-w-3xl">Convocatorias abiertas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Fondos concursables, becas y residencias vigentes para el sector cultural de Cochabamba. Filtramos por
            entidad, categoría y territorio.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Cargando convocatorias…</p>
          ) : !data || data.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">No hay convocatorias activas en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {data.map(c => (
                <article key={c.id} className="rounded-2xl bg-card ring-1 ring-black/5 p-7 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-chicha bg-chicha/10 px-2 py-1 rounded-full">{c.categoria}</span>
                    <span className="text-[11px] text-muted-foreground uppercase tracking-widest">{c.entidad}</span>
                  </div>
                  <h3 className="font-display text-xl font-medium leading-snug mb-3">{c.titulo}</h3>
                  {c.descripcion && <p className="text-sm text-muted-foreground mb-5">{c.descripcion}</p>}
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-border/60">
                    <div>
                      {c.monto && (
                        <>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Monto</div>
                          <div className="font-display text-lg">{c.monto}</div>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      {c.deadline && (
                        <>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cierre</div>
                          <div className="font-medium text-sm">{new Date(c.deadline).toLocaleDateString("es-BO", { day: "2-digit", month: "long", year: "numeric" })}</div>
                        </>
                      )}
                    </div>
                  </div>
                  {c.enlace && (
                    <a href={c.enlace} target="_blank" rel="noreferrer" className="mt-5 inline-flex bg-chicha text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-chicha-deep transition-colors self-start">
                      Postular
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
