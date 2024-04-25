import { createClient } from '@supabase/supabase-js'

export default async function getDatabase() {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl || "", supabaseKey || "")
    return supabase
}