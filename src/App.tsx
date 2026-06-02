/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Game, UserProfile, GameComment, ForumTopic, SocialPost, ActivityItem, SocialReply } from './types';
import { INITIAL_GAMES, INITIAL_FORUMS, INITIAL_SOCIAL_FEED, INITIAL_COMMENTS } from './data/gamesData';

// Modular components
import Navbar from './components/Navbar';
import VIPModal from './components/VIPModal';
import GameDetailsModal from './components/GameDetailsModal';
import LiveSupportChat from './components/LiveSupportChat';
import ProfilePanel from './components/ProfilePanel';
import ForumPanel from './components/ForumPanel';
import SocialFeed from './components/SocialFeed';
import BannerAds from './components/BannerAds';

// Dynamic Icons
import { Star, ShieldAlert, Sparkles, Bell, LayoutGrid, Calendar, HelpCircle, Laptop, Heart, ShoppingBag, Eye, Trophy, Terminal, Code, Users, ThumbsUp, Radio, Clock, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation tabs: 'games' | 'upcoming' | 'forum' | 'social' | 'profile'
  const [activeTab, setActiveTab] = useState<'games' | 'upcoming' | 'forum' | 'social' | 'profile'>('games');

  // Shared application state
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [comments, setComments] = useState<GameComment[]>(INITIAL_COMMENTS);
  const [forums, setForums] = useState<ForumTopic[]>(INITIAL_FORUMS);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_FEED);

  // Authenticated VIP user profile state (In-memory storage / custom simulation)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const cached = localStorage.getItem('nkg_user_profile');
    return cached ? JSON.parse(cached) : null;
  });

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Simulated system/push alerts
  const [activePushToast, setActivePushToast] = useState<{ id: string; title: string; text: string } | null>(null);

  // Synchronization cached state
  useEffect(() => {
    if (user) {
      localStorage.setItem('nkg_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('nkg_user_profile');
    }
  }, [user]);

  // Hook simulated push notification based on game requirements compatibility updates
  useEffect(() => {
    if (user && user.pushAlerts) {
      const timer = setTimeout(() => {
        // Build simulated compatible notice
        const upcomingGamesStr = games.filter(g => g.isUpcoming);
        const randomUpcoming = upcomingGamesStr[Math.floor(Math.random() * upcomingGamesStr.length)];

        if (randomUpcoming) {
          setActivePushToast({
            id: `toast-${Date.now()}`,
            title: 'NKG Push Virtual — Compatibilidade de Lançamento!',
            text: `O jogo esperado "${randomUpcoming.title}" é totalmente compatível com as especificações do seu computador (${user.pcSpecs.cpu} | ${user.pcSpecs.ram}GB RAM)! Lançamento previsto em ${new Date(randomUpcoming.releaseDate).toLocaleDateString()}.`
          });
        }
      }, 8000); // Trigger a friendly preview notice 8 seconds in!

      return () => clearTimeout(timer);
    }
  }, [user?.pcSpecs, user?.pushAlerts, games]);

  const handleSubscribeVIPSuccess = (vipName: string, vipEmail: string) => {
    // Scaffold initial VIP customer database profile
    const newVip: UserProfile = {
      id: 'nkg-vip-user',
      name: vipName,
      email: vipEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150',
      bio: 'Jogador entusiasta associado à rede exclusiva NKG VIP! Configure suas specs abaixo.',
      isVip: true,
      emailAlerts: true,
      pushAlerts: true,
      pcSpecs: {
        os: 'Windows 11 64-bit',
        cpu: 'High-End i7/Ryzen 7',
        gpu: 'RTX 3060 / RX 6600 (Recomendada)',
        ram: 16
      },
      favorites: ['cyberpunk-2077'],
      wishlist: ['silksong', 'gta-6'],
      hidden: [],
      followedUpcoming: ['gta-6'],
      activityHistory: [
        { id: `act-${Date.now()}`, type: 'achievement', desc: 'Ativou conta mensal VIP de R$ 14,90! Recursos avançados ativados.', date: new Date().toLocaleDateString('pt-BR') }
      ]
    };

    setUser(newVip);
    setIsVipModalOpen(false);
    setActiveTab('profile'); // Send them directly to configure their pc specifications
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('games');
  };

  // Profile specs update
  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  // Toggle favorite game state
  const handleToggleFavorite = (gameId: string) => {
    if (!user) return;
    const isFav = user.favorites.includes(gameId);
    const updatedFavorites = isFav
      ? user.favorites.filter(id => id !== gameId)
      : [...user.favorites, gameId];

    const actionText = isFav ? 'Removeu dos Favoritos' : 'Adicionou aos Favoritos';
    const tgtGame = games.find(g => g.id === gameId);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'favorite',
      desc: `${actionText} o jogo: ${tgtGame?.title || gameId}`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      favorites: updatedFavorites,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  // Toggle Wishlist game state
  const handleToggleWishlist = (gameId: string) => {
    if (!user) return;
    const isWish = user.wishlist.includes(gameId);
    const updatedWish = isWish
      ? user.wishlist.filter(id => id !== gameId)
      : [...user.wishlist, gameId];

    const actionText = isWish ? 'Removeu da Lista de Desejos' : 'Adicionou à Lista de Desejos';
    const tgtGame = games.find(g => g.id === gameId);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'wishlist',
      desc: `${actionText} o jogo: ${tgtGame?.title || gameId}`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      wishlist: updatedWish,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  // Hide or Ignore Game permanently
  const handleHideGame = (gameId: string) => {
    if (!user) return;
    const updatedHidden = [...user.hidden, gameId];
    const tgtGame = games.find(g => g.id === gameId);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'hide',
      desc: `Ignorou/Ocultou dos catálogos NKG: ${tgtGame?.title || gameId}`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      hidden: updatedHidden,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  // Follow upcoming launch tracks
  const handleToggleFollowUpcoming = (gameId: string) => {
    if (!user) {
      setIsVipModalOpen(true);
      return;
    }
    const isFollowed = user.followedUpcoming.includes(gameId);
    const updatedFollowed = isFollowed
      ? user.followedUpcoming.filter(id => id !== gameId)
      : [...user.followedUpcoming, gameId];

    setUser({
      ...user,
      followedUpcoming: updatedFollowed
    });
  };

  // Add Comment review star evaluation
  const handleAddComment = (gameId: string, text: string, stars: number) => {
    if (!user) return;
    const newComment: GameComment = {
      id: `c-${Date.now()}`,
      gameId,
      author: user.name,
      vip: true,
      avatar: user.avatar,
      date: new Date().toISOString().split('T')[0],
      text,
      stars,
      likes: 0
    };

    setComments([newComment, ...comments]);

    const tgtGame = games.find(g => g.id === gameId);

    // Calculate updated game average rating
    const gameComments = [newComment, ...comments.filter(c => c.gameId === gameId)];
    const avgRating = gameComments.reduce((acc, c) => acc + c.stars, 0) / gameComments.length;

    setGames(prevGames => prevGames.map(g => {
      if (g.id === gameId) {
        return {
          ...g,
          rating: Number(avgRating.toFixed(1)),
          ratingCount: gameComments.length
        };
      }
      return g;
    }));

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'comment',
      desc: `Avaliou com ${stars} estrelas o jogo ${tgtGame?.title || gameId}`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  // Forum state modifiers
  const handleAddNewForumTopic = (title: string, channel: any) => {
    if (!user) return;
    const newTopic: ForumTopic = {
      id: `f-${Date.now()}`,
      title,
      channel,
      author: user.name,
      authorVip: true,
      authorAvatar: user.avatar,
      date: new Date().toLocaleDateString('pt-BR'),
      views: 12,
      repliesCount: 0,
      replies: []
    };

    setForums([newTopic, ...forums]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'forum_new',
      desc: `Abriu um tópico de discussão: "${title}" no canal ${channel}`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  const handlePostForumReply = (topicId: string, text: string) => {
    if (!user) return;
    const newReply = {
      id: `fr-${Date.now()}`,
      author: user.name,
      authorVip: true,
      authorAvatar: user.avatar,
      date: new Date().toLocaleDateString('pt-BR'),
      text
    };

    setForums(prevForums => prevForums.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          repliesCount: t.repliesCount + 1,
          replies: [...t.replies, newReply]
        };
      }
      return t;
    }));

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'forum_reply',
      desc: `Enviou uma resposta técnica na comunidade do Fórum`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  // Social feed state modifiers
  const handleAddNewSocialPost = (content: string, gameTitle?: string, achieveTitle?: string) => {
    if (!user) return;
    const newPost: SocialPost = {
      id: `s-${Date.now()}`,
      author: user.name,
      authorVip: true,
      authorAvatar: user.avatar,
      content,
      gameTitle,
      achievementTitle: achieveTitle,
      likes: 0,
      likedBy: [],
      date: 'Agora',
      replies: []
    };

    setSocialPosts([newPost, ...socialPosts]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'achievement',
      desc: `Compartilhou conquistas na rede social: ${achieveTitle || "Novidades de canais"}`,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setUser({
      ...user,
      activityHistory: [newActivity, ...user.activityHistory]
    });
  };

  const handleLikeSocialPost = (postId: string) => {
    if (!user) return;
    setSocialPosts(prevPosts => prevPosts.map(p => {
      if (p.id === postId) {
        const hasLiked = p.likedBy.includes(user.name);
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          likedBy: hasLiked ? p.likedBy.filter(n => n !== user.name) : [...p.likedBy, user.name]
        };
      }
      return p;
    }));
  };

  const handlePostSocialComment = (postId: string, text: string) => {
    if (!user) return;
    const newReply: SocialReply = {
      id: `sr-${Date.now()}`,
      author: user.name,
      authorVip: true,
      authorAvatar: user.avatar,
      text,
      date: 'Agora'
    };

    setSocialPosts(prevPosts => prevPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));
  };

  // Hardware Level string helper
  const getPcHardwareStatus = (game: Game) => {
    if (!user) return null;
    const getSpecRating = (choice: string) => {
      if (choice.includes('i9') || choice.includes('4080')) return 4;
      if (choice.includes('i7') || choice.includes('3060')) return 3;
      if (choice.includes('i5') || choice.includes('1660')) return 2;
      return 1;
    };

    const userCpu = getSpecRating(user.pcSpecs.cpu);
    const userGpu = getSpecRating(user.pcSpecs.gpu);
    const userRam = user.pcSpecs.ram;

    const reqCpu = getSpecRating(game.minRequirements.cpu);
    const reqGpu = getSpecRating(game.minRequirements.gpu);
    const reqRam = game.minRequirements.ram;

    if (userCpu < reqCpu || userGpu < reqGpu || userRam < reqRam) {
      return { status: 'incompatible', text: 'Hardware Insuficiente', color: 'bg-red-500/15 text-red-400 border-red-500/20' };
    }

    const recCpu = getSpecRating(game.recRequirements.cpu);
    const recGpu = getSpecRating(game.recRequirements.gpu);
    const recRam = game.recRequirements.ram;

    if (userCpu >= recCpu && userGpu >= recGpu && userRam >= recRam) {
      return { status: 'ultra', text: 'Ultra Compatível', color: 'bg-green-500/15 text-green-400 border-green-500/20' };
    }

    return { status: 'medium', text: 'Médio / Compatível', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' };
  };

  // Categorize standard filter tags lists
  const availableCategories = ['Todos', 'RPG', 'Indie', 'Ação', 'Souls-like', 'FPS', 'Mundo Aberto', 'Lançamento'];

  // Match search filter rules and hidden rules
  const searchableGames = games.filter(g => {
    // 1. Filter out hidden games
    if (user && user.hidden.includes(g.id)) return false;
    
    // 2. Name search matching
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 3. Match tag / categories list
    const matchesTag = activeCategory === 'Todos' || g.tags.includes(activeCategory);

    return matchesSearch && matchesTag;
  });

  const activeCatalogGames = searchableGames.filter(g => !g.isUpcoming);
  const upcomingGames = games.filter(g => g.isUpcoming);

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-250 ${
      darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Sidebar - Visible on Desktop */}
      <aside className={`hidden lg:flex w-64 flex-shrink-0 border-r flex-col justify-between transition-colors duration-200 ${
        darkMode ? 'border-slate-800 bg-[#0f172a]/50 backdrop-blur-md' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex flex-col flex-1 pb-4">
          {/* Brand Logo */}
          <div className="p-6 cursor-pointer flex items-center gap-3" onClick={() => setActiveTab('games')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-lg text-slate-100 italic tracking-tighter shadow-md shadow-indigo-600/20 hover:scale-105 transition-transform duration-200">
              NKG
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white font-display">NKG HUB</h1>
              <p className={`text-[9px] uppercase tracking-widest font-extrabold -mt-1 ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>Next Key Gaming</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-2.5 mt-2">
            <div className={`pb-3 mb-4 border-b ${darkMode ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <p className="px-2 py-1 text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">Acesso Principal</p>
              
              <button
                onClick={() => setActiveTab('games')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'games'
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : darkMode
                      ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-850 border border-transparent'
                }`}
              >
                <Gamepad2 className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                Explorar Catálogo
              </button>

              <button
                onClick={() => setActiveTab('upcoming')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all mt-1 cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : darkMode
                      ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-850 border border-transparent'
                }`}
              >
                <Calendar className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                Agenda Lançamentos
              </button>
            </div>

            <div className={`pb-3 mb-4 border-b ${darkMode ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <p className="px-2 py-1 text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">Comunidade</p>
              
              <button
                onClick={() => setActiveTab('forum')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'forum'
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : darkMode
                      ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-850 border border-transparent'
                }`}
              >
                <Users className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                Fóruns de Discussão
              </button>

              <button
                onClick={() => setActiveTab('social')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all mt-1 cursor-pointer ${
                  activeTab === 'social'
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : darkMode
                      ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-850 border border-transparent'
                }`}
              >
                <Radio className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                Rede Social / Feed
              </button>
            </div>
          </nav>

          {/* PC Profile Badge */}
          {user ? (
            <div 
              onClick={() => setActiveTab('profile')}
              className={`m-4 p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-indigo-500/60 bg-indigo-500/5 shadow-md shadow-indigo-600/5'
                  : darkMode 
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase tracking-widest">PERFIL DE PC</span>
                <span className="text-[10px] text-green-500 font-extrabold flex items-center gap-1 font-mono">● ATIVO</span>
              </div>
              <p className={`text-xs font-bold truncate ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {user.pcSpecs.gpu.split('(')[0].trim() || 'Sem Placa'}
              </p>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                {user.pcSpecs.ram}GB RAM • {user.pcSpecs.cpu}
              </p>
            </div>
          ) : null}

          {/* VIP Promo Upsell Banner inside scroll panel */}
          {!user && (
            <div className="p-4 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-805 mx-4 mb-4 rounded-2xl shadow-xl border border-indigo-500/30">
              <p className="text-xs font-black text-white flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
                Seja Membro VIP NKG
              </p>
              <p className="text-[10px] text-indigo-200 mt-1 mb-3 leading-normal font-medium">
                Crie seu perfil, verifique compatibilidade de hardware em tempo real e remova todos os anúncios!
              </p>
              <button 
                onClick={() => setIsVipModalOpen(true)}
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] font-black uppercase rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Registrar Agora
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Container area which houses Navbar and Page contents */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onOpenVipModal={() => setIsVipModalOpen(true)}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main Dynamic View wrapper content */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Visitor Warning alert banner and call to subscribe VIP */}
        {!user && (
          <div className="mb-6 bg-gradient-to-r from-amber-600/15 to-indigo-600/15 border border-indigo-500/30 p-4.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4.5">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="font-extrabold text-sm text-slate-100">Modo de Navegação Visitante (Grátis)</h3>
                <p className="text-xs text-slate-400 leading-normal mt-0.5 max-w-xl">
                  Você está visualizando o site com anúncios limitados. Cadastre um perfil VIP para remover propagandas, cadastrar as especificações do seu PC, salvar favoritos, lista de desejos de estoque e participar de fóruns/chat com suporte!
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsVipModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 scroll-smooth text-slate-100 text-xs font-black px-4 py-2.5 rounded-xl cursor-pointer transition flex items-center gap-1.5 flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 fill-current text-amber-400" />
              Registrar Perfil VIP
            </button>
          </div>
        )}

        {/* Tab Router Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            
            {activeTab === 'games' && (
              <div className="space-y-6">
                
                {/* Visual Category Tags filters selector inline list */}
                <div className="flex gap-2 pb-2 overflow-x-auto justify-start no-scrollbar border-b border-slate-800/10 dark:border-slate-850">
                  {availableCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-xs font-bold font-sans rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                        activeCategory === cat
                          ? 'bg-indigo-600 border-indigo-505 text-slate-100 shadow-md shadow-indigo-600/10'
                          : darkMode 
                            ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-100'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'Todos' ? '📂 Todos os Jogos' : cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  
                  {/* Left Column games grids */}
                  <div className="lg:col-span-3 space-y-6">
                    
                    {activeCatalogGames.length === 0 ? (
                      <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
                        <p className="text-sm text-slate-400">Nenhum título localizado com as especificações inseridas.</p>
                        <p className="text-xs text-slate-500 mt-1">Busque outros termos ou troque os filtros de tags categorias!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {activeCatalogGames.map((game) => {
                          const compatibility = getPcHardwareStatus(game);
                          
                          // Lowest price across key stores
                          const values = game.stores.map(s => s.promoPrice !== undefined ? s.promoPrice : s.price);
                          const lowestPrice = Math.min(...values);

                          return (
                            <div
                              key={game.id}
                              onClick={() => setSelectedGame(game)}
                              className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                                darkMode 
                                  ? 'bg-[#0f172a] border-slate-800/80 hover:border-indigo-500/40 hover:shadow-xl' 
                                  : 'bg-white border-slate-200 hover:border-indigo-500/20 hover:shadow-lg'
                              }`}
                            >
                              
                              {/* cover screenshot area with hardware indicator tag */}
                              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                                <img
                                  src={game.coverImage}
                                  alt={game.title}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />

                                {/* PC Specs Eligibility indicator (Only for VIP logged users) */}
                                {compatibility && (
                                  <div className="absolute top-3 left-3">
                                    <span className={`text-[9px] font-mono font-extrabold px-2.5 py-1 rounded-lg shadow border uppercase tracking-wider backdrop-blur-md ${compatibility.color}`}>
                                      ⚙️ {compatibility.text}
                                    </span>
                                  </div>
                                )}

                                {/* Average rating pill corner absolute */}
                                <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-2 py-1 rounded-xl text-[10px] font-bold font-mono tracking-tight text-amber-400 flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  {game.rating.toFixed(1)}
                                </div>
                              </div>

                              {/* Title block info */}
                              <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                  <h3 className="font-extrabold text-sm tracking-wide text-slate-100 dark:text-slate-100 font-display line-clamp-1">
                                    {game.title}
                                  </h3>
                                  <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                    {game.description}
                                  </p>

                                  {/* Render first two tags inside card */}
                                  <div className="flex gap-1.5 mt-3 flex-wrap">
                                    {game.tags.slice(0, 3).map((t, i) => (
                                      <span key={i} className="text-[9px] font-mono uppercase bg-slate-950/40 dark:bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-500 font-bold">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-800/10 dark:border-slate-850 flex items-center justify-between">
                                  <div>
                                    <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider">Menor Preço</span>
                                    <div className="text-sm font-black font-semibold text-green-400 font-mono">
                                      R$ {lowestPrice.toFixed(2)}
                                    </div>
                                  </div>
                                  
                                  {/* Action indicator trigger Details */}
                                  <span className="text-xs font-bold text-indigo-500 hover:text-indigo-400 transition-colors flex items-center gap-1 uppercase font-mono">
                                    Preços & Specs →
                                  </span>
                                </div>

                              </div>

                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>

                  {/* Right sidebars ads and community resources */}
                  <div className="lg:col-span-1 space-y-6">
                    
                    {/* PC Diagnostics module specs overview */}
                    {user ? (
                      <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-3 font-sans">
                        <div className="flex items-center gap-2">
                          <Laptop className="w-5 h-5 text-indigo-400" />
                          <h4 className="text-xs font-mono text-indigo-400 font-black uppercase tracking-wider">Configuração Própria</h4>
                        </div>
                        <ul className="text-xs space-y-1.5 font-mono text-slate-450 dark:text-slate-350 bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                          <li>⚙️ OS: <span className="font-bold text-slate-200">{user.pcSpecs.os}</span></li>
                          <li>⚙️ CPU: <span className="font-bold text-slate-200">{user.pcSpecs.cpu}</span></li>
                          <li>⚙️ GPU: <span className="font-bold text-slate-200">{user.pcSpecs.gpu}</span></li>
                          <li>⚙️ RAM: <span className="font-bold text-slate-200">{user.pcSpecs.ram} GB DDR4</span></li>
                        </ul>
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-[10px] uppercase font-bold py-2 rounded-lg cursor-pointer transition"
                        >
                          Trocar Componentes PC
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-950/20 border border-slate-800 rounded-xl space-y-3">
                        <h4 className="text-xs font-mono text-slate-400 uppercase font-bold">Verificador de PC NKG</h4>
                        <p className="text-xs text-slate-400 leading-normal">
                          Gostaria de testar se os jogos rodam suavemente no seu computador sem baixar nada? Cadastre o seu processador e placa de vídeo agora!
                        </p>
                        <button
                          onClick={() => setIsVipModalOpen(true)}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold py-2 rounded-lg cursor-pointer transition"
                        >
                          Configurar Meu PC (VIP)
                        </button>
                      </div>
                    )}

                    {/* Simulates Advertisements layer for FREE accounts */}
                    {!user?.isVip && (
                      <div className="space-y-4">
                        <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase block text-center">Anúncios Patrocinados</span>
                        <BannerAds onUnlockVip={() => setIsVipModalOpen(true)} layout="sidebar" />
                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* Launch tracker tracker tab */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                
                <div className="pb-4 border-b border-slate-800/10 dark:border-slate-850">
                  <h2 className="text-xl font-bold flex items-center gap-1.5">
                    <Calendar className="w-5.5 h-5.5 text-indigo-500" />
                    Acompanhar Próximos Lançamentos (Agenda 2026/2027)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Inscreva-se ou "Siga" lançamentos esperados para obter simulação de alertas push e verificar se são compatíveis com a configuração cadastrada de seu PC!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingGames.map((game) => {
                    const isFollowed = user?.followedUpcoming.includes(game.id);
                    const compStatus = getPcHardwareStatus(game);

                    return (
                      <div key={game.id} className={`p-5 rounded-2xl border flex gap-5 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        
                        <img
                          src={game.coverImage}
                          alt={game.title}
                          className="w-24 h-32 object-cover rounded-xl border border-slate-800 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <span className="bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                              Lançamento Previsto
                            </span>
                            <h3 className="text-base font-bold text-slate-100 mt-1.5">{game.title}</h3>
                            
                            <div className="flex items-center gap-1.5 text-xs text-slate-450 mt-1 font-mono">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>Estreia em: <strong className="text-slate-350">{new Date(game.releaseDate).toLocaleDateString('pt-BR')}</strong></span>
                            </div>

                            {/* Compatibility pill preview tag inside Releases card */}
                            {user && compStatus && (
                              <div className="mt-2.5">
                                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${compStatus.color}`}>
                                  ⚙️ {compStatus.text}
                                </span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleToggleFollowUpcoming(game.id)}
                            className={`w-full mt-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 border cursor-pointer ${
                              isFollowed
                                ? 'bg-green-500/15 border-green-500/20 text-green-400 font-extrabold'
                                : 'bg-slate-950/65 border-slate-850 text-slate-400 hover:text-slate-100'
                            }`}
                          >
                            <Bell className={`w-3.5 h-3.5 ${isFollowed ? 'fill-current text-green-400 animate-pulse' : ''}`} />
                            <span>{isFollowed ? 'Seguindo Lançamento! (Alerta Push Ativo)' : 'Seguir Lançamento'}</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* Forums boards tab */}
            {activeTab === 'forum' && (
              <ForumPanel
                user={user}
                forumTopics={forums}
                onAddNewTopic={handleAddNewForumTopic}
                onPostReply={handlePostForumReply}
                onOpenVipModal={() => setIsVipModalOpen(true)}
                darkMode={darkMode}
              />
            )}

            {/* Social achievement feed tab */}
            {activeTab === 'social' && (
              <SocialFeed
                user={user}
                socialPosts={socialPosts}
                onAddNewPost={handleAddNewSocialPost}
                onLikePost={handleLikeSocialPost}
                onPostSocialComment={handlePostSocialComment}
                onOpenVipModal={() => setIsVipModalOpen(true)}
                darkMode={darkMode}
              />
            )}

            {/* Customizable Profile edit settings tab dashboard */}
            {activeTab === 'profile' && user && (
              <ProfilePanel
                user={user}
                onUpdateProfile={handleUpdateProfile}
                gamesList={games}
                onSelectGame={(gameId) => {
                  const targetGame = games.find(g => g.id === gameId);
                  if (targetGame) {
                    setSelectedGame(targetGame);
                  }
                }}
                darkMode={darkMode}
              />
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* Floating supportive chat drawer widget trigger */}
      <LiveSupportChat
        user={user}
        onOpenVipModal={() => setIsVipModalOpen(true)}
      />

      {/* Persistent global virtual push notification banner indicator */}
      <AnimatePresence>
        {activePushToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 bg-[#090d16] border border-green-500/35 p-4 rounded-xl shadow-2xl z-50 max-w-sm font-sans"
          >
            <div className="flex gap-2 items-start">
              <span className="p-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
                <Bell className="w-4 h-4 animate-swing" />
              </span>
              <div className="flex-grow">
                <h4 className="text-xs font-extrabold text-green-400 uppercase tracking-widest">{activePushToast.title}</h4>
                <p className="text-[11px] text-slate-350 leading-relaxed mt-1">{activePushToast.text}</p>
              </div>
              <button
                onClick={() => setActivePushToast(null)}
                className="text-slate-500 hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIP Onboarding transaction dialog */}
      <VIPModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        onSubscribeSuccess={handleSubscribeVIPSuccess}
      />

      {/* Detailed Game overview lightbox overlay */}
      <AnimatePresence>
        {selectedGame && (
          <GameDetailsModal
            game={selectedGame}
            user={user}
            comments={comments}
            onClose={() => setSelectedGame(null)}
            onToggleFavorite={handleToggleFavorite}
            onToggleWishlist={handleToggleWishlist}
            onHideGame={handleHideGame}
            onAddComment={handleAddComment}
            onOpenVipModal={() => setIsVipModalOpen(true)}
            onSelectTag={(tag) => {
              setActiveCategory(tag);
              setActiveTab('games');
            }}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

      {/* TOOLS USED DISCLOSURE FOOTER (Anti-AI-Slop compliant, neat and technical but beautiful) */}
      <footer className={`mt-12 border-t py-8 transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-650'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center font-sans">
          
          <div className="flex justify-center items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
            <Code className="w-4 h-4 text-indigo-500 font-bold" />
            <span>Ferramentas e Tecnologias de Desenvolvimento</span>
          </div>

          <p className="text-xs max-w-2xl mx-auto leading-relaxed">
            Este site foi construído sob medida com <strong className="text-slate-350 font-bold dark:text-slate-200">React 19</strong> e <strong className="text-slate-350 font-bold dark:text-slate-200 font-sans">TypeScript</strong> como linguagem fundadora. O estilo visual é totalmente dinâmico utilizando <strong className="text-slate-350 font-bold dark:text-slate-200">Tailwind CSS 4.0</strong>, proporcionando layouts fluidos e transições responsivas nos modos claro e escuro.
          </p>

          <p className="text-xs max-w-2xl mx-auto leading-relaxed mt-2">
            Todas as animações de menu, sliders, e transições de modais são comandadas pela biblioteca <strong className="text-slate-350 font-bold dark:text-slate-205">Motion/React</strong>, garantindo alto desempenho nos dispositivos móveis e desktops. O suporte técnico via chat e o comparador de preços em tempo real operam em memória com persistência local em cache reativa.
          </p>

          <div className="w-12 h-0.5 bg-slate-800 mx-auto my-4.5"></div>

          <p className="text-[10px] font-mono tracking-wider text-slate-600 block">
            NKG PORTAL GAMER © 2026. Feito com amor por engenharia de software de alta performance.
          </p>

        </div>
      </footer>

      </div> {/* Encloses right column main scrollable container */}

    </div>
  );
}
