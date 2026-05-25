import { Star, MoreHorizontal, Code2, Sparkles, Terminal, FileText, File, Image as ImageIcon, Link } from 'lucide-react';
import type { Collection } from '@/types';

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  'file-text': FileText,
  file: File,
  image: ImageIcon,
  link: Link,
};

interface TypeBadge {
  icon: string;
  color: string;
}

interface CollectionCardProps {
  collection: Collection;
  typeIcons?: TypeBadge[];
}

export default function CollectionCard({ collection, typeIcons = [] }: CollectionCardProps) {
  return (
    <div className="bg-[#161616] border border-[#222222] rounded-lg p-4 hover:border-[#333333] transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <h3 className="text-sm font-semibold text-[#e8e8e8] truncate">{collection.name}</h3>
          {collection.isFavorite && (
            <Star size={12} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />
          )}
        </div>
        <button
          className="text-[#444444] hover:text-[#888888] transition-colors shrink-0 -mt-0.5 -mr-1 p-0.5"
          onClick={e => e.stopPropagation()}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <p className="text-xs text-[#555555] mb-2">{collection.itemCount} items</p>

      {collection.description && (
        <p className="text-xs text-[#666666] leading-relaxed mb-3 line-clamp-2">
          {collection.description}
        </p>
      )}

      {typeIcons.length > 0 && (
        <div className="flex items-center gap-1.5">
          {typeIcons.map(({ icon, color }, i) => {
            const Icon = TYPE_ICON_MAP[icon] ?? File;
            return (
              <div
                key={i}
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: `${color}22` }}
              >
                <Icon size={12} style={{ color }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
