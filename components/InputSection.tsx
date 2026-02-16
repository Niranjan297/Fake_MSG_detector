
import React, { useState, useEffect } from 'react';
import { Send, Loader2, File, Link as LinkIcon, Search, AlignLeft, Upload, AlertCircle } from 'lucide-react';
import { InputType } from '../types';

interface InputSectionProps {
  input: string;
  setInput: (val: string) => void;
  onAnalyze: (type: InputType) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<InputType>('TEXT');
  const [urlError, setUrlError] = useState<string | null>(null);

  const tabs = [
    { id: 'FILE', icon: File, label: 'FILE' },
    { id: 'URL', icon: LinkIcon, label: 'URL' },
    { id: 'TEXT', icon: AlignLeft, label: 'TEXT' },
    { id: 'DOMAIN', icon: Search, label: 'SEARCH' },
  ];

  const validateUrl = (url: string) => {
    if (!url.trim()) return null;
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  };

  useEffect(() => {
    if (activeTab === 'URL' && input.trim()) {
      if (!validateUrl(input)) {
        setUrlError("Please enter a valid URL format (e.g., https://example.com)");
      } else {
        setUrlError(null);
      }
    } else {
      setUrlError(null);
    }
  }, [input, activeTab]);

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'FILE': return "Enter a file hash (SHA-256) or technical filename...";
      case 'URL': return "Paste a URL to scan for phishing or malware (e.g., https://...)";
      case 'DOMAIN': return "Enter a domain or IP address to check reputation...";
      default: return "Paste any message, news, or online claim here...";
    }
  };

  const isButtonDisabled = () => {
    if (isLoading || !input.trim()) return true;
    if (activeTab === 'URL' && !!urlError) return true;
    return false;
  };

  return (
    <section className="max-w-4xl mx-auto w-full mb-12 animate-fade-in-up">
      {/* VirusTotal Style Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-gray-100 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as InputType);
                setInput('');
                setUrlError(null);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`relative group bg-white rounded-3xl shadow-sm border transition-all focus-within:ring-4 focus-within:ring-indigo-100 overflow-hidden ${urlError ? 'border-red-300' : 'border-gray-200 focus-within:border-indigo-400'}`}>
        {activeTab === 'FILE' && (
          <div className="absolute inset-0 z-10 bg-gray-50/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
             <Upload className="w-12 h-12 text-gray-300 mb-2" />
             <p className="text-gray-400 text-sm font-medium">Drag and drop file here (Simulated)</p>
          </div>
        )}
        
        <textarea
          className="w-full h-44 p-8 rounded-3xl resize-none outline-none text-gray-700 text-lg leading-relaxed bg-transparent"
          placeholder={getPlaceholder()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
          {urlError && (
            <div className="hidden md:flex items-center gap-2 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-right-2">
              <AlertCircle className="w-4 h-4" />
              {urlError}
            </div>
          )}
          <button
            onClick={() => onAnalyze(activeTab)}
            disabled={isButtonDisabled()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {activeTab === 'URL' || activeTab === 'DOMAIN' ? 'Scan Now' : 'Analyze Content'}
          </button>
        </div>
      </div>

      {urlError && (
        <div className="md:hidden mt-3 flex items-center gap-2 text-red-500 text-xs font-bold px-4">
          <AlertCircle className="w-4 h-4" />
          {urlError}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400 font-medium max-w-xl mx-auto">
          By submitting content above, you agree to our Terms of Service and Privacy Policy. TrustShield uses community and technical engines to verify your input.
        </p>
      </div>
    </section>
  );
};

export default InputSection;
