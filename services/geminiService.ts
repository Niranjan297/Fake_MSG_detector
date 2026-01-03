
import { GoogleGenAI, Type } from "@google/genai";
import { Verdict, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      description: "One of: FAKE, UNCERTAIN, GENUINE",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score from 0 to 100",
    },
    explanations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          icon: { type: Type.STRING, description: "Lucide icon name identifier (e.g. AlertTriangle, Search, Info, ShieldOff)" },
          title: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["id", "icon", "title", "description"]
      }
    },
    claims: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING },
          status: { type: Type.STRING, description: "One of: True, False, Misleading" }
        },
        required: ["id", "text", "status"]
      }
    },
    sources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          url: { type: Type.STRING },
          reliability: { type: Type.STRING, description: "One of: Trusted, Unknown" }
        },
        required: ["id", "title", "url", "reliability"]
      }
    },
    risks: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["verdict", "confidence", "explanations", "claims", "sources", "risks"]
};

export async function analyzeMessage(text: string): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following message for misinformation, scam potential, and factual accuracy.
    Provide a verdict, confidence score, detailed explanations, a breakdown of specific claims, evidence sources, and risks.
    
    Message: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA
    }
  });

  const data = JSON.parse(response.text || '{}');
  return data as AnalysisResult;
}
