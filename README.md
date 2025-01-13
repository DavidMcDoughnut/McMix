# DonutLols Translator

A fun translator that converts your text into overly polite, passive-aggressive British English.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your API keys:
     - Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com)
     - Get Supabase credentials from your Supabase project settings

4. Run the development server:
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_OPENAI_API_KEY`: Your OpenAI API key
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Note:** Never commit your `.env` file to version control. It's already added to `.gitignore`.
