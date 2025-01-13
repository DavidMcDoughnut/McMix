import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveTranslation(originalText, translatedText) {
  try {
    const { data, error } = await supabase
      .from('translations')
      .insert([
        {
          original_text: originalText,
          translated_text: translatedText,
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving translation:', error)
    throw error
  }
}

export async function getTranslations() {
  try {
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching translations:', error)
    throw error
  }
} 