export interface ItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  title: string;
  contentType: string;
  content: string | null;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  language: string | null;
  typeId: string;
  collectionId: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
}
