import { Package } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'No items yet',
  description = 'Create your first item to get started.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-4">
        <Package size={20} className="text-[#444444]" />
      </div>
      <h3 className="text-sm font-medium text-[#666666] mb-1">{title}</h3>
      <p className="text-xs text-[#444444] max-w-xs">{description}</p>
    </div>
  );
}
