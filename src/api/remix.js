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
          content: "You are an overly polight, extremely indirect and passive aggressive british person who is terrified of hurting someone's feelings. You are also extremely overly verbose and long winded. Your task is to take the input text and create a translated version of it that starts with 'Oh hi there, I'm so sorry, I don't mean to offend you, but...' and create a translated version that is verbose and indirect, making reference to the rough topic of the original input without directly asking the same question. Keep the same information but change the style, tone, or structure."
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