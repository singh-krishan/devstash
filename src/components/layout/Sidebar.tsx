'use client';

import { useState } from 'react';
import {
  Code2, Sparkles, Terminal, FileText, File, Image as ImageIcon, Link,
  Star, ChevronDown, ChevronRight, Settings,
} from 'lucide-react';
import { mockItemTypes, mockCollections, mockUser, mockTypeCounts } from '@/lib/mock-data';

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  'file-text': FileText,
  file: File,
  image: ImageIcon,
  link: Link,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTypeId: string | null;
  onTypeSelect: (typeId: string | null) => void;
}

export default function Sidebar({ isOpen, onClose, activeTypeId, onTypeSelect }: SidebarProps) {
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = mockCollections.filter(c => c.isFavorite);
  const otherCollections = mockCollections.filter(c => !c.isFavorite);

  const userInitials = mockUser.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-30 w-64 flex flex-col
          md:static md:z-auto transition-transform duration-200 md:transition-none
          bg-[#111111] border-r border-[#222222]
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-[#222222] shrink-0">
          <div className="w-7 h-7 bg-[#3b82f6] rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0">
            D
          </div>
          <span className="font-semibold text-[#f0f0f0]">DevStash</span>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto py-3">
          {/* Types */}
          <div className="mb-2">
            <div className="flex items-center justify-between px-4 pb-1.5">
              <span className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider">Types</span>
              <ChevronDown size={12} className="text-[#444444]" />
            </div>
            {mockItemTypes.map(type => {
              const Icon = TYPE_ICON_MAP[type.icon] ?? File;
              const isActive = activeTypeId === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => onTypeSelect(isActive ? null : type.id)}
                  className={`w-full flex items-center gap-3 px-4 py-1.5 transition-colors ${
                    isActive
                      ? 'bg-[#1e1e1e] text-[#d0d0d0]'
                      : 'text-[#777777] hover:bg-[#1c1c1c] hover:text-[#d0d0d0]'
                  }`}
                >
                  <Icon size={14} style={{ color: type.color }} />
                  <span className="text-sm flex-1 text-left">{type.name}</span>
                  <span className="text-xs text-[#444444]">{mockTypeCounts[type.id]}</span>
                </button>
              );
            })}
          </div>

          <div className="h-px bg-[#1e1e1e] mx-4 my-2" />

          {/* Collections */}
          <div>
            <button
              onClick={() => setCollectionsOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-4 py-1.5 hover:bg-[#1c1c1c] transition-colors"
            >
              <span className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider">Collections</span>
              {collectionsOpen
                ? <ChevronDown size={12} className="text-[#444444]" />
                : <ChevronRight size={12} className="text-[#444444]" />
              }
            </button>

            {collectionsOpen && (
              <div>
                <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-[#444444] uppercase tracking-wider">
                  Favorites
                </p>
                {favoriteCollections.map(col => (
                  <button
                    key={col.id}
                    className="w-full flex items-center gap-2.5 px-4 py-1.5 text-[#777777] hover:bg-[#1c1c1c] hover:text-[#d0d0d0] transition-colors"
                  >
                    <Star size={12} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />
                    <span className="text-sm truncate text-left">{col.name}</span>
                  </button>
                ))}

                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-[#444444] uppercase tracking-wider">
                  All Collections
                </p>
                {otherCollections.map(col => (
                  <button
                    key={col.id}
                    className="w-full flex items-center gap-2.5 px-4 py-1.5 text-[#777777] hover:bg-[#1c1c1c] hover:text-[#d0d0d0] transition-colors"
                  >
                    <span className="w-3 shrink-0" />
                    <span className="text-sm truncate flex-1 text-left">{col.name}</span>
                    <span className="text-xs text-[#444444]">{col.itemCount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User */}
        <div className="border-t border-[#222222] p-3 flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#e0e0e0] truncate">{mockUser.name}</p>
            <p className="text-xs text-[#444444] truncate">{mockUser.email}</p>
          </div>
          <button className="text-[#444444] hover:text-[#888888] transition-colors p-1">
            <Settings size={14} />
          </button>
        </div>
      </aside>
    </>
  );
}
