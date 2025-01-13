import { useState, useEffect } from 'react'
import { remixText } from './api/remix'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { TranslationHistory } from './components/TranslationHistory'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      setError('OpenAI API key is not configured. Please check your .env file.')
    }
  }, [])

  const handleRemix = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to remix')
      return
    }

    setIsLoading(true)
    setError(null)
    setOutputText('')

    try {
      const remixedText = await remixText(inputText)
      setOutputText(remixedText)
    } catch (error) {
      console.error('Error remixing text:', error)
      setError(error.message || 'Failed to remix text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <TranslationHistory />
      
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-light text-center text-foreground tracking-[6px]">DonutLols Translator</h1>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="input" className="text-sm text-muted-foreground">
                Donut-Speak
              </label>
              <div className="relative rounded-md overflow-hidden">
                <Textarea
                  id="input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your Freedom Thoughts here..."
                  disabled={isLoading}
                  rows={5}
                  className="bg-alternative border-alternative-100 focus:border-brand focus:ring-brand placeholder:text-muted-foreground resize-none us-flag-bg"
                />
              </div>
            </div>

            <Button
              onClick={handleRemix}
              disabled={isLoading || !inputText.trim()}
              className="w-full bg-brand hover:bg-brand-500 text-background font-medium transition-colors"
              variant="default"
            >
              {isLoading ? 'Translating...' : 'Translate Content'}
            </Button>

            {error && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="output" className="text-sm text-muted-foreground">
                Lols Translation
              </label>
              <div className="relative rounded-md overflow-hidden">
                <Textarea
                  id="output"
                  value={outputText}
                  readOnly
                  placeholder={isLoading ? 'Translating your text...' : 'Translated text will appear here...'}
                  rows={8}
                  className="bg-alternative border-alternative-100 placeholder:text-muted-foreground resize-none uk-flag-bg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
