
import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
        <ShieldAlert className="w-8 h-8 text-indigo-600" />
        Content Analyzer
      </h1>
      <p className="text-gray-500 font-medium">
        Input any message to verify its authenticity with AI.
      </p>
    </div>
  );
};

export default Header;
