
export enum Verdict {
  FAKE = 'FAKE',
  UNCERTAIN = 'UNCERTAIN',
  GENUINE = 'GENUINE'
}

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

export interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  explanations: Explanation[];
  claims: Claim[];
  sources: Source[];
  risks: string[];
}
