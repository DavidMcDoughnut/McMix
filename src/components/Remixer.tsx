import { useState } from 'react'

const Remixer = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRemix = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/remix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })
      const data = await response.json()
      setOutputText(data.remixedText)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Content Remixer</h1>
      
      <div className="space-y-4">
        <textarea
          className="w-full h-40 p-2 border rounded"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here..."
        />
        
        <button
          onClick={handleRemix}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {isLoading ? 'Remixing...' : 'Remix Content'}
        </button>
        
        <textarea
          className="w-full h-40 p-2 border rounded"
          value={outputText}
          readOnly
          placeholder="Remixed text will appear here..."
        />
      </div>
    </div>
  )
}

export default Remixer 