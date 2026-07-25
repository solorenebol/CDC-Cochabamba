import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PROVINCIAS, DISCIPLINAS } from "@/lib/cdcc-data";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Mapeo Artístico Departamental — CDCC Cochabamba" },
      { name: "description", content: "Formulario oficial de mapeo del sector artístico y cultural de las 16 provincias de Cochabamba. Pre-acreditación al Registro Plurinacional de Artistas (RPA)." },
      { property: "og:title", content: "Mapeo Artístico Departamental — CDCC Cochabamba" },
      { property: "og:description", content: "Regístrate en el mapeo del sector artístico y cultural cochabambino. Ruta directa al RPA del Ministerio de Culturas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistroPage,
});

const RPA_URL = "https://rpa.minculturas.gob.bo/";

const TIPOS_AGENTE = [
  "Artista individual",
  "Colectivo / Agrupación",
  "Gestor cultural",
  "Portador de saber ancestral",
  "Institución cultural",
] as const;

const AUTOIDENTIFICACION = [
  "Quechua",
  "Aymara",
  "Yuqui",
  "Yuracaré",
  "Mestizo/a",
  "Afroboliviano/a",
  "Otro",
  "Prefiero no responder",
] as const;

function genRpaCode() {
  const y = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `CBBA-${y}-${rand}`;
}

