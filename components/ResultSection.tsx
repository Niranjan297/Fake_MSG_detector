
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, ExternalLink, ShieldCheck, AlertTriangle, FileSearch, HelpCircle, Globe } from 'lucide-react';
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
  const [showTips, setShowTips] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getVerdictStyles = () => {
    switch (result.verdict) {
      case Verdict.FAKE:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-700',
          icon: <XCircle className="w-10 h-10 text-red-500" />,
          label: 'Likely Fake or Scam',
          barColor: 'bg-red-500'
        };
      case Verdict.UNCERTAIN:
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-700',
          icon: <AlertCircle className="w-10 h-10 text-amber-500" />,
          label: 'Analysis Uncertain',
          barColor: 'bg-amber-500'
        };
      case Verdict.GENUINE:
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          text: 'text-emerald-700',
          icon: <CheckCircle className="w-10 h-10 text-emerald-500" />,
          label: 'Likely Genuine',
          barColor: 'bg-emerald-500'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-700',
          icon: <HelpCircle className="w-10 h-10 text-gray-500" />,
          label: 'Inconclusive',
          barColor: 'bg-gray-500'
        };
    }
  };

  const styles = getVerdictStyles();
  const gUrls = result.groundingUrls || [];

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8 pb-20">
      {/* Verdict Banner */}
      <div className={`p-8 rounded-3xl border-2 ${styles.bg} shadow-sm animate-scale-in`}>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-white/60 p-2 rounded-2xl shadow-sm animate-scale-in" style={{ animationDelay: '100ms' }}>
              {styles.icon}
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <h2 className={`text-3xl font-bold ${styles.text}`}>
                {styles.label}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500 font-medium text-sm sm:text-base">System Confidence</p>
                {gUrls.length > 0 && (
                  <span className="flex items-center gap-1 text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    <Globe className="w-3 h-3" /> Search Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="md:w-64 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">{result.confidence}%</span>
              <span className="text-sm text-gray-400">Score</span>
            </div>
            <div className="w-full bg-gray-200/50 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full ${styles.barColor} transition-all duration-1000 ease-out ${mounted ? 'progress-bar-animate' : ''}`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Grid - Staggered */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {result.explanations.map((exp, index) => {
          const IconComponent = IconMap[exp.icon] || HelpCircle;
          return (
            <div 
              key={exp.id} 
              className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${300 + (index * 80)}ms` }}
            >
              <div className="bg-indigo-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <IconComponent className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">{exp.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Claims Table */}
        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Analysis Breakdown</h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{result.claims.length} Claims</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Statement</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.claims.map((claim, idx) => (
                    <tr 
                      key={claim.id} 
                      className="hover:bg-gray-50/50 transition-colors animate-fade-in-up"
                      style={{ animationDelay: `${600 + (idx * 40)}ms` }}
                    >
                      <td className="px-6 py-5 text-gray-800 font-medium text-sm leading-relaxed">{claim.text}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase ${
                          claim.status === 'True' ? 'bg-emerald-100 text-emerald-700' :
                          claim.status === 'False' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Evidence & Risks */}
        <div className="space-y-6">
          <div className="animate-fade-in-up" style={{ animationDelay: '650ms' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Sources & Evidence
            </h3>
            <div className="space-y-3">
              {/* Google Grounding Results */}
              {gUrls.map((url, idx) => (
                <a
                  key={`g-${idx}`}
                  href={url.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 hover:border-indigo-300 group transition-all animate-fade-in-up"
                  style={{ animationDelay: `${750 + (idx * 70)}ms` }}
                >
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <Globe className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">{url.title}</h4>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase">Search Grounding</span>
                  </div>
                </a>
              ))}
              {/* Model-provided sources */}
              {result.sources.map((source, idx) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-300 group transition-all shadow-sm animate-fade-in-up"
                  style={{ animationDelay: `${800 + (idx * 70)}ms` }}
                >
                  <div className="bg-gray-50 p-1.5 rounded-lg">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">{source.title}</h4>
                    <span className={`text-[10px] font-bold uppercase ${source.reliability === 'Trusted' ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {source.reliability}
                    </span>
                  </div>
                </a>
              ))}
              {result.sources.length === 0 && gUrls.length === 0 && (
                <div className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                  <p className="text-xs text-gray-400 italic">No external verification links found.</p>
                </div>
              )}
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '850ms' }}>
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between p-5 bg-gray-900 text-white rounded-2xl shadow-lg hover:bg-black transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold">Risk Assessment</span>
              </div>
              {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${showTips ? 'max-h-96 mt-4' : 'max-h-0'}`}>
              <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <ul className="space-y-3">
                  {result.risks.map((risk, idx) => (
                    <li key={idx} className="flex gap-3 items-start animate-fade-in-up" style={{ animationDelay: `${40 * idx}ms` }}>
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <p className="text-gray-600 text-xs leading-relaxed font-medium">{risk}</p>
                    </li>
                  ))}
                  {result.risks.length === 0 && (
                    <li className="text-gray-400 text-xs text-center italic">No significant risks identified.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
