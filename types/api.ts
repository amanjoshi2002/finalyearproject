export interface ApiResponse {
  verdict: 'true' | 'false' | 'partially-true';
  explanation: string;
  summary: string;
  evidence: string[];
  source: string;
  timestamp: number;
  checkedText: string;
  claim: string;
  date: string;
}

export interface FactCheck {
  id: string;
  verdict: 'true' | 'false' | 'partially-true';  // Using the strict type union
  explanation: string;
  summary: string;
  evidence: string[];
  source: string;
  timestamp: number;
  checkedText: string;
  claim: string;
  date: string;
}

export interface FactCheck {
  id: string;
  timestamp: number;
  checkedText: string;
  claim: string;
  date: string;
  verdict: 'true' | 'false' | 'partially-true';
  summary: string;
  evidence: string[];
  source: string;
}