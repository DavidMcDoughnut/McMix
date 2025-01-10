import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { text } = req.body
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative content remixer. Rewrite the given text in a more engaging way while maintaining the core message."
        },
        {
          role: "user",
          content: text
        }
      ],
    })

    const remixedText = completion.choices[0].message.content

    res.status(200).json({ remixedText })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Error processing your request' })
  }
} 