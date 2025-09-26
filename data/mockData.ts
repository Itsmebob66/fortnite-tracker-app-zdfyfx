
import { FortniteNews, PatchNote, GameMode } from '../types/FortniteTypes';

export const mockNews: FortniteNews[] = [
  {
    id: '1',
    title: 'Chapter 5 Season 1: Underground',
    body: 'Dive into the underground world of Fortnite with new locations, weapons, and gameplay mechanics. Explore the depths and discover hidden treasures.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
    date: '2024-01-15T10:00:00Z',
    type: 'update',
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Mythic Weapons Available',
    body: 'Three new mythic weapons have been added to the game. Find them in special locations across the map and dominate your opponents.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
    date: '2024-01-12T14:30:00Z',
    type: 'news',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Winter Festival Event',
    body: 'Join the Winter Festival celebration with special challenges, exclusive rewards, and limited-time game modes. Event runs until January 31st.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    date: '2024-01-10T09:00:00Z',
    type: 'event',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Performance Improvements',
    body: 'Latest update includes significant performance improvements for mobile devices and optimizations for better gameplay experience.',
    date: '2024-01-08T16:45:00Z',
    type: 'update',
    priority: 'low'
  },
  {
    id: '5',
    title: 'New Emotes and Skins',
    body: 'Check out the latest collection of emotes and character skins available in the item shop. Limited time offers available now.',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
    date: '2024-01-05T12:00:00Z',
    type: 'news',
    priority: 'medium'
  }
];

export const mockPatchNotes: PatchNote[] = [
  {
    id: '1',
    version: 'v28.30',
    title: 'Underground Update',
    description: 'Major content update introducing underground areas and new gameplay mechanics.',
    date: '2024-01-15T10:00:00Z',
    size: '2.1 GB',
    platform: 'all',
    changes: [
      {
        id: '1',
        category: 'map',
        title: 'Underground Tunnels',
        description: 'Added extensive underground tunnel system connecting major POIs',
        type: 'added'
      },
      {
        id: '2',
        category: 'weapons',
        title: 'Mythic Burst Rifle',
        description: 'New mythic weapon with unique firing pattern and increased damage',
        type: 'added'
      },
      {
        id: '3',
        category: 'gameplay',
        title: 'Sliding Mechanics',
        description: 'Improved sliding mechanics for better underground navigation',
        type: 'changed'
      },
      {
        id: '4',
        category: 'bug-fixes',
        title: 'Audio Issues',
        description: 'Fixed audio cutting out in certain underground areas',
        type: 'fixed'
      }
    ]
  },
  {
    id: '2',
    version: 'v28.20',
    title: 'Hotfix Update',
    description: 'Quick hotfix addressing critical gameplay issues and balance changes.',
    date: '2024-01-08T16:45:00Z',
    size: '156 MB',
    platform: 'all',
    changes: [
      {
        id: '5',
        category: 'weapons',
        title: 'SMG Damage',
        description: 'Reduced SMG damage by 5% to improve weapon balance',
        type: 'changed'
      },
      {
        id: '6',
        category: 'bug-fixes',
        title: 'Crash Fix',
        description: 'Fixed crash occurring when entering certain buildings',
        type: 'fixed'
      },
      {
        id: '7',
        category: 'performance',
        title: 'Mobile Optimization',
        description: 'Improved frame rate stability on mobile devices',
        type: 'changed'
      }
    ]
  }
];

export const mockGameModes: GameMode[] = [
  {
    id: '1',
    name: 'Battle Royale',
    description: 'Classic 100-player battle royale experience',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Zero Build',
    description: 'Battle Royale without building mechanics',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'Creative',
    description: 'Build and play custom game modes',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop'
  },
  {
    id: '4',
    name: 'Winter Festival LTM',
    description: 'Limited time winter-themed game mode',
    isActive: true,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
  }
];
