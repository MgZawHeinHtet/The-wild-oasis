
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ujsbsmjzetuclarhmrgl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqc2JzbWp6ZXR1Y2xhcmhtcmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3ODkyMDIsImV4cCI6MjAzNDM2NTIwMn0.iU_3UvzYKpInMD9feuBJ5Z1W0BHAook6TTLrGXGwQEU'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase