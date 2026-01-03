
import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputSectionProps {
  input: string;
  setInput: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const EXAMPLES = [
  { label: "WhatsApp forward", text: "Forwarded many times: NASA just confirmed a massive solar flare will hit Earth tomorrow, stay indoors! Share with everyone you love." },
  { label: "Job offer message", text: "Urgent! You have been selected for a part-time remote job at Amazon. Salary $300/day. Contact HR via WhatsApp at +1-234-567-890 to start immediately." },
  { label: "Breaking news claim", text: "The World Health Organization has officially declared that eating ginger root cured 95% of early stage cases in the latest study." }
];

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, onAnalyze, isLoading }) => {
  return (
    <section className="max-w-3xl mx-auto w-full mb-12">
      <div className="relative group bg-white rounded-2xl shadow-sm border border-gray-200 transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
        <textarea
          className="w-full h-40 p-6 rounded-2xl resize-none outline-none text-gray-700 text-lg"
          placeholder="Paste any message, news, or online claim here (WhatsApp, SMS, email, social media)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onAnalyze}
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Analyze Message
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
        <span className="text-sm text-gray-400 mr-2">Try an example:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            onClick={() => setInput(ex.text)}
            className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default InputSection;
