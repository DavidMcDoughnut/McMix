import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API key is missing. Please check your .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function remixText(text) {
  if (!text) {
    throw new Error('No text provided for remixing');
  }

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative content remixer. Your task is to take the input text and create a remixed version that maintains the core message but presents it in a fresh, engaging way. Keep the same information but change the style, tone, or structure."
        },
        {
          role: "user",
          content: `Please remix this text: ${text}`
        }
      ],
      temperature: 0.7,
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error in remixText:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw new Error(error.message || 'Failed to remix text');
  }
} 