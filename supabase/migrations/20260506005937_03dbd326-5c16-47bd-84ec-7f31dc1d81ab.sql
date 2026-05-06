-- Track payment status on contact_submissions (used for booking requests too)
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS submission_type text NOT NULL DEFAULT 'contact';

CREATE INDEX IF NOT EXISTS idx_contact_submissions_type_created
  ON public.contact_submissions (submission_type, created_at DESC);

-- Allow admins to update payment status (only paid_at column conceptually; full UPDATE since RLS is row-level)
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));