
import { GoogleGenAI, Type } from "@google/genai";
import { Verdict, AnalysisResult, InputType } from "../types";

// Always initialize with direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA_PROMPT = `
{
  "inputType": "TEXT | URL | DOMAIN | FILE",
  "verdict": "FAKE | UNCERTAIN | GENUINE",
  "confidence": number (0-100),
  "reputationScore": number (0-100),
  "communityVotes": { "positive": number, "negative": number },
  "explanations": [
    { "id": "string", "icon": "AlertTriangle|Search|Info|ShieldOff|CheckCircle", "title": "string", "description": "string" }
  ],
  "claims": [
    { "id": "string", "text": "string", "status": "True|False|Misleading" }
  ],
  "detections": [
    { "name": "string", "status": "Clean|Malicious|Suspicious", "method": "string" }
  ],
  "sources": [
    { "id": "string", "title": "string", "url": "string", "reliability": "Trusted|Unknown" }
  ],
  "technicalDetails": {
    "whois": "string",
    "creationDate": "string",
    "registrar": "string",
    "hostingProvider": "string"
  },
  "risks": ["string"]
}
`;

export async function analyzeContent(content: string, type: InputType): Promise<AnalysisResult> {
  // Use ai.models.generateContent with the appropriate model name
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Perform a VirusTotal-inspired deep analysis on the following ${type}:

    CONTENT: "${content}"

    TASK:
    1. If URL/DOMAIN: Perform a technical reputation check. Look for WHOIS data, age of domain, and presence in blacklists or security reports.
    2. If TEXT: Analyze for misinformation, scams, and logical fallacies.
    3. SIMULATE MULTI-ENGINE SCAN: Provide a 'detections' array simulating how 5-10 different security/fact-check engines (e.g., Google Safe Browsing, Snopes, PolitiFact, VirusTotal reputation) would rate this.
    4. CORE CLAIMS: Extract key assertions.
    5. VERDICT: Decide if it is GENUINE, FAKE, or UNCERTAIN.
    6. REPUTATION: Assign a 0-100 score (100 is perfectly safe/trusted).

    CRITICAL: For URLs/Domains, explicitly look for phishing patterns (typosquatting, suspicious TLDs).

    Return JSON matching: ${ANALYSIS_SCHEMA_PROMPT}`,
    config: {
      systemInstruction: "You are a hybrid security engineer and expert fact-checker. Combine technical digital forensics (WHOIS, reputation, blacklists) with high-level misinformation analysis.",
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
    }
  });

  let data: any = {};
  // Access .text property directly (not as a method)
  const responseText = response.text || "";
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    data = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
  } catch (e) {
    console.error("JSON Parse Error", e);
    throw new Error("Detailed analysis failed.");
  }

  // Extract grounding URLs from Google Search grounding results
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const groundingUrls: {uri: string, title: string}[] = [];
  if (groundingChunks) {
    groundingChunks.forEach((chunk: any) => {
      if (chunk.web?.uri) {
        groundingUrls.push({ uri: chunk.web.uri, title: chunk.web.title || 'Source' });
      }
    });
  }

  return { ...data, groundingUrls };
}
