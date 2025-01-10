import { useState, useEffect } from 'react'
import { remixText } from './api/remix'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Check for API key on mount
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
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">DonutMixer</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-300">
              Input Text
            </label>
            <textarea
              id="input"
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
              rows="4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 focus:ring-offset-gray-900"
          >
            {isLoading ? 'Remixing...' : 'Remix Content'}
          </button>

          {error && (
            <div className="text-red-400 text-sm bg-red-900 bg-opacity-50 p-3 rounded-md border border-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="output" className="block text-sm font-medium text-gray-300">
              Remixed Text
            </label>
            <textarea
              id="output"
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm placeholder-gray-400"
              rows="4"
              value={outputText}
              readOnly
              placeholder={isLoading ? 'Remixing your text...' : 'Remixed text will appear here...'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
