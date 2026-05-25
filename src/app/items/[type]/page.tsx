'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { LayoutGrid, List } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ItemCard from '@/components/dashboard/ItemCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { mockItemTypes, mockItems, mockTypeCounts } from '@/lib/mock-data';
import type { ItemType } from '@/types';

function getItemType(typeId: string): ItemType {
  return mockItemTypes.find(t => t.id === typeId) ?? mockItemTypes[0];
}

export default function ItemsTypePage() {
  const params = useParams();
  const typeSlug = params.type as string;
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const typeObj = mockItemTypes.find(t => `${t.name.toLowerCase()}s` === typeSlug);
  const filteredItems = typeObj
    ? mockItems.filter(item => item.typeId === typeObj.id)
    : [];
  const totalCount = typeObj ? (mockTypeCounts[typeObj.id] ?? filteredItems.length) : 0;

  if (!typeObj) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Type not found"
          description="The item type you're looking for doesn't exist."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#f0f0f0] mb-1">{typeObj.name}s</h1>
          <p className="text-sm text-[#555555]">
            {totalCount} item{totalCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-[#161616] border border-[#222222] rounded-lg">
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded transition-colors ${
              view === 'grid' ? 'bg-[#2a2a2a] text-[#e0e0e0]' : 'text-[#555555] hover:text-[#888888]'
            }`}
            title="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded transition-colors ${
              view === 'list' ? 'bg-[#2a2a2a] text-[#e0e0e0]' : 'text-[#555555] hover:text-[#888888]'
            }`}
            title="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState
          title={`No ${typeObj.name}s yet`}
          description={`Create your first ${typeObj.name.toLowerCase()} to get started.`}
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              itemType={getItemType(item.typeId)}
              view="grid"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              itemType={getItemType(item.typeId)}
              view="list"
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
