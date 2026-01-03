
import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import { analyzeMessage } from './services/geminiService';
import { AnalysisResult } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeMessage(input);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while analyzing the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-6xl">
        <Header />
        
        <main>
          <InputSection 
            input={input} 
            setInput={setInput} 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading} 
          />

          {error && (
            <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in zoom-in-95">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {isLoading && !result && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-700">Analyzing Content</h3>
              <p className="text-gray-500">Checking sources, logic, and patterns...</p>
            </div>
          )}

          {result && <ResultSection result={result} />}
        </main>
      </div>

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Misinformation & Scam Analyzer. This tool provides AI-based analysis and should not replace critical judgment.</p>
      </footer>
    </div>
  );
};

export default App;
