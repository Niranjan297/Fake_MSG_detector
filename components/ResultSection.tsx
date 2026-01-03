
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, ExternalLink, ShieldCheck, AlertTriangle, FileSearch, HelpCircle } from 'lucide-react';
import { Verdict, AnalysisResult } from '../types';

const IconMap: Record<string, any> = {
  AlertTriangle,
  Search: FileSearch,
  Info: HelpCircle,
  ShieldOff: AlertCircle,
  ShieldCheck,
  FileSearch,
  CheckCircle,
  XCircle
};

interface ResultSectionProps {
  result: AnalysisResult;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  const [showTips, setShowTips] = React.useState(false);

  const getVerdictStyles = () => {
    switch (result.verdict) {
      case Verdict.FAKE:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-700',
          icon: <XCircle className="w-10 h-10 text-red-500" />,
          label: 'Likely Fake',
          barColor: 'bg-red-500'
        };
      case Verdict.UNCERTAIN:
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-700',
          icon: <AlertCircle className="w-10 h-10 text-amber-500" />,
          label: 'Uncertain',
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
    }
  };

  const styles = getVerdictStyles();

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Verdict Banner */}
      <div className={`p-8 rounded-3xl border-2 ${styles.bg} shadow-sm`}>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            {styles.icon}
            <div>
              <h2 className={`text-3xl font-bold ${styles.text}`}>
                {styles.label}
              </h2>
              <p className="text-gray-500 mt-1 font-medium">Confidence in analysis</p>
            </div>
          </div>
          <div className="md:w-64">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">{result.confidence}%</span>
              <span className="text-sm text-gray-400">Score</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${styles.barColor} transition-all duration-1000 ease-out`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {result.explanations.map((exp) => {
          const IconComponent = IconMap[exp.icon] || Info;
          return (
            <div key={exp.id} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <IconComponent className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
            </div>
          );
        })}
      </div>

      {/* Claim Breakdown Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900">Claim Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Claim</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-gray-800 font-medium">{claim.text}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
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

      {/* Evidence Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Evidence & References</h3>
          <div className="space-y-3">
            {result.sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-300 group transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <ExternalLink className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{source.title}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      source.reliability === 'Trusted' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {source.reliability}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 hidden sm:block truncate max-w-xs">{source.url}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Awareness Tip (Collapsible) */}
        <div>
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full flex items-center justify-between p-6 bg-indigo-600 text-white rounded-3xl shadow-lg hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-bold text-lg">Why messages like this are risky</span>
            </div>
            {showTips ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showTips ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <div className="p-6 bg-white border border-indigo-100 rounded-3xl space-y-4">
              <ul className="space-y-4">
                {result.risks.map((risk, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{risk}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ className }: { className?: string }) => <HelpCircle className={className} />;

export default ResultSection;
