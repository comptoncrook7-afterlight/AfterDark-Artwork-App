
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
// In dev we still let code import but warn
console.warn('Supabase client env variables missing');
}

export const supabase = createClient(url, anonKey);

