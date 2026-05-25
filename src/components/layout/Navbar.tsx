'use client';

import { Search, Plus, FolderPlus, PanelLeft } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="h-14 border-b border-[#222222] bg-[#0a0a0a] flex items-center gap-3 px-4 shrink-0">
      <button
        onClick={onToggleSidebar}
        className="text-[#555555] hover:text-[#888888] transition-colors p-1 rounded"
        title="Toggle sidebar"
      >
        <PanelLeft size={18} />
      </button>

      <div className="flex-1 max-w-md relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-[#161616] border border-[#222222] rounded-md pl-8 pr-14 py-1.5 text-sm text-[#e0e0e0] placeholder-[#444444] focus:outline-none focus:border-[#3b82f6] transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#444444] font-mono pointer-events-none">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#888888] border border-[#282828] rounded-md hover:bg-[#1a1a1a] hover:text-[#d0d0d0] transition-colors">
          <FolderPlus size={14} />
          <span>New Collection</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-[#3b82f6] rounded-md hover:bg-[#2563eb] transition-colors font-medium">
          <Plus size={14} />
          <span>New Item</span>
        </button>
      </div>
    </header>
  );
}
