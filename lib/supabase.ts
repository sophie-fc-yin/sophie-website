import { createClient } from '@supabase/supabase-js';

// Supabase table schema for reference:
// CREATE TABLE contact_requests (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   created_at TIMESTAMPTZ DEFAULT now(),
//   what_to_automate TEXT NOT NULL,
//   platform TEXT NOT NULL,
//   timeline TEXT NOT NULL,
//   email TEXT NOT NULL,
//   status TEXT DEFAULT 'new'
// );

export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseKey);
}
