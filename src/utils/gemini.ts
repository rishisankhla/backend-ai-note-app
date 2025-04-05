import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeNote(title: string, content: string): Promise<string> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
      Analyze this note and provide constructive feedback:
      
      Title: ${title}
      Content: ${content.replace(/<[^>]*>/g, '')}
      
      Please provide feedback in the following format, ensuring each bullet point contains actual content (no empty bullets):
      1. Main topics covered
         * [Your point here]
         * [Your point here]
      2. Key points identified
         * [Your point here]
         * [Your point here]
      3. Suggestions for improvement
         * [Your point here]
         * [Your point here]
      4. Additional topics to consider
         * [Your point here]
         * [Your point here]
      5. Overall structure and clarity assessment
         * [Your point here]
         * [Your point here]
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing note:', error);
    throw new Error(`Error analyzing note: ${error instanceof Error ? error.message : String(error)}`);
  }
}