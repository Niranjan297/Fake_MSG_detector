
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Search, Bell, ArrowRight, CheckCircle2, Lock, Smartphone, Globe, Sparkles } from 'lucide-react';
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
        "A highly aesthetic, cinematic 3D render of a futuristic transparent shield protecting a glowing digital heart of data, soft blue and indigo lighting, depth of field, 8k resolution, minimalist tech style."
      );
      setHeroImage(img);
      setIsGenerating(false);
    }
    loadHero();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 font-bold text-sm tracking-wide">
            <Sparkles className="w-4 h-4" /> AI-POWERED PROTECTION
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
            Navigate the Digital World with <span className="text-indigo-600">Total Confidence.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
            Our intelligent analyzer strips away the noise, exposing scams and verifying truth in seconds. Don't just browse — browse protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onStart}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 transition-all active:scale-95 group"
            >
              Analyze a Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3 px-6 text-gray-400 font-medium">
              <Lock className="w-5 h-5" /> Privacy Focused
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-white">
            {isGenerating ? (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-gray-50">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-gray-400 animate-pulse">GENERATING HERO VISUAL...</p>
              </div>
            ) : heroImage ? (
              <img 
                src={heroImage} 
                alt="AI Protection Concept" 
                className="w-full h-full object-cover animate-in zoom-in-95 duration-1000"
              />
            ) : (
              <div className="w-full h-full bg-indigo-600 flex items-center justify-center">
                 <ShieldCheck className="w-24 h-24 text-white opacity-20" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">We use advanced Large Language Models and real-time Search Grounding to dissect claims.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Smartphone, title: "Input Content", desc: "Paste any suspicious text, news headline, or SMS message into our analyzer." },
            { icon: Search, title: "Deep Verification", desc: "Our AI scans the web, checks official sources, and cross-references data in real-time." },
            { icon: CheckCircle2, title: "Get the Verdict", desc: "Receive a clear 'Genuine' or 'Fake' rating with detailed reasoning and risk reports." }
          ].map((step, i) => (
            <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Life Impact */}
      <section className="bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">Essential for Your <span className="text-indigo-400">Daily Digital Life.</span></h2>
            <div className="space-y-6">
              {[
                { title: "Avoid Financial Fraud", desc: "Instantly spot fraudulent job offers, bank alerts, and gift card scams." },
                { title: "Stop the Spread", desc: "Verify viral WhatsApp or social media rumors before sharing them with family." },
                { title: "Understand News", desc: "Separate sensationalist clickbait from factual reporting using grounded evidence." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-6 h-6 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center p-8">
                <Smartphone className="w-full h-full text-indigo-300 opacity-30" />
              </div>
              <div className="aspect-video bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center p-8">
                <Globe className="w-full h-full text-indigo-300 opacity-30" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-video bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center p-8">
                <Bell className="w-full h-full text-indigo-300 opacity-30" />
              </div>
              <div className="aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center p-8">
                <ShieldCheck className="w-full h-full text-indigo-300 opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="text-center py-20 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to test a message?</h2>
        <button
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95"
        >
          Open Analyzer
        </button>
      </section>
    </div>
  );
};

export default HomePage;
