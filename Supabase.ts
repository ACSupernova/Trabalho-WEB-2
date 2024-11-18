import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ''; // substitua pela sua URL
const supabaseAnonKey = ''; // substitua pela sua chave anônima

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
