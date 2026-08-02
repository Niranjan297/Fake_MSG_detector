import { GoogleGenAI } from "@google/genai";

// Initialize using GEMINI_API_KEY from environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Perform a VirusTotal-inspired deep analysis on the following TEXT:

      CONTENT/METADATA: "USPS: Your package has arrived at the transit center but could not be delivered due to an incomplete address. Please confirm your details within 24 hours to avoid it being returned to the sender: http://usps-redelivery-center-update.com/tracking/89123891"

      Return JSON matching: ${ANALYSIS_SCHEMA_PROMPT}`,
      config: {
        systemInstruction: "You are a hybrid security engineer and expert fact-checker. Combine technical digital forensics (File signatures, WHOIS, reputation, blacklists) with high-level misinformation analysis.",
        tools: [{ googleSearch: {} }]
      }
    });

    console.log("Success:", response.text);
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
  }
}

run();
