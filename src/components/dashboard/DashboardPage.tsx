'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import CollectionCard from '@/components/dashboard/CollectionCard';
import PinnedItem from '@/components/dashboard/PinnedItem';
import ItemCard from '@/components/dashboard/ItemCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { mockCollections, mockItems, mockItemTypes } from '@/lib/mock-data';
import type { ItemType } from '@/types';

function getCollectionTypeIcons(collectionId: string) {
  const typeIds = [
    ...new Set(
      mockItems
        .filter(item => item.collectionId === collectionId)
        .map(item => item.typeId)
    ),
  ];
  return typeIds
    .map(id => mockItemTypes.find(t => t.id === id))
    .filter((t): t is ItemType => t != null)
    .map(t => ({ icon: t.icon, color: t.color }));
}

function getItemType(typeId: string): ItemType {
  return mockItemTypes.find(t => t.id === typeId) ?? mockItemTypes[0];
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTypeId, setActiveTypeId] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const pinnedItems = mockItems.filter(item => item.isPinned);
  const recentCollections = [...mockCollections]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  const activeType = activeTypeId ? mockItemTypes.find(t => t.id === activeTypeId) ?? null : null;
  const filteredItems = activeTypeId ? mockItems.filter(item => item.typeId === activeTypeId) : [];

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTypeId={activeTypeId}
        onTypeSelect={setActiveTypeId}
      />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

        <main className="flex-1 overflow-y-auto p-6">
          {activeType ? (
            /* Filtered items view */
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-[#f0f0f0] mb-1">{activeType.name}s</h1>
                  <p className="text-sm text-[#555555]">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-[#161616] border border-[#222222] rounded-lg">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-[#2a2a2a] text-[#e0e0e0]' : 'text-[#555555] hover:text-[#888888]'}`}
                    title="Grid view"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-[#2a2a2a] text-[#e0e0e0]' : 'text-[#555555] hover:text-[#888888]'}`}
                    title="List view"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <EmptyState
                  title={`No ${activeType.name}s yet`}
                  description={`Create your first ${activeType.name.toLowerCase()} to get started.`}
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
            </>
          ) : (
            /* Overview */
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#f0f0f0] mb-1">Dashboard</h1>
                <p className="text-sm text-[#555555]">Your developer knowledge hub</p>
              </div>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-[#e0e0e0]">Collections</h2>
                  <button className="text-xs text-[#3b82f6] hover:text-[#60a5fa] transition-colors">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {recentCollections.map(collection => (
                    <CollectionCard
                      key={collection.id}
                      collection={collection}
                      typeIcons={getCollectionTypeIcons(collection.id)}
                    />
                  ))}
                </div>
              </section>

              {pinnedItems.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-base font-semibold text-[#e0e0e0]">Pinned</h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    {pinnedItems.map(item => (
                      <PinnedItem
                        key={item.id}
                        item={item}
                        itemType={getItemType(item.typeId)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
