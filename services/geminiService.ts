
import { GoogleGenAI, Type } from "@google/genai";
import { Verdict, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA_PROMPT = `
{
  "verdict": "FAKE | UNCERTAIN | GENUINE",
  "confidence": number (0-100),
  "explanations": [
    { "id": "string", "icon": "AlertTriangle|Search|Info|ShieldOff|CheckCircle", "title": "string", "description": "string" }
  ],
  "claims": [
    { "id": "string", "text": "string", "status": "True|False|Misleading" }
  ],
  "sources": [
    { "id": "string", "title": "string", "url": "string", "reliability": "Trusted|Unknown" }
  ],
  "risks": ["string"]
}
`;

export async function analyzeMessage(text: string): Promise<AnalysisResult> {
  // We use gemini-3-flash-preview for balanced speed and reasoning.
  // Google Search is crucial for verifying real-time facts.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this message objectively for truthfulness and potential scam elements. 

    CRITICAL INSTRUCTION:
    Separate 'Style' from 'Substance'. Some legitimate news or official alerts use sensationalist, urgent, or 'clickbait' language to get attention. Do NOT flag a message as FAKE just because it sounds sensational if the core facts are verifiable and true. 
    
    1. Identify the core factual claims.
    2. Use Google Search to verify these claims against multiple reputable sources.
    3. Check for specific red flags like suspicious URLs (mismatched domains), requests for sensitive data, or financial scams.
    4. If the claims are supported by major news outlets or official government/scientific bodies, the verdict must be GENUINE, even if the tone is urgent.

    Message to analyze: "${text}"
    
    Return your analysis strictly as a JSON object matching this structure: ${ANALYSIS_SCHEMA_PROMPT}`,
    config: {
      systemInstruction: `You are an elite, neutral fact-checker and digital forensics expert. 
      Your priority is Factual Accuracy above all else. 
      
      Guidelines:
      - TRUTH OVER TONE: Legitimate breaking news often uses high-intensity language. If search confirms the event, it is GENUINE.
      - EVIDENCE-BASED: Do not assume a message is a scam based on formatting (like all caps or emojis) if the underlying facts are corroborated by trusted sources.
      - SCAM DETECTION: Focus on malicious intent—phishing links, fraudulent financial requests, and known viral hoaxes.
      - CLEAR REASONING: In your explanations, clearly state why the message is considered genuine or fake, citing specific evidence or lack thereof.`,
      tools: [{ googleSearch: {} }],
    }
  });

  let data: any = {};
  const responseText = response.text || "";
  
  try {
    // Attempt to extract JSON from markdown if necessary
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    data = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
  } catch (e) {
    console.error("Failed to parse AI response as JSON", e);
    throw new Error("Analysis failed. The model returned an invalid format.");
  }

  // Extract grounding URLs from metadata for transparency
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const groundingUrls: {uri: string, title: string}[] = [];
  if (groundingChunks) {
    groundingChunks.forEach((chunk: any) => {
      if (chunk.web?.uri) {
        groundingUrls.push({
          uri: chunk.web.uri,
          title: chunk.web.title || 'Verified Source'
        });
      }
    });
  }

  return { ...data, groundingUrls };
}
