import {
  Code2, Sparkles, Terminal, FileText, File, Image as ImageIcon, Link, Star, Pin,
} from 'lucide-react';
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

interface PinnedItemProps {
  item: Item;
  itemType: ItemType;
}

export default function PinnedItem({ item, itemType }: PinnedItemProps) {
  const Icon = TYPE_ICON_MAP[itemType.icon] ?? File;

  return (
    <div className="flex items-start gap-3 p-4 bg-[#161616] border border-[#222222] rounded-lg hover:border-[#333333] transition-colors cursor-pointer">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${itemType.color}22` }}
      >
        <Icon size={16} style={{ color: itemType.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h4 className="text-sm font-medium text-[#e0e0e0] truncate">{item.title}</h4>
          {item.isFavorite && (
            <Star size={12} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />
          )}
          {item.isPinned && (
            <Pin size={11} className="text-[#3b82f6] fill-[#3b82f6] shrink-0" />
          )}
        </div>

        {item.description && (
          <p className="text-xs text-[#666666] truncate mb-1.5">{item.description}</p>
        )}

        {item.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[10px] bg-[#1e1e1e] text-[#666666] rounded border border-[#2a2a2a]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="text-xs text-[#444444] shrink-0 mt-0.5">{formatDate(item.updatedAt)}</span>
    </div>
  );
}
