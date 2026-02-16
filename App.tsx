
import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import HomePage from './components/HomePage';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult, InputType } from './types';
import { AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

type View = 'home' | 'analyzer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (type: InputType) => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeContent(input, type);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during analysis. Our scanning engines might be busy. Please try again.');
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
    <div className="min-h-screen flex flex-col items-center bg-[#f9fafb]">
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
        <div className="w-full max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-4 py-8 animate-fade-in-up">
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
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-indigo-100 rounded-full" />
                  <div className="w-24 h-24 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0" />
                  {/* Fixed reference to ShieldCheck by adding the import above */}
                  <ShieldCheck className="w-10 h-10 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Multi-Engine Scan in Progress</h3>
                  <p className="text-gray-500 max-w-xs mx-auto text-sm">Aggregating data from security vendors and fact-checking sources...</p>
                </div>
              </div>
            )}

            {result && <ResultSection result={result} />}
          </main>
        </div>
      )}

      <footer className="mt-auto py-8 text-center text-gray-400 text-[11px] font-bold uppercase tracking-widest border-t border-gray-100 w-full bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} TrustShield AI / Security Hub. All analysis is advisory.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
