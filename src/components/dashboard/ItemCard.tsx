'use client';

import { Code2, Sparkles, Terminal, FileText, File, Image as ImageIcon, Link, Star, Pin, MoreHorizontal } from 'lucide-react';
import type { Item, ItemType } from '@/types';

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  'file-text': FileText,
  file: File,
  image: ImageIcon,
  link: Link,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface ItemCardProps {
  item: Item;
  itemType: ItemType;
  view: 'grid' | 'list';
}

export default function ItemCard({ item, itemType, view }: ItemCardProps) {
  const Icon = TYPE_ICON_MAP[itemType.icon] ?? File;

  if (view === 'list') {
    return (
      <div className="flex items-start gap-3 p-4 bg-[#161616] border border-[#222222] rounded-lg hover:border-[#333333] transition-colors cursor-pointer group">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${itemType.color}22` }}
        >
          <Icon size={16} style={{ color: itemType.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="text-sm font-medium text-[#e0e0e0] truncate">{item.title}</h4>
            {item.isFavorite && <Star size={12} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />}
            {item.isPinned && <Pin size={11} className="text-[#3b82f6] fill-[#3b82f6] shrink-0" />}
          </div>

          {item.description && (
            <p className="text-xs text-[#666666] truncate mb-1.5">{item.description}</p>
          )}

          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-medium"
              style={{ backgroundColor: `${itemType.color}22`, color: itemType.color }}
            >
              {itemType.name}
            </span>
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[10px] bg-[#1e1e1e] text-[#666666] rounded border border-[#2a2a2a]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <span className="text-xs text-[#444444]">{formatDate(item.updatedAt)}</span>
          <button
            className="text-[#444444] hover:text-[#888888] transition-colors opacity-0 group-hover:opacity-100 p-0.5"
            onClick={e => e.stopPropagation()}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#161616] border border-[#222222] rounded-lg p-4 hover:border-[#333333] transition-colors cursor-pointer group min-h-[140px]">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${itemType.color}22` }}
        >
          <Icon size={15} style={{ color: itemType.color }} />
        </div>
        <div className="flex items-center gap-1.5">
          {item.isFavorite && <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" />}
          {item.isPinned && <Pin size={11} className="text-[#3b82f6] fill-[#3b82f6]" />}
          <button
            className="text-[#444444] hover:text-[#888888] transition-colors opacity-0 group-hover:opacity-100 p-0.5 -mr-1"
            onClick={e => e.stopPropagation()}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <h4 className="text-sm font-medium text-[#e0e0e0] mb-1 line-clamp-1">{item.title}</h4>

      {item.description && (
        <p className="text-xs text-[#666666] leading-relaxed line-clamp-2 flex-1">{item.description}</p>
      )}

      <div className="mt-auto pt-3">
        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-medium"
            style={{ backgroundColor: `${itemType.color}22`, color: itemType.color }}
          >
            {itemType.name}
          </span>
          {item.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[10px] bg-[#1e1e1e] text-[#666666] rounded border border-[#2a2a2a]"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span className="text-[10px] text-[#444444]">+{item.tags.length - 2}</span>
          )}
        </div>
        <span className="text-[11px] text-[#444444]">{formatDate(item.updatedAt)}</span>
      </div>
    </div>
  );
}
