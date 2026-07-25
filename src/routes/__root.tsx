import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logoCdcc from "@/assets/logo_cdcc.jpg.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Kay pʼanqa mana tarikunchu · Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">La página que buscas no existe o fue movida.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Esta página no cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">Algo salió mal. Intenta refrescar o volver al inicio.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a href="/" className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary">
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CDCC Cochabamba — Consejo Departamental de Culturas" },
      { name: "description", content: "Portal cívico-cultural plurinacional del CDCC: registro RPA, mesas de trabajo, convocatorias, agenda y observatorio de las 16 provincias de Cochabamba." },
      { name: "author", content: "Consejo Departamental de Culturas de Cochabamba" },
      { property: "og:title", content: "CDCC Cochabamba — Consejo Departamental de Culturas" },
      { property: "og:description", content: "Portal cívico-cultural plurinacional del CDCC: registro RPA, mesas de trabajo, convocatorias, agenda y observatorio de las 16 provincias de Cochabamba." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CDCC Cochabamba — Consejo Departamental de Culturas" },
      { name: "twitter:description", content: "Portal cívico-cultural plurinacional del CDCC: registro RPA, mesas de trabajo, convocatorias, agenda y observatorio de las 16 provincias de Cochabamba." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/985a2796-897c-4a58-bf03-7a1a6194ff04/id-preview-9233fa8d--59c43aeb-7664-4dc2-a3bc-a0579fc6f705.lovable.app-1784067800096.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/985a2796-897c-4a58-bf03-7a1a6194ff04/id-preview-9233fa8d--59c43aeb-7664-4dc2-a3bc-a0579fc6f705.lovable.app-1784067800096.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/consejo", label: "Consejo" },
  { to: "/mesas", label: "Mesas" },
  { to: "/registro", label: "Registro RPA" },
  { to: "/convocatorias", label: "Convocatorias" },
  { to: "/agenda", label: "Agenda" },
  { to: "/normativa", label: "Normativa" },
  { to: "/observatorio", label: "Observatorio" },
] as const;

function Nav() {
  const [lang, setLang] = useState<"ES" | "QU" | "AY">("ES");
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-cdcc flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logoCdcc.url} alt="Logo CDCC Cochabamba" className="h-9 w-9 rounded-full object-cover ring-1 ring-black/5" width={72} height={72} />
          <span className="font-display text-lg font-semibold tracking-tight">
            CDCC <span className="text-chicha">Cochabamba</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} className="hover:text-chicha transition-colors" activeProps={{ className: "text-chicha" }}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-secondary rounded-full p-1 ring-1 ring-black/5 text-[11px] font-semibold">
            {(["ES", "QU", "AY"] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full transition-colors ${lang === l ? "bg-background shadow-sm text-ink" : "text-muted-foreground hover:text-ink"}`}
                aria-label={`Idioma ${l}`}
              >{l}</button>
            ))}
          </div>
          <button className="lg:hidden p-2" aria-label="Menú" onClick={() => setOpen(o => !o)}>
            <span className="block w-5 h-0.5 bg-ink mb-1"></span>
            <span className="block w-5 h-0.5 bg-ink mb-1"></span>
            <span className="block w-5 h-0.5 bg-ink"></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container-cdcc py-4 flex flex-col gap-3 text-sm font-medium">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5 hover:text-chicha">{n.label}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream/70 py-16 mt-24">
      <div className="container-cdcc">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoCdcc.url} alt="Logo CDCC Cochabamba" className="h-9 w-9 rounded-full object-cover" width={72} height={72} />
              <span className="font-display text-lg font-semibold text-cream">CDCC Cochabamba</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Órgano departamental plurinacional de gobernanza, promoción y salvaguarda del patrimonio cultural cochabambino. Amparado en la Ley N° 031 Andrés Ibáñez y la Ley Nacional de Culturas.
            </p>
            <div className="flex gap-4 text-[11px] font-semibold tracking-widest">
              <span className="text-cream">ESPAÑOL</span>
              <span className="hover:text-cream cursor-pointer">QHICHWA</span>
              <span className="hover:text-cream cursor-pointer">AYMARA</span>
            </div>
          </div>
          <div>
            <h5 className="text-cream/90 text-xs font-bold uppercase tracking-widest mb-5">Gobernanza</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/mesas" className="hover:text-cream">Mesas de Trabajo</Link></li>
              <li><Link to="/normativa" className="hover:text-cream">Normativa e Incidencia</Link></li>
              <li><Link to="/observatorio" className="hover:text-cream">Datos Abiertos</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-cream/90 text-xs font-bold uppercase tracking-widest mb-5">Sector</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/registro" className="hover:text-cream">Registro RPA</Link></li>
              <li><Link to="/convocatorias" className="hover:text-cream">Convocatorias</Link></li>
              <li><Link to="/agenda" className="hover:text-cream">Agenda Cultural</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 mt-10 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-3 text-[11px] uppercase tracking-widest">
          <span>© 2026 Consejo Departamental de Culturas</span>
          <span>Kay llajta, sapsi kawsaypuni · Cochabamba, Bolivia</span>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
