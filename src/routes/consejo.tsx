import { createFileRoute } from "@tanstack/react-router";
import logoCdcc from "@/assets/logo_cdcc.jpg.asset.json";
import daniela from "@/assets/team/Daniela.jpeg.asset.json";
import mariaLaura from "@/assets/team/Maria_Laura.jpeg.asset.json";
import daniel from "@/assets/team/Daniel.jpeg.asset.json";
import ubaldo from "@/assets/team/ubaldo.jpeg.asset.json";
import mayra from "@/assets/team/Mayra.jpeg.asset.json";
import valeria from "@/assets/team/Valeria.jpeg.asset.json";
import homero from "@/assets/team/homero.jpeg.asset.json";
import marco from "@/assets/team/Marco.jpeg.asset.json";

export const Route = createFileRoute("/consejo")({
  component: Consejo,
  head: () => ({
    meta: [
      { title: "Quiénes Somos — Consejo Departamental de Culturas de Cochabamba" },
      { name: "description", content: "Conoce al equipo, la esencia, misión, visión y el marco institucional del CDCC Cochabamba: forjadores de identidad y comunidad desde las culturas." },
      { property: "og:title", content: "Quiénes Somos — CDCC Cochabamba" },
      { property: "og:description", content: "Directiva, filosofía institucional y Documento Marco para la Política de Desarrollo Cultural del CDCC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Miembro = { nombre: string; cargo: string; perfil: string; foto?: string };

const DIRECTIVA: Miembro[] = [
  {
    nombre: "Daniela Katherine Parra Arze",
    cargo: "Presidenta",
    perfil: "Gestora cultural y articuladora del ecosistema artístico cochabambino. Lidera la representación institucional del Consejo ante instancias públicas y comunitarias.",
    foto: daniela.url,
  },
  {
    nombre: "María Laura Sanz",
    cargo: "Auxiliar de Presidencia",
    perfil: "Apoya la coordinación estratégica y el seguimiento de agendas de la Presidencia del Consejo.",
    foto: mariaLaura.url,
  },
  {
    nombre: "Daniel Quiroga",
    cargo: "Vicepresidente",
    perfil: "Acompaña la conducción del Consejo y la articulación entre mesas de trabajo, territorios y actores culturales del departamento.",
    foto: daniel.url,
  },
  {
    nombre: "Uvaldo Romero",
    cargo: "Auxiliar de Vicepresidencia",
    perfil: "Facilita la coordinación operativa de la Vicepresidencia y el enlace con las mesas de trabajo.",
    foto: ubaldo.url,
  },
  {
    nombre: "María René Torrez",
    cargo: "Secretaria de Actas y Acuerdos",
    perfil: "Custodia la memoria institucional del Consejo: actas, acuerdos y resoluciones de las Jornadas Culturales Plurinacionales.",
  },
  {
    nombre: "Mayra I. Ponce",
    cargo: "Auxiliar de Actas y Acuerdos",
    perfil: "Colabora en la sistematización y archivo de la documentación oficial del Consejo.",
    foto: mayra.url,
  },
  {
    nombre: "Valeria Soliz",
    cargo: "Comunicación y Difusión",
    perfil: "Diseña la estrategia comunicacional del CDCC y garantiza la difusión pública de convocatorias, procesos y logros.",
    foto: valeria.url,
  },
  {
    nombre: "Abel Hurtado",
    cargo: "Auxiliar de Comunicación",
    perfil: "Apoya la producción de contenidos, redes sociales y cobertura de actividades del Consejo.",
  },
  {
    nombre: "Homero Rodas",
    cargo: "Relacionador Institucional",
    perfil: "Gestiona las relaciones estratégicas con instituciones públicas, privadas y de cooperación cultural.",
    foto: homero.url,
  },
  {
    nombre: "Marco Antonio Macías",
    cargo: "Auxiliar de Relaciones Institucionales",
    perfil: "Coordina agendas y acompaña gestiones interinstitucionales del Consejo.",
    foto: marco.url,
  },
];

const VALORES = [
  "Identidad",
  "Comunidad",
  "Participación",
  "Diversidad e interculturalidad",
  "Derechos culturales",
  "Territorialidad",
  "Transparencia",
  "Compromiso",
  "Innovación",
];

const EJES = [
  { t: "Derechos Culturales", d: "Promover el reconocimiento, respeto, garantía y ejercicio pleno de los derechos culturales como parte fundamental de los derechos humanos." },
  { t: "Diversidad e Interculturalidad", d: "Reconocer la diversidad de pueblos, naciones, lenguas, saberes y expresiones culturales, promoviendo el diálogo intercultural y el respeto mutuo." },
  { t: "Patrimonio, Memoria y Saberes", d: "Proteger, salvaguardar y fortalecer los patrimonios materiales e inmateriales, las memorias colectivas y los saberes ancestrales." },
  { t: "Participación y Cogobernanza", d: "Fortalecer los mecanismos de participación efectiva y corresponsabilidad entre el Estado y la sociedad civil." },
  { t: "Territorialidad", d: "Impulsar políticas culturales construidas desde las realidades, necesidades y potencialidades de cada territorio." },
  { t: "Desarrollo Cultural Sostenible", d: "Garantizar la sostenibilidad de los procesos culturales, dignificar el trabajo artístico y fortalecer las economías culturales y creativas." },
  { t: "Educación, Información e Innovación", d: "Impulsar formación, investigación, información, innovación y transformación digital para fortalecer el desarrollo cultural." },
];

function Consejo() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border/60 overflow-hidden">
        <div className="absolute inset-0 weaving-pattern" aria-hidden />
        <div className="container-cdcc relative py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex md:justify-start justify-center">
            <img src={logoCdcc.url} alt="Logo CDCC Cochabamba" className="w-56 md:w-72 h-auto" width={512} height={512} />
          </div>
          <div className="md:col-span-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Quiénes Somos</span>
            <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mt-3 mb-6 text-balance">
              Consejo Departamental de Culturas de Cochabamba
            </h1>
            <p className="text-lg text-muted-foreground max-w-[60ch] text-pretty">
              Somos el espacio de articulación e incidencia que reúne a los diversos actores culturales del departamento
              para construir, junto al Estado, las políticas públicas culturales del Cochabamba plurinacional.
            </p>
          </div>
        </div>
      </section>

      {/* Declaración / cita */}
      <section className="py-20 bg-ink text-cream">
        <div className="container-cdcc max-w-4xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ocre">Declaración institucional</span>
          <blockquote className="font-display text-2xl md:text-3xl leading-snug mt-5 mb-8">
            “Las culturas son el tejido vivo que fortalece la identidad, la comunidad y el ejercicio de los derechos culturales,
            constituyéndose en fundamento del desarrollo integral del Estado Plurinacional de Bolivia.”
          </blockquote>
          <p className="text-cream/70 leading-relaxed">
            El presente Documento Marco para la Política de Desarrollo Cultural es resultado del proceso participativo de las
            <span className="text-cream"> Jornadas Culturales Plurinacionales</span> y expresa el compromiso colectivo de los actores culturales con
            políticas públicas que respondan a las realidades, necesidades y potencialidades del departamento y del Estado Plurinacional.
          </p>
        </div>
      </section>

      {/* Misión / Visión / Propósito */}
      <section className="py-24">
        <div className="container-cdcc">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Filosofía institucional</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2 mb-12">Nuestra esencia</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border ring-1 ring-border rounded-xl overflow-hidden">
            {[
              { t: "Propósito", d: "Fortalecer las culturas como forjadoras de identidad y comunidad, promoviendo la construcción participativa de políticas públicas culturales que garanticen el ejercicio pleno de los derechos culturales." },
              { t: "Misión", d: "Articular, representar e impulsar la participación de los diversos actores culturales para la construcción, seguimiento e incidencia en políticas públicas culturales." },
              { t: "Visión", d: "Consolidarnos como espacio referente de articulación e incidencia, donde las culturas sean reconocidas como un derecho, un bien común y un pilar del desarrollo integral." },
            ].map(x => (
              <div key={x.t} className="bg-cream p-8">
                <h3 className="font-display text-xl font-medium mb-3">{x.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha mb-4">Valores institucionales</h3>
            <div className="flex flex-wrap gap-2">
              {VALORES.map(v => (
                <span key={v} className="px-4 py-2 rounded-full bg-secondary text-sm ring-1 ring-black/5">{v}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principio rector */}
      <section className="py-20 bg-secondary/60 border-y border-border/60">
        <div className="container-cdcc grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Principio rector</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2">
              Las culturas son forjadoras de identidad y comunidad.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              El CDCC reconoce que las culturas constituyen el fundamento sobre el cual las personas y las comunidades construyen
              identidad, fortalecen el sentido de pertenencia, transmiten conocimientos, preservan sus memorias y proyectan un futuro compartido.
            </p>
            <p>
              Desde esta comprensión, las políticas públicas culturales deben reconocer, proteger, fortalecer y promover las culturas
              como una dimensión transversal del desarrollo integral, garantizando el ejercicio pleno de los derechos culturales,
              el fortalecimiento de la democracia intercultural y la participación activa de la sociedad.
            </p>
          </div>
        </div>
      </section>

      {/* Ejes orientadores */}
      <section className="py-24">
        <div className="container-cdcc">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Ejes orientadores</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2 mb-12">Marco para las políticas culturales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EJES.map((e, i) => (
              <article key={e.t} className="bg-card p-7 rounded-xl ring-1 ring-black/5">
                <span className="font-display text-3xl font-light text-chicha/40">0{i + 1}</span>
                <h4 className="font-display text-lg font-medium mt-3 mb-2">{e.t}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Decreto / Conformación */}
      <section className="py-20 bg-cream-2/60 border-y border-border/60">
        <div className="container-cdcc max-w-4xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Base normativa</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2 mb-6">
            Decreto de conformación del Consejo
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            El Consejo Departamental de Culturas de Cochabamba se conforma en el marco de la Constitución Política del Estado Plurinacional,
            la <strong className="text-ink">Ley Marco de Autonomías y Descentralización N.° 031 “Andrés Ibáñez”</strong> y la normativa sectorial cultural,
            como instancia de participación, cogobernanza e incidencia en la política pública cultural del departamento.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Su directiva y composición fueron ratificadas por las <strong className="text-ink">Jornadas Culturales Plurinacionales 2026</strong>,
            de donde emana el mandato para el presente Documento Marco.
          </p>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-24">
        <div className="container-cdcc">
          <div className="mb-12 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-chicha">Nuestro equipo</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2 mb-3">Directiva del Consejo</h2>
            <p className="text-muted-foreground">
              Representantes electas y electos que llevan adelante la conducción, gestión y comunicación del CDCC Cochabamba.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIRECTIVA.map(m => (
              <article key={m.nombre} className="group">
                <div className="aspect-square rounded-xl overflow-hidden bg-secondary ring-1 ring-black/5 mb-5 relative">
                  {m.foto ? (
                    <img src={m.foto} alt={`Retrato de ${m.nombre}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={540} height={540} />
                  ) : (
                    <div className="absolute inset-0 weaving-pattern flex items-center justify-center">
                      <span className="font-display text-6xl text-chicha/30 font-medium">
                        {m.nombre.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-chicha">{m.cargo}</span>
                <h3 className="font-display text-xl font-medium mt-1 mb-2 leading-tight">{m.nombre}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.perfil}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
