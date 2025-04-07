
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = 'https://tihudznccftgoclypbqe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpaHVkem5jY2Z0Z29jbHlwYnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTgwNDUsImV4cCI6MjA1OTU3NDA0NX0.TUnaGhe3XMgwECPG0l24JDM62XQ_0gAp4ELwA5qMLZE';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
