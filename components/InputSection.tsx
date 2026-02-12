
import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputSectionProps {
  input: string;
  setInput: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const EXAMPLES = [
  { label: "Real News", text: "SpaceX successfully launched its latest Starlink satellites from Cape Canaveral today, aiming to expand global high-speed internet coverage." },
  { label: "Scam Offer", text: "Urgent! You have been selected for a part-time remote job at Amazon. Salary $300/day. Contact HR via WhatsApp at +1-234-567-890 to start immediately." },
  { label: "WhatsApp Viral", text: "Forwarded many times: NASA just confirmed a massive solar flare will hit Earth tomorrow, stay indoors! Share with everyone you love." }
];

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, onAnalyze, isLoading }) => {
  return (
    <section className="max-w-3xl mx-auto w-full mb-12">
      <div className="relative group bg-white rounded-3xl shadow-sm border border-gray-200 transition-all focus-within:ring-4 focus-within:ring-indigo-100 focus-within:border-indigo-400">
        <textarea
          className="w-full h-44 p-8 rounded-3xl resize-none outline-none text-gray-700 text-lg leading-relaxed bg-transparent"
          placeholder="Paste any message, news, or online claim here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute bottom-6 right-6">
          <button
            onClick={onAnalyze}
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 active:scale-95 flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Verify Content
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
        <span className="text-sm font-bold text-gray-400 mr-2 uppercase tracking-widest">Test Samples:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => setInput(ex.text)}
            className="px-5 py-2.5 bg-white border border-gray-200 text-sm font-bold text-gray-600 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default InputSection;
