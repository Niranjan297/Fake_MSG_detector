
import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, 
  ExternalLink, ShieldCheck, AlertTriangle, FileSearch, 
  HelpCircle, Globe, ThumbsUp, ThumbsDown, Activity, 
  Database, Info, Clock, User
} from 'lucide-react';
import { Verdict, AnalysisResult } from '../types';

const IconMap: Record<string, any> = {
  AlertTriangle,
  Search: FileSearch,
  Info: HelpCircle,
  ShieldOff: AlertCircle,
  ShieldCheck,
  FileSearch,
  CheckCircle,
  XCircle,
  Globe
};

interface ResultSectionProps {
  result: AnalysisResult;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'DETECTIONS' | 'DETAILS' | 'COMMUNITY'>('DETECTIONS');

  useEffect(() => {
    setMounted(true);
  }, []);

  const getVerdictStyles = () => {
    const maliciousCount = result.detections.filter(d => d.status === 'Malicious' || d.status === 'Suspicious').length;
    const totalDetections = result.detections.length;
    
    if (result.verdict === Verdict.FAKE || (totalDetections > 0 && maliciousCount > 0)) {
      return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-700',
        icon: <XCircle className="w-12 h-12 text-red-500" />,
        label: `${maliciousCount}/${totalDetections} engines detected this as malicious`,
        barColor: 'bg-red-500'
      };
    }
    if (result.verdict === Verdict.UNCERTAIN) {
      return {
        bg: 'bg-amber-50 border-amber-200',
        text: 'text-amber-700',
        icon: <AlertCircle className="w-12 h-12 text-amber-500" />,
        label: 'Analysis Uncertain / Mixed Ratings',
        barColor: 'bg-amber-500'
      };
    }
    return {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      icon: <CheckCircle className="w-12 h-12 text-emerald-500" />,
      label: 'No security vendors flagged this as malicious',
      barColor: 'bg-emerald-500'
    };
  };

  const styles = getVerdictStyles();

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* VirusTotal Header Grid */}
      <div className={`p-8 rounded-[2rem] border-2 ${styles.bg} shadow-sm grid md:grid-cols-12 gap-8 items-center`}>
        <div className="md:col-span-1 flex justify-center">
          <div className="bg-white/60 p-3 rounded-2xl shadow-sm animate-scale-in">
            {styles.icon}
          </div>
        </div>
        
        <div className="md:col-span-7 space-y-1">
          <h2 className={`text-2xl font-black ${styles.text} uppercase tracking-tight`}>
            {styles.label}
          </h2>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> Score: {result.reputationScore}/100</span>
            <span className="flex items-center gap-1.5"><Database className="w-4 h-4" /> Type: {result.inputType}</span>
          </div>
        </div>

        <div className="md:col-span-4 flex justify-end items-center gap-6">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <button className="p-2 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-colors"><ThumbsUp className="w-5 h-5" /></button>
              <span className="font-bold text-gray-700">{result.communityVotes.positive}</span>
              <button className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"><ThumbsDown className="w-5 h-5" /></button>
              <span className="font-bold text-gray-700">{result.communityVotes.negative}</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Community Rating</p>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden md:block" />
          <div className="w-20 h-20 relative flex items-center justify-center">
             <svg className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" fill="transparent" stroke="#e5e7eb" strokeWidth="8" />
                <circle 
                  cx="40" cy="40" r="32" fill="transparent" stroke={result.verdict === Verdict.GENUINE ? '#10b981' : '#ef4444'} 
                  strokeWidth="8" strokeDasharray={`${result.reputationScore * 2}, 200`}
                  className="transition-all duration-1000 ease-out"
                />
             </svg>
             <span className="absolute font-black text-lg">{result.reputationScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 px-8">
          {['DETECTIONS', 'DETAILS', 'COMMUNITY'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 font-bold text-xs uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-6 right-6 h-1 bg-indigo-600 rounded-t-full" />}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'DETECTIONS' && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {result.detections.map((engine, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors rounded-lg group animate-fade-in-up"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${engine.status === 'Clean' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    <span className="font-bold text-gray-700 text-sm">{engine.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-400 font-medium italic group-hover:text-gray-500">{engine.method}</span>
                    <span className={`text-xs font-bold ${engine.status === 'Clean' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {engine.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'DETAILS' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 font-bold text-gray-900 border-b pb-2"><Info className="w-4 h-4 text-indigo-500" /> Basic Information</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-400 font-medium">Verdict</span>
                      <span className="font-bold text-gray-700">{result.verdict}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-400 font-medium">Confidence Level</span>
                      <span className="font-bold text-gray-700">{result.confidence}%</span>
                    </div>
                    {result.technicalDetails?.creationDate && (
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-400 font-medium">First Seen/Creation</span>
                        <span className="font-bold text-gray-700">{result.technicalDetails.creationDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 font-bold text-gray-900 border-b pb-2"><Database className="w-4 h-4 text-indigo-500" /> Technical Details</h4>
                  <div className="bg-gray-50 p-4 rounded-xl font-mono text-xs text-gray-600 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {result.technicalDetails?.whois || "No additional technical metadata available."}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-gray-900 border-b pb-2"><ShieldCheck className="w-4 h-4 text-indigo-500" /> Key Security Claims</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {result.claims.map((claim, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                       <p className="text-xs font-bold text-gray-700 mb-2">{claim.text}</p>
                       <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                         claim.status === 'True' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                       }`}>{claim.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'COMMUNITY' && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
              <div className="bg-gray-100 p-6 rounded-full">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Community Discussion</h4>
              <p className="text-gray-500 max-w-sm">There are no comments for this content yet. Be the first to provide feedback on this analysis.</p>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">Write a Comment</button>
            </div>
          )}
        </div>
      </div>

      {/* Grounding & Verification Sources (Add-on) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" /> Search Grounding Results
          </h3>
          <div className="space-y-3">
             {result.groundingUrls?.map((url, i) => (
               <a key={i} href={url.uri} target="_blank" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-all group">
                 <div className="min-w-0 flex-1 mr-4">
                   <p className="text-sm font-bold text-gray-800 truncate">{url.title}</p>
                   <p className="text-[10px] text-gray-400 truncate">{url.uri}</p>
                 </div>
                 <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
               </a>
             ))}
             {(!result.groundingUrls || result.groundingUrls.length === 0) && (
               <p className="text-sm text-gray-400 italic">No search grounding links found.</p>
             )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
           <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
             <AlertTriangle className="w-5 h-5 text-red-500" /> Risk Assessment
           </h3>
           <div className="space-y-3">
             {result.risks.map((risk, i) => (
               <div key={i} className="flex gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-100/50">
                 <div className="w-2 h-2 mt-2 rounded-full bg-red-400 flex-shrink-0" />
                 <p className="text-sm text-gray-700 font-medium">{risk}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
