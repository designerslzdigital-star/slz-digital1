CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  empresa text,
  email text,
  telefone text NOT NULL,
  segmento text NOT NULL,
  desafio text NOT NULL,
  data_horario_escolhido timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  observacoes text,
  investimento_atual text
);
GRANT ALL ON public.leads TO service_role;
REVOKE ALL ON public.leads FROM anon, authenticated;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages leads" ON public.leads FOR ALL TO service_role USING (true) WITH CHECK (true);