
import { GoogleGenAI } from "@google/genai";

const generateContent = async (prompt: string): Promise<string> => {
  // Determine API key based on environment:
  // 1. Try process.env.API_KEY (standard for build tools, also used by AI Studio after selection)
  // 2. Fallback to window.GEMINI_API_KEY (for static hosting like cPanel where key might be manually set in index.html)
  const apiKey = process.env.API_KEY || (window as any).GEMINI_API_KEY;

  if (!apiKey) {
      // If no API key is found, throw an error early.
      // The App.tsx `handleAiAction` will catch this and display appropriate message.
      throw new Error("API key for Google Gemini is not configured.");
  }

  // Per @google/genai guidelines, create a new instance right before the API call
  // to ensure it uses the most up-to-date API key from the selection dialog or global variable.
  const ai = new GoogleGenAI({ apiKey: apiKey }); // FIX: Corrected new new GoogleGenAI to new GoogleGenAI

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    // FIX: Per @google/genai guidelines, access the text output via the .text property.
    return response.text ?? "No response from AI.";
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Propagate the specific error message for better handling upstream.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Failed to get response from AI.");
  }
};

export const explainError = async (code: string, error: string): Promise<string> => {
  const prompt = `
    شما یک دستیار برنامه‌نویسی دلسوز برای یک دانش‌آموز ۱۵ ساله هستید که در حال یادگیری پایتون است.
    او کد زیر را اجرا کرده و با خطا مواجه شده.
    خطا را با زبانی بسیار ساده، غیرفنی و دلگرم‌کننده توضیح بده. توضیحات باید کوتاه باشد.
    یک راه حل واضح برای رفع مشکل پیشنهاد بده.
    
    کد این است:
    \`\`\`python
    ${code}
    \`\`\`
    
    پیغام خطا این است:
    \`\`\`
    ${error}
    \`\`\`
    
    توضیحات را به زبان فارسی و مناسب یک نوجوان ۱۵ ساله ارائه بده.
  `;
  return generateContent(prompt);
};