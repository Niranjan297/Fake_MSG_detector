
import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, File as FileIcon, Link as LinkIcon, Search, AlignLeft, Upload, AlertCircle, X, FileText } from 'lucide-react';
import { InputType } from '../types';

interface InputSectionProps {
  input: string;
  setInput: (val: string) => void;
  onAnalyze: (type: InputType, file?: File) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<InputType>('TEXT');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'FILE', icon: FileIcon, label: 'FILE' },
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
      case 'FILE': return "Select a file to analyze for threats...";
      case 'URL': return "Paste a URL to scan for phishing or malware (e.g., https://...)";
      case 'DOMAIN': return "Enter a domain or IP address to check reputation...";
      default: return "Paste any message, news, or online claim here...";
    }
  };

  const isButtonDisabled = () => {
    if (isLoading) return true;
    if (activeTab === 'FILE') return !selectedFile;
    if (!input.trim()) return true;
    if (activeTab === 'URL' && !!urlError) return true;
    return false;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
                setSelectedFile(null);
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

      <div 
        className={`relative group bg-white rounded-3xl shadow-sm border transition-all focus-within:ring-4 focus-within:ring-indigo-100 overflow-hidden ${urlError ? 'border-red-300' : 'border-gray-200 focus-within:border-indigo-400'} ${isDragging ? 'border-indigo-600 bg-indigo-50/30' : ''}`}
        onDragOver={activeTab === 'FILE' ? handleDragOver : undefined}
        onDragLeave={activeTab === 'FILE' ? handleDragLeave : undefined}
        onDrop={activeTab === 'FILE' ? handleDrop : undefined}
      >
        {activeTab === 'FILE' ? (
          <div 
            className="w-full h-44 flex flex-col items-center justify-center cursor-pointer p-8 text-center"
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect} 
            />
            {!selectedFile ? (
              <>
                <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center transition-all ${isDragging ? 'bg-indigo-600 text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Choose a file or drag and drop</h3>
                <p className="text-sm text-gray-400 mt-1 font-medium italic">Supports any file for technical metadata analysis</p>
              </>
            ) : (
              <div className="flex flex-col items-center animate-scale-in">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 flex items-center justify-center relative group/file">
                  <FileText className="w-8 h-8" />
                  <button 
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover/file:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-800 max-w-xs truncate">{selectedFile.name}</h3>
                <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-tighter">
                  {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type || 'Unknown Type'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <textarea
            className="w-full h-44 p-8 rounded-3xl resize-none outline-none text-gray-700 text-lg leading-relaxed bg-transparent"
            placeholder={getPlaceholder()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
        
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
          {urlError && (
            <div className="hidden md:flex items-center gap-2 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-right-2">
              <AlertCircle className="w-4 h-4" />
              {urlError}
            </div>
          )}
          <button
            onClick={() => onAnalyze(activeTab, selectedFile || undefined)}
            disabled={isButtonDisabled()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {activeTab === 'FILE' ? 'Analyze File' : (activeTab === 'URL' || activeTab === 'DOMAIN' ? 'Scan Now' : 'Analyze Content')}
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
