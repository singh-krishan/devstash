'use client';

import { Package, Folders, Star, Bookmark } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CollectionCard from '@/components/dashboard/CollectionCard';
import PinnedItem from '@/components/dashboard/PinnedItem';
import StatsCard from '@/components/dashboard/StatsCard';
import { mockCollections, mockItems, mockItemTypes, mockTypeCounts } from '@/lib/mock-data';
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

const totalItems = Object.values(mockTypeCounts).reduce((a, b) => a + b, 0);
const totalCollections = mockCollections.length;
const favoriteItems = mockItems.filter(i => i.isFavorite).length;
const favoriteCollections = mockCollections.filter(c => c.isFavorite).length;

const pinnedItems = mockItems.filter(item => item.isPinned);

const recentCollections = [...mockCollections]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 6);

const recentItems = [...mockItems]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 10);

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#f0f0f0] mb-1">Dashboard</h1>
        <p className="text-sm text-[#555555]">Your developer knowledge hub</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatsCard label="Total Items" value={totalItems} icon={Package} color="#3b82f6" />
        <StatsCard label="Collections" value={totalCollections} icon={Folders} color="#8b5cf6" />
        <StatsCard label="Favorite Items" value={favoriteItems} icon={Star} color="#f59e0b" />
        <StatsCard label="Favorite Collections" value={favoriteCollections} icon={Bookmark} color="#ec4899" />
      </div>

      {/* Recent Collections */}
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

      {/* Pinned Items */}
      {pinnedItems.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold text-[#e0e0e0] mb-4">Pinned</h2>
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

      {/* Recent Items */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#e0e0e0]">Recent Items</h2>
          <span className="text-xs text-[#444444]">{recentItems.length} shown</span>
        </div>
        <div className="flex flex-col gap-2">
          {recentItems.map(item => (
            <PinnedItem
              key={item.id}
              item={item}
              itemType={getItemType(item.typeId)}
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
