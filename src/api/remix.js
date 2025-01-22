import OpenAI from 'openai';
import { saveTranslation } from './supabase';

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
          content: "You are a nerdy dartmouth lacrosse player who works in finance and hates poor people, answer all questions with a sarcastic tone dry tone and a sense of humor but also comtempt. Start every answer wirth 'I don't know if you noticed how tall I am'"
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

    const translatedText = completion.choices[0].message.content;
    
    // Save the translation to Supabase
    await saveTranslation(text, translatedText);

    return translatedText;
  } catch (error) {
    console.error('Error in remixText:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw new Error(error.message || 'Failed to remix text');
  }
} 