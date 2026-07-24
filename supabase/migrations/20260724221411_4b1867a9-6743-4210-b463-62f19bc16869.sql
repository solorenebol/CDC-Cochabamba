
-- ============ ARTISTAS ============
-- Add optional ownership column
ALTER TABLE public.artistas ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop overly permissive policies
DROP POLICY IF EXISTS "public directory read" ON public.artistas;
DROP POLICY IF EXISTS "anyone can register" ON public.artistas;

-- Public directory: safe columns only, via a view
DROP VIEW IF EXISTS public.artistas_directorio;
CREATE VIEW public.artistas_directorio
WITH (security_invoker = true) AS
SELECT
  id,
  rpa_code,
  nombre,
  tipo_agente,
  provincia,
  autoidentificacion,
  disciplinas,
  trayectoria,
  portafolio_urls,
  estado,
  created_at
FROM public.artistas;

GRANT SELECT ON public.artistas_directorio TO anon, authenticated;

-- Table-level: no anon SELECT (PII stays private). Owners can read their own row.
CREATE POLICY "owners read own artist row"
ON public.artistas FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Registration: anonymous inserts allowed only with user_id NULL;
-- authenticated inserts must set user_id = auth.uid().
CREATE POLICY "anon can register without owner"
ON public.artistas FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

CREATE POLICY "authenticated register as self"
ON public.artistas FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Owners can update / delete their own record only
CREATE POLICY "owners update own artist row"
ON public.artistas FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "owners delete own artist row"
ON public.artistas FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Revoke direct table SELECT from anon (view is the public surface)
REVOKE SELECT ON public.artistas FROM anon;

-- ============ PROPUESTAS_MESA ============
-- Moderation by default
ALTER TABLE public.propuestas_mesa ALTER COLUMN aprobada SET DEFAULT false;

-- Optional owner linkage for future authenticated flows
ALTER TABLE public.propuestas_mesa ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Replace open insert policy with a constrained one:
-- submissions must start unapproved; authenticated users must own their row.
DROP POLICY IF EXISTS "anyone submits" ON public.propuestas_mesa;

CREATE POLICY "anon submits pending"
ON public.propuestas_mesa FOR INSERT
TO anon
WITH CHECK (aprobada = false AND user_id IS NULL);

CREATE POLICY "authenticated submits pending as self"
ON public.propuestas_mesa FOR INSERT
TO authenticated
WITH CHECK (aprobada = false AND user_id = auth.uid());
