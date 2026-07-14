
CREATE TABLE public.artistas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rpa_code text UNIQUE NOT NULL,
  nombre text NOT NULL,
  tipo_agente text NOT NULL,
  ci text,
  email text NOT NULL,
  telefono text,
  provincia text NOT NULL,
  autoidentificacion text,
  disciplinas text[] NOT NULL DEFAULT '{}',
  trayectoria text,
  portafolio_urls text[] DEFAULT '{}',
  estado text NOT NULL DEFAULT 'pre_acreditado',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.artistas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artistas TO authenticated;
GRANT ALL ON public.artistas TO service_role;
ALTER TABLE public.artistas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can register" ON public.artistas FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public directory read" ON public.artistas FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.propuestas_mesa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mesa_slug text NOT NULL,
  autor text NOT NULL,
  provincia text,
  contenido text NOT NULL,
  aprobada boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.propuestas_mesa TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.propuestas_mesa TO authenticated;
GRANT ALL ON public.propuestas_mesa TO service_role;
ALTER TABLE public.propuestas_mesa ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read approved" ON public.propuestas_mesa FOR SELECT TO anon, authenticated USING (aprobada = true);
CREATE POLICY "anyone submits" ON public.propuestas_mesa FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.convocatorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  entidad text NOT NULL,
  categoria text NOT NULL,
  monto text,
  deadline date,
  descripcion text,
  enlace text,
  activa boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.convocatorias TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.convocatorias TO authenticated;
GRANT ALL ON public.convocatorias TO service_role;
ALTER TABLE public.convocatorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.convocatorias FOR SELECT TO anon, authenticated USING (activa = true);

-- Seed convocatorias
INSERT INTO public.convocatorias (titulo, entidad, categoria, monto, deadline, descripcion, enlace) VALUES
('Fondo Concursable Culturas Vivas 2026', 'CDCC + Gobernación', 'Culturas Vivas', 'Bs. 45.000', '2026-03-15', 'Financiamiento para colectivos comunitarios que trabajan salvaguarda de saberes ancestrales en las 16 provincias.', '#'),
('Beca de Formación Audiovisual Andina', 'Ministerio de Culturas', 'Formación', 'Bs. 20.000', '2026-02-28', 'Beca completa para 12 cineastas emergentes de Cochabamba con enfoque plurinacional.', '#'),
('Circulación Escénica Valle Alto', 'CDCC', 'Artes Escénicas', 'Bs. 30.000', '2026-04-10', 'Gira de teatro y danza por Punata, Arani, Cliza y Tarata.', '#'),
('Fondo Editorial Plurilingüe', 'CDCC + FOCAPACI', 'Literatura', 'Bs. 25.000', '2026-05-20', 'Publicación de obras en quechua, aymara y castellano.', '#'),
('Residencia de Muralismo Cochala', 'CDCC', 'Artes Visuales', 'Bs. 18.000', '2026-03-30', 'Residencia de 3 meses para muralistas emergentes en Cercado y Quillacollo.', '#'),
('Feria de Industrias Creativas Digitales', 'CDCC + AGETIC', 'Industrias Creativas', 'Bs. 50.000', '2026-06-15', 'Fondo semilla para 10 emprendimientos culturales digitales.', '#');
