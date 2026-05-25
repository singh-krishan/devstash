'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2, Sparkles, Terminal, FileText, File, Image as ImageIcon, Link as LinkIcon,
  Star, Settings, PanelLeftClose, PanelLeftOpen, Clock,
} from 'lucide-react';
import { mockItemTypes, mockCollections, mockUser, mockTypeCounts } from '@/lib/mock-data';

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  'file-text': FileText,
  file: File,
  image: ImageIcon,
  link: LinkIcon,
};

function typeToSlug(name: string): string {
  return `${name.toLowerCase()}s`;
}

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const favoriteCollections = mockCollections.filter(c => c.isFavorite);
  const recentCollections = [...mockCollections]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

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
        className={`
          fixed left-0 top-0 bottom-0 z-30 w-64 flex flex-col
          md:static md:z-auto md:translate-x-0
          bg-[#111111] border-r border-[#222222]
          transition-all duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-14' : ''}
        `}
      >
        {/* Header: logo + collapse toggle */}
        <div
          className={`flex items-center h-14 border-b border-[#222222] shrink-0 ${
            isCollapsed ? 'justify-center' : 'gap-2.5 px-4'
          }`}
        >
          <div className="w-7 h-7 bg-[#3b82f6] rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0">
            D
          </div>
          {!isCollapsed && (
            <>
              <span className="font-semibold text-[#f0f0f0] flex-1">DevStash</span>
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex text-[#444444] hover:text-[#888888] transition-colors p-1 rounded"
                title="Collapse sidebar"
              >
                <PanelLeftClose size={15} />
              </button>
            </>
          )}
        </div>

        {/* Expand button shown only in collapsed desktop state */}
        {isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center py-2 text-[#444444] hover:text-[#888888] transition-colors"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={15} />
          </button>
        )}

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
          {/* Types */}
          <div className="mb-2">
            {!isCollapsed && (
              <div className="px-4 pb-1.5">
                <span className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider">
                  Types
                </span>
              </div>
            )}
            {mockItemTypes.map(type => {
              const Icon = TYPE_ICON_MAP[type.icon] ?? File;
              const slug = typeToSlug(type.name);
              const href = `/items/${slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={type.id}
                  href={href}
                  onClick={onClose}
                  title={isCollapsed ? type.name : undefined}
                  className={`flex items-center gap-3 transition-colors ${
                    isCollapsed ? 'justify-center py-2 px-0' : 'px-4 py-1.5'
                  } ${
                    isActive
                      ? 'bg-[#1e1e1e] text-[#d0d0d0]'
                      : 'text-[#777777] hover:bg-[#1c1c1c] hover:text-[#d0d0d0]'
                  }`}
                >
                  <Icon
                    size={isCollapsed ? 16 : 14}
                    style={{ color: type.color }}
                    className="shrink-0"
                  />
                  {!isCollapsed && (
                    <>
                      <span className="text-sm flex-1 text-left">{type.name}</span>
                      <span className="text-xs text-[#444444]">{mockTypeCounts[type.id]}</span>
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          {!isCollapsed && (
            <>
              <div className="h-px bg-[#1e1e1e] mx-4 my-2" />

              {/* Favorites */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5 px-4 pb-1.5">
                  <Star size={10} className="text-[#f59e0b] fill-[#f59e0b]" />
                  <span className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider">
                    Favorites
                  </span>
                </div>
                {favoriteCollections.map(col => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="flex items-center gap-2.5 px-4 py-1.5 text-[#777777] hover:bg-[#1c1c1c] hover:text-[#d0d0d0] transition-colors"
                  >
                    <Star size={12} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />
                    <span className="text-sm truncate">{col.name}</span>
                  </Link>
                ))}
              </div>

              <div className="h-px bg-[#1e1e1e] mx-4 my-2" />

              {/* Recent */}
              <div>
                <div className="flex items-center gap-1.5 px-4 pb-1.5">
                  <Clock size={10} className="text-[#555555]" />
                  <span className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider">
                    Recent
                  </span>
                </div>
                {recentCollections.map(col => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="flex items-center gap-2.5 px-4 py-1.5 text-[#777777] hover:bg-[#1c1c1c] hover:text-[#d0d0d0] transition-colors"
                  >
                    {col.isFavorite ? (
                      <Star size={12} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />
                    ) : (
                      <span className="w-3 shrink-0" />
                    )}
                    <span className="text-sm truncate flex-1">{col.name}</span>
                    <span className="text-xs text-[#444444]">{col.itemCount}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* User area */}
        <div
          className={`border-t border-[#222222] shrink-0 ${
            isCollapsed ? 'p-2 flex justify-center' : 'p-3 flex items-center gap-2.5'
          }`}
        >
          <div
            className="w-8 h-8 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white text-xs font-semibold shrink-0 cursor-pointer"
            title={isCollapsed ? mockUser.name : undefined}
          >
            {userInitials}
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#e0e0e0] truncate">{mockUser.name}</p>
                <p className="text-xs text-[#444444] truncate">{mockUser.email}</p>
              </div>
              <button className="text-[#444444] hover:text-[#888888] transition-colors p-1">
                <Settings size={14} />
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
