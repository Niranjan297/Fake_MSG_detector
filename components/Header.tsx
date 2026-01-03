
import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-12 text-center">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <ShieldAlert className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        Misinformation & Scam Analyzer
      </h1>
      <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
        Understand if a message is trustworthy — with clear, AI-driven reasoning and evidence.
      </p>
    </header>
  );
};

export default Header;
