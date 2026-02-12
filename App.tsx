
import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import HomePage from './components/HomePage';
import { analyzeMessage } from './services/geminiService';
import { AnalysisResult } from './types';
import { AlertCircle, ArrowLeft } from 'lucide-react';

type View = 'home' | 'analyzer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
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

  const goToHome = () => {
    setView('home');
    setResult(null);
    setInput('');
  };

  const goToAnalyzer = () => {
    setView('analyzer');
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {view === 'home' ? (
        <main className="w-full">
          <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={goToHome}
            >
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <div className="w-5 h-5 border-2 border-white rounded-sm flex items-center justify-center">
                  <span className="text-[8px] font-black text-white">AI</span>
                </div>
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900 uppercase">TrustShield</span>
            </div>
            <button 
              onClick={goToAnalyzer}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Analyzer Tool
            </button>
          </div>
          <HomePage onStart={goToAnalyzer} />
        </main>
      ) : (
        <div className="w-full max-w-6xl px-4 sm:px-6 animate-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-4 py-8">
            <button 
              onClick={goToHome}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" />
            </button>
            <Header />
          </div>
          
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
      )}

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm border-t border-gray-100 w-full bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} TrustShield AI. This tool provides AI-based analysis and should not replace critical human judgment.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