function RegistroPage() {
  const [form, setForm] = useState({
    nombre: "",
    tipo_agente: TIPOS_AGENTE[0] as string,
    ci: "",
    email: "",
    telefono: "",
    provincia: PROVINCIAS[0].nombre as string,
    autoidentificacion: "",
    disciplinas: [] as string[],
    trayectoria: "",
    portafolio: "",
  });
  const [state, setState] = useState<{ status: "idle" | "loading" | "done" | "error"; code?: string; msg?: string }>({ status: "idle" });

  function toggleDisc(d: string) {
    setForm(f => ({
      ...f,
      disciplinas: f.disciplinas.includes(d) ? f.disciplinas.filter(x => x !== d) : [...f.disciplinas, d],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.email || form.disciplinas.length === 0) {
      setState({ status: "error", msg: "Completa nombre, email y al menos una disciplina." });
      return;
    }
    setState({ status: "loading" });
    const rpa_code = genRpaCode();
    const portafolio_urls = form.portafolio
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(Boolean);
    const { error } = await supabase.from("artistas").insert({
      rpa_code,
      nombre: form.nombre,
      tipo_agente: form.tipo_agente,
      ci: form.ci || null,
      email: form.email,
      telefono: form.telefono || null,
      provincia: form.provincia,
      autoidentificacion: form.autoidentificacion || null,
      disciplinas: form.disciplinas,
      trayectoria: form.trayectoria || null,
      portafolio_urls,
    });
    if (error) {
      setState({ status: "error", msg: error.message });
      return;
    }
    setState({ status: "done", code: rpa_code });
  }

  if (state.status === "done") {
    return (
      <section className="py-24">
        <div className="container-cdcc max-w-2xl">
          <div className="rounded-3xl bg-card ring-1 ring-black/5 p-10 text-center">
            <span className="inline-flex text-[10px] font-bold uppercase tracking-widest text-chicha bg-chicha/10 px-3 py-1 rounded-full mb-6">Pre-acreditación registrada</span>
            <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-4">¡Kausachum arte cochala!</h1>
            <p className="text-muted-foreground mb-8">
              Tu ficha fue registrada en el mapeo departamental. Recibirás la confirmación en tu correo.
              Guarda tu código de pre-acreditación:
            </p>
            <div className="mx-auto inline-block bg-ink text-cream font-mono text-2xl px-8 py-4 rounded-2xl tracking-widest mb-8">
              {state.code}
            </div>
            <div className="border-t border-border/60 pt-8 mt-4">
              <h2 className="font-display text-xl mb-3">Siguiente paso: RPA Nacional</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Completa tu acreditación oficial en el Registro Plurinacional de Artistas del Ministerio de Culturas, Descolonización y Despatriarcalización.
              </p>
              <a href={RPA_URL} target="_blank" rel="noreferrer" className="inline-flex bg-chicha text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-chicha-deep transition-colors">
                Ir al RPA del Ministerio ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-cdcc py-16 md:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Registro sectorial</span>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-3 mb-5 max-w-3xl">
            Mapeo Artístico Departamental
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Este formulario alimenta el censo cultural de las 16 provincias de Cochabamba y te entrega un código de
            pre-acreditación válido para acceder a convocatorias del CDCC. La acreditación oficial se completa en el
            Registro Plurinacional de Artistas (RPA) del Ministerio de Culturas.
          </p>
          <a
            href={RPA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-chicha hover:text-chicha-deep border-b border-chicha/40 pb-0.5"
          >
            Acceder al RPA del Ministerio de Culturas ↗
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cdcc max-w-3xl">
          <form onSubmit={onSubmit} className="rounded-3xl bg-card ring-1 ring-black/5 p-8 md:p-10 space-y-8">
            <Fieldset title="01 · Identificación">
              <Row>
                <Field label="Nombre completo o del colectivo *">
                  <input required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Cédula de identidad">
                  <input value={form.ci} onChange={e => setForm({ ...form, ci: e.target.value })} className={inputCls} />
                </Field>
              </Row>
              <Row>
                <Field label="Tipo de agente cultural *">
                  <select required value={form.tipo_agente} onChange={e => setForm({ ...form, tipo_agente: e.target.value })} className={inputCls}>
                    {TIPOS_AGENTE.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Autoidentificación">
                  <select value={form.autoidentificacion} onChange={e => setForm({ ...form, autoidentificacion: e.target.value })} className={inputCls}>
                    <option value="">— Selecciona —</option>
                    {AUTOIDENTIFICACION.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </Row>
            </Fieldset>

            <Fieldset title="02 · Contacto y territorio">
              <Row>
                <Field label="Correo electrónico *">
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Teléfono / WhatsApp">
                  <input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} className={inputCls} />
                </Field>
              </Row>
              <Field label="Provincia *">
                <select required value={form.provincia} onChange={e => setForm({ ...form, provincia: e.target.value })} className={inputCls}>
                  {PROVINCIAS.map(p => <option key={p.nombre}>{p.nombre}</option>)}
                </select>
              </Field>
            </Fieldset>

            <Fieldset title="03 · Práctica artística">
              <Field label="Disciplinas * (selecciona una o más)">
                <div className="flex flex-wrap gap-2">
                  {DISCIPLINAS.map(d => {
                    const on = form.disciplinas.includes(d);
                    return (
                      <button type="button" key={d} onClick={() => toggleDisc(d)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${on ? "bg-chicha text-cream border-chicha" : "bg-background border-border text-muted-foreground hover:border-chicha/60"}`}>
                        {d}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Field label="Breve trayectoria (máx. 500 caracteres)">
                <textarea rows={4} maxLength={500} value={form.trayectoria} onChange={e => setForm({ ...form, trayectoria: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Portafolio (URLs separadas por coma o espacio)">
                <input value={form.portafolio} onChange={e => setForm({ ...form, portafolio: e.target.value })} placeholder="https://... , https://..." className={inputCls} />
              </Field>
            </Fieldset>

            {state.status === "error" && (
              <p className="text-sm text-destructive">{state.msg}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-4 border-t border-border/60">
              <p className="text-xs text-muted-foreground max-w-sm">
                Al enviar aceptas el tratamiento de tus datos con fines estadísticos y de política pública cultural.
              </p>
              <button
                type="submit"
                disabled={state.status === "loading"}
                className="bg-ink text-cream px-8 py-3 rounded-full text-sm font-medium hover:bg-chicha transition-colors disabled:opacity-50"
              >
                {state.status === "loading" ? "Enviando…" : "Registrar en el mapeo"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

const inputCls = "w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-chicha/40 focus:border-chicha transition-colors";

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-chicha">{title}</h2>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
