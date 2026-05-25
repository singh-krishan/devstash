import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ label, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#161616] border border-[#222222] rounded-lg">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}22` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <p className="text-xl font-semibold text-[#f0f0f0] leading-none mb-1">{value}</p>
        <p className="text-xs text-[#555555]">{label}</p>
      </div>
    </div>
  );
}
