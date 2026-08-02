import { GoogleGenAI } from "@google/genai";

// Initialize using named parameters and direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateHeroImage(prompt: string): Promise<string | null> {
  try {
    // For gemini-2.5-flash-image, use generateContent
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        },
      },
    });

    // Iterate through response parts to locate the generated image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
}
