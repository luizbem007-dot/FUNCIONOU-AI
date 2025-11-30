import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bwstynvthxuwaiyrgjoe.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3c3R5bnZ0aHh1d2FpeXJnam9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTgzNzksImV4cCI6MjA3NDgzNDM3OX0.pGOlQxIfXzfFbN2ZkP-h8IbGOUcLV6-69YNSUIW5iNk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
