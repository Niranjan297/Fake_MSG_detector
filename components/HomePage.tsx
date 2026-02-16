
import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, Zap, Search, Bell, ArrowRight, CheckCircle2, 
  Lock, Smartphone, Globe, Sparkles, Activity, Database, 
  Terminal, ShieldAlert, Cpu, Share2
} from 'lucide-react';
import { generateHeroImage } from '../services/imageService';

interface HomePageProps {
  onStart: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    async function loadHero() {
      const img = await generateHeroImage(
        "A hyper-realistic 3D technical security hub dashboard, holographic shields, data stream lines, dark navy background with indigo glowing accents, forensic scanning interface, cinematic lighting, 8k resolution."
      );
      setHeroImage(img);
      setIsGenerating(false);
    }
    loadHero();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-32 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 font-bold text-xs tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Next-Gen Security Intelligence
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[0.95] tracking-tight">
            The World's <span className="text-indigo-600 italic">Smartest</span> Security Hub.
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-medium">
            Aggregating 60+ security engines and real-time AI forensics to verify URLs, domains, and content in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={onStart}
              className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 transition-all active:scale-95 group uppercase tracking-tight"
            >
              Start Deep Scan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3 px-6 text-gray-400 font-bold text-sm uppercase tracking-widest">
              <Terminal className="w-5 h-5" /> Enterprise Grade
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 rounded-[3rem] blur-3xl group-hover:blur-[4rem] transition-all duration-700 opacity-60" />
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-gray-950">
            {isGenerating ? (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-6 bg-gray-900">
                <div className="relative">
                   <div className="w-16 h-16 border-2 border-indigo-500/20 rounded-full animate-ping" />
                   <div className="absolute inset-0 w-16 h-16 border-t-4 border-indigo-500 rounded-full animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-indigo-400 tracking-[0.2em] uppercase mb-1">Initializing Visuals</p>
                  <p className="text-[10px] text-gray-500 font-mono">ENCRYPTING_SECURE_CHANNEL...</p>
                </div>
              </div>
            ) : heroImage ? (
              <>
                <img 
                  src={heroImage} 
                  alt="Security Interface" 
                  className="w-full h-full object-cover animate-in zoom-in-105 duration-[2000ms]"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Global Engine Status: Online</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">v4.0.2-ALPHA</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-indigo-600 flex items-center justify-center">
                 <ShieldAlert className="w-24 h-24 text-white opacity-20" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Showcase: Technical Forensics */}
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Technical Capabilities</h2>
            <p className="text-gray-500 max-w-xl font-medium">We don't just "guess". We analyze technical metadata, reputation history, and community signals to give you a definitive verdict.</p>
          </div>
          <div className="flex gap-2">
            <div className="h-1 w-12 bg-indigo-600 rounded-full" />
            <div className="h-1 w-4 bg-gray-200 rounded-full" />
            <div className="h-1 w-4 bg-gray-200 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Cpu, 
              title: "60+ Engines", 
              desc: "Consolidated scanning from top-tier security vendors and global fact-checking databases.",
              badge: "Aggregated"
            },
            { 
              icon: Database, 
              title: "Forensic WHOIS", 
              desc: "Deep dive into domain registration, server history, and registrar reputation scores.",
              badge: "Technical"
            },
            { 
              icon: Activity, 
              title: "Reputation Scoring", 
              desc: "A singular 0-100 score calculated via complex algorithms and historical data points.",
              badge: "Insight"
            },
            { 
              icon: Share2, 
              title: "Community Intelligence", 
              desc: "Leverage crowd-sourced votes and technical comments from thousands of security experts.",
              badge: "Social"
            }
          ].map((feat, i) => (
            <div 
              key={i} 
              className="group p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-100 transition-all hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 group-hover:text-indigo-600 transition-colors">{feat.badge}</span>
              </div>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <feat.icon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{feat.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scan Mockup Section */}
      <section className="bg-gray-900 rounded-[3rem] p-8 lg:p-24 text-white overflow-hidden relative border border-white/5 shadow-[0_0_80px_rgba(79,70,229,0.1)]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="w-12 h-1 w-20 bg-indigo-500 rounded-full mb-8" />
            <h2 className="text-4xl lg:text-5xl font-black leading-[1] tracking-tight uppercase">
              Real-Time <br /> <span className="text-indigo-400">Threat Intelligence.</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium max-w-md">
              TrustShield analyzes the hidden DNA of every message and link you receive, exposing malicious intent before it reaches you.
            </p>
            <ul className="space-y-4">
              {[
                "Phishing & Typosquatting Detection",
                "Malicious Content Pattern Recognition",
                "Real-time Google Search Verification",
                "Historical Domain Reputation Checks"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold tracking-tight text-gray-300">
                  <div className="w-5 h-5 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
               </div>
               <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-black">Live Forensics</span>
            </div>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex gap-4">
                <span className="text-emerald-400">[OK]</span>
                <span className="text-gray-500 italic">Connecting to Global Security Nodes...</span>
              </div>
              <div className="flex gap-4">
                <span className="text-indigo-400">[INFO]</span>
                <span className="text-gray-300">Resolving Domain: suspicious-link.tech</span>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-400">[WARN]</span>
                <span className="text-gray-300 italic">Short-lived domain detected (Age: 2 days)</span>
              </div>
              <div className="flex gap-4">
                <span className="text-red-400">[CRIT]</span>
                <span className="text-white font-bold uppercase tracking-widest bg-red-500/20 px-1">Pattern Match: Known Banking Phish</span>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <div className="h-1 bg-gray-800 rounded-full flex-1 mr-4 overflow-hidden">
                   <div className="h-full bg-indigo-500 w-3/4 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-indigo-400">75% COMPLETE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="text-center py-20 animate-fade-in-up">
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">Ready for total digital clarity?</h2>
        <p className="text-gray-500 mb-10 font-medium">Free, fast, and technically robust. Start your first scan today.</p>
        <button
          onClick={onStart}
          className="bg-indigo-600 hover:bg-gray-900 text-white px-14 py-6 rounded-[2.5rem] font-black text-xl transition-all shadow-2xl shadow-indigo-100 hover:-translate-y-1 active:scale-95 uppercase tracking-tighter"
        >
          Open Security Hub
        </button>
      </section>
    </div>
  );
};

export default HomePage;
