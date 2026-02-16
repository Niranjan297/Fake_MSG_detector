
export enum Verdict {
  FAKE = 'FAKE',
  UNCERTAIN = 'UNCERTAIN',
  GENUINE = 'GENUINE'
}

export type InputType = 'TEXT' | 'URL' | 'DOMAIN' | 'FILE';

export interface Explanation {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Claim {
  id: string;
  text: string;
  status: 'True' | 'False' | 'Misleading';
}

export interface Source {
  id: string;
  title: string;
  url: string;
  reliability: 'Trusted' | 'Unknown';
}

export interface DetectionEngine {
  name: string;
  status: 'Clean' | 'Malicious' | 'Suspicious' | 'Unrated';
  method: string;
}

export interface TechnicalDetails {
  whois?: string;
  creationDate?: string;
  registrar?: string;
  hostingProvider?: string;
  securityHeaders?: string[];
}

export interface AnalysisResult {
  inputType: InputType;
  verdict: Verdict;
  confidence: number;
  reputationScore: number; // 0-100
  communityVotes: { positive: number; negative: number };
  explanations: Explanation[];
  claims: Claim[];
  sources: Source[];
  risks: string[];
  detections: DetectionEngine[];
  technicalDetails?: TechnicalDetails;
  groundingUrls?: {uri: string, title: string}[];
}
