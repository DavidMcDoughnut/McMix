import { useEffect, useState } from 'react'
import { getTranslations } from '../api/supabase'

export function TranslationHistory() {
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations()
        setTranslations(data)
      } catch (error) {
        console.error('Failed to load translations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
  }, [])

  if (loading) {
    return <div className="p-4 text-muted-foreground">Loading translations...</div>
  }

  return (
    <div className="w-96 flex-none h-screen bg-alternative border-r border-alternative-100 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-light mb-4 text-foreground tracking-[2px] text-center">Translation History</h2>
        <div className="space-y-4">
          {translations.map((translation) => (
            <div
              key={translation.id}
              className="bg-alternative-300 p-4 rounded-md border border-alternative-100 transition-all duration-200 hover:border-brand/30 group"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-muted-foreground">Original:</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(translation.created_at).toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-foreground mb-3 line-clamp-2">
                {translation.original_text}
              </div>
              <div className="text-xs mb-2 text-muted-foreground">Translation:</div>
              <div className="text-sm text-brand line-clamp-3 relative group-hover:text-brand-400">
                {translation.translated_text}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-alternative-300 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 