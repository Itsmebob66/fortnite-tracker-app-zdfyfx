
export interface FortniteNews {
  id: string;
  title: string;
  body: string;
  image?: string;
  date: string;
  type: 'news' | 'update' | 'event';
  priority: 'low' | 'medium' | 'high';
}

export interface PatchNote {
  id: string;
  version: string;
  title: string;
  description: string;
  date: string;
  changes: PatchChange[];
  size?: string;
  platform: 'all' | 'pc' | 'mobile' | 'console';
}

export interface PatchChange {
  id: string;
  category: 'weapons' | 'items' | 'gameplay' | 'bug-fixes' | 'performance' | 'map';
  title: string;
  description: string;
  type: 'added' | 'removed' | 'changed' | 'fixed';
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  image?: string;
}
