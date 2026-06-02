/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemRequirements {
  os: string;
  cpu: string;
  gpu: string;
  ram: number; // in GB
  storage: string;
}

export interface StorePrice {
  id: string;
  storeName: 'Steam' | 'Epic Games' | 'GOG' | 'Nuuvem';
  price: number;
  promoPrice?: number;
  url: string;
  stockStatus: 'Em Estoque' | 'Chaves Limitadas' | 'Esgotado';
}

export interface Game {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  trailerUrl: string; // YouTube or sample video url
  coverImage: string;
  images: string[];
  tags: string[];
  rating: number; // calculated average
  ratingCount: number;
  releaseDate: string; // ISO date or localized string
  isUpcoming: boolean;
  minRequirements: SystemRequirements;
  recRequirements: SystemRequirements;
  stores: StorePrice[];
}

export interface GameComment {
  id: string;
  gameId: string;
  author: string;
  vip: boolean;
  avatar: string;
  date: string;
  text: string;
  stars: number;
  likes: number;
}

export interface ActivityItem {
  id: string;
  type: 'favorite' | 'wishlist' | 'comment' | 'achievement' | 'hide' | 'forum_new' | 'forum_reply';
  desc: string;
  date: string;
}

export interface PCSpecs {
  os: string;
  cpu: 'Low-End i3' | 'Mid-End i5/Ryzen 5' | 'High-End i7/Ryzen 7' | 'Ultra-End i9/Ryzen 9';
  gpu: 'GTX 1050 / RX 560 (Fraca)' | 'GTX 1660 / RX 580 (Média)' | 'RTX 3060 / RX 6600 (Recomendada)' | 'RTX 4080 / RX 7900 XTX (Cortes Rápidos)';
  ram: number; // GB (e.g. 8, 16, 32)
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  isVip: boolean;
  emailAlerts: boolean;
  pushAlerts: boolean;
  pcSpecs: PCSpecs;
  activityHistory: ActivityItem[];
  favorites: string[]; // gameIds
  wishlist: string[]; // gameIds
  hidden: string[]; // gameIds
  followedUpcoming: string[]; // gameIds
}

export interface ForumReply {
  id: string;
  author: string;
  authorVip: boolean;
  authorAvatar: string;
  date: string;
  text: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  channel: 'Geral' | 'Hardware/PC' | 'RPGs' | 'FPS/Competitivo' | 'Modding e Rumores';
  author: string;
  authorVip: boolean;
  authorAvatar: string;
  date: string;
  repliesCount: number;
  views: number;
  replies: ForumReply[];
}

export interface SocialReply {
  id: string;
  author: string;
  authorVip: boolean;
  authorAvatar: string;
  text: string;
  date: string;
}

export interface SocialPost {
  id: string;
  author: string;
  authorVip: boolean;
  authorAvatar: string;
  content: string;
  gameTitle?: string;
  achievementTitle?: string;
  likes: number;
  likedBy: string[]; // userNames
  date: string;
  replies: SocialReply[];
}

export interface TechSupportMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  time: string;
}
