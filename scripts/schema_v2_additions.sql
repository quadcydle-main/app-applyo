-- Add resume upload support and auto-applier feature
ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS raw_text TEXT;
ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS file_path TEXT;
ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS word_count INT DEFAULT 0;
ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS is_gibberish BOOLEAN DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS public.auto_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  status TEXT DEFAULT 'queued',
  rules JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.auto_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own auto tasks" ON public.auto_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create auto tasks" ON public.auto_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
