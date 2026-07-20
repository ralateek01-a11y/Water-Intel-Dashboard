import React from 'react';
import { Construction } from 'lucide-react';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="w-14 h-14 rounded-2xl bg-[#111827] border border-[#1F2937] flex items-center justify-center">
        <Construction className="w-6 h-6 text-[#6B7280]" />
      </div>
      <div>
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <p className="text-[#6B7280] text-sm mt-1">This section is coming soon.</p>
      </div>
    </div>
  );
}
