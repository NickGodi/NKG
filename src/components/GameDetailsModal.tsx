/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Game, UserProfile, GameComment, StorePrice } from '../types';
import { X, Play, Clock, Star, Heart, Bookmark, EyeOff, ShieldCheck, AlertTriangle, Monitor, ShoppingCart, Video, Image as ImageIcon, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameDetailsModalProps {
  game: Game;
  user: UserProfile | null;
  comments: GameComment[];
  onClose: () => void;
  onToggleFavorite: (gameId: string) => void;
  onToggleWishlist: (gameId: string) => void;
  onHideGame: (gameId: string) => void;
  onAddComment: (gameId: string, text: string, stars: number) => void;
  onOpenVipModal: () => void;
  onSelectTag: (tag: string) => void;
  darkMode: boolean;
}

export default function GameDetailsModal({
  game,
  user,
  comments,
  onClose,
  onToggleFavorite,
  onToggleWishlist,
  onHideGame,
  onAddComment,
  onOpenVipModal,
  onSelectTag,
  darkMode
}: GameDetailsModalProps) {
  const [activeMedia, setActiveMedia] = useState<'video' | 'images'>('video');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Comment submittal state
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');

  // Filtering reviews for this specific game
  const gameComments = comments.filter(c => c.gameId === game.id);

  // CPU and GPU ranking calculation
  const getCpuRank = (cpu: string): number => {
    if (cpu.includes('i9') || cpu.includes('Ryzen 9')) return 4;
    if (cpu.includes('i7') || cpu.includes('Ryzen 7')) return 3;
    if (cpu.includes('i5') || cpu.includes('Ryzen 5')) return 2;
    return 1; // i3 or low
  };

  const getGpuRank = (gpu: string): number => {
    if (gpu.includes('4080') || gpu.includes('7900')) return 4;
    if (gpu.includes('3060') || gpu.includes('6600')) return 3;
    if (gpu.includes('1660') || gpu.includes('580')) return 2;
    return 1; // 1050 or low
  };

  // Compatibility checker logic
  const checkCompatibility = () => {
    if (!user) return { status: 'none', label: 'Cadastre seu PC no Perfil VIP para testar', color: 'text-slate-400 bg-slate-950/40 border-slate-800' };

    const userSpecs = user.pcSpecs;
    const gameMin = game.minRequirements;
    const gameRec = game.recRequirements;

    const userCpuVal = getCpuRank(userSpecs.cpu);
    const userGpuVal = getGpuRank(userSpecs.gpu);
    const userRamVal = userSpecs.ram;

    const minCpuVal = getCpuRank(gameMin.cpu);
    const minGpuVal = getGpuRank(gameMin.gpu);
    const minRamVal = gameMin.ram;

    const recCpuVal = getCpuRank(gameRec.cpu);
    const recGpuVal = getGpuRank(gameRec.gpu);
    const recRamVal = gameRec.ram;

    // 1. Check if fails minimum entirely
    if (userCpuVal < minCpuVal || userGpuVal < minGpuVal || userRamVal < minRamVal) {
      const issues: string[] = [];
      if (userCpuVal < minCpuVal) issues.push('Processador mais fraco que o mínimo');
      if (userGpuVal < minGpuVal) issues.push('Placa de vídeo abaixo do mínimo');
      if (userRamVal < minRamVal) issues.push(`Pouca RAM (Requer ${minRamVal}GB, você tem ${userRamVal}GB)`);

      return {
        status: 'fail',
        label: 'Incompatível: Seus componentes estão abaixo do mínimo exigido!',
        details: issues.join(' • '),
        color: 'text-red-400 bg-red-500/10 border-red-500/20'
      };
    }

    // 2. Check if meets recommended fully
    if (userCpuVal >= recCpuVal && userGpuVal >= recGpuVal && userRamVal >= recRamVal) {
      return {
        status: 'gold',
        label: 'Selo NKG Premium: Compatível com o Ultra da sua máquina!',
        details: `Seu setup (${userSpecs.cpu} | ${userSpecs.gpu}) supera os requisitos recomendados de forma fantástica.`,
        color: 'text-green-400 bg-green-500/10 border-green-500/20'
      };
    }

    // 3. Fits minimum but not recommended
    return {
      status: 'mid',
      label: 'Compatível: Roda perfeitamente em qualidade média ou customizada!',
      details: 'Sua máquina atende ao mínimo exigido, mas pode precisar diminuir alguns efeitos gráficos pesados.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-505/20'
    };
  };

  const compResult = checkCompatibility();

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.isVip) {
      onOpenVipModal();
      return;
    }
    if (!commentInput.trim()) return;

    onAddComment(game.id, commentInput, ratingInput);
    setCommentInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 font-sans">
      
      {/* Dimmed background overlay - click in dark closable */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      {/* Actual Modal Content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-slate-700/50 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-250 text-slate-800'
        }`}
      >
        
        {/* Header absolute bar */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          
          {/* Reject/Hide Future game */}
          <button
            onClick={() => {
              if (!user || !user.isVip) {
                onOpenVipModal();
                return;
              }
              onHideGame(game.id);
              onClose();
            }}
            className="p-2.5 bg-slate-950/80 text-slate-400 hover:text-red-400 rounded-xl transition backdrop-blur-sm cursor-pointer border border-slate-850"
            title="Não me mostrar este jogo futuramente"
          >
            <EyeOff className="w-4 h-4" />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-950/80 text-slate-100 hover:text-amber-400 rounded-xl transition backdrop-blur-sm cursor-pointer border border-slate-850"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-grow p-4 sm:p-6 space-y-6">
          
          {/* Hero segment & media player */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left media block */}
            <div className="lg:col-span-3 space-y-3">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-inner">
                {activeMedia === 'video' ? (
                  <iframe
                    src={game.trailerUrl}
                    title={`${game.title} Trailer`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={game.images[activeImageIndex]}
                      alt={`${game.title} screenshot ${activeImageIndex}`}
                      className="w-full h-full object-cover transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {/* Tiny indicators dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-slate-950/60 p-1.5 rounded-full backdrop-blur-sm">
                      {game.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                            activeImageIndex === i ? 'bg-indigo-500' : 'bg-slate-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Media selector buttons */}
              <div className="flex gap-2 text-xs font-mono">
                <button
                  onClick={() => setActiveMedia('video')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition ${
                    activeMedia === 'video'
                      ? 'bg-indigo-600 border-indigo-500 text-slate-100 shadow'
                      : 'bg-slate-950/60 border-slate-850 text-slate-450 hover:text-slate-100'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Trailer Oficial
                </button>
                <button
                  onClick={() => setActiveMedia('images')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition ${
                    activeMedia === 'images'
                      ? 'bg-indigo-600 border-indigo-500 text-slate-100 shadow'
                      : 'bg-slate-950/60 border-slate-850 text-slate-450 hover:text-slate-100'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Capturas de Tela ({game.images.length})
                </button>
              </div>
            </div>

            {/* Right details sidebar */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-100 tracking-wide font-sans">{game.title}</h1>
                
                {/* Rating score */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < Math.floor(game.rating) ? 'fill-current text-amber-400' : 'text-slate-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-350">{game.rating.toFixed(1)} / 5</span>
                  <span className="text-slate-500 text-[10px]">({game.ratingCount} votos)</span>
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed font-sans">{game.description}</p>

                {/* Tag badges - click to filter and close */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {game.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        onSelectTag(tag);
                        onClose();
                      }}
                      className="text-[9px] font-mono uppercase bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-slate-100 border border-indigo-600/20 px-2.5 py-1 rounded font-bold cursor-pointer transition"
                      title={`Filtrar por tag: ${tag}`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorites, Wishlist buttons action */}
              <div className="grid grid-cols-2 gap-2 mt-5 py-4 border-t border-slate-800/10 dark:border-slate-805/60">
                
                <button
                  onClick={() => {
                    if (!user || !user.isVip) {
                      onOpenVipModal();
                      return;
                    }
                    onToggleFavorite(game.id);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition duration-200 border cursor-pointer ${
                    user && user.favorites.includes(game.id)
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 font-bold'
                      : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-slate-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${user && user.favorites.includes(game.id) ? 'fill-current' : ''}`} />
                  {user && user.favorites.includes(game.id) ? 'Favoritado ✓' : 'Favoritar'}
                </button>

                <button
                  onClick={() => {
                    if (!user || !user.isVip) {
                      onOpenVipModal();
                      return;
                    }
                    onToggleWishlist(game.id);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition duration-200 border cursor-pointer ${
                    user && user.wishlist.includes(game.id)
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 font-bold'
                      : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-slate-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${user && user.wishlist.includes(game.id) ? 'fill-current' : ''}`} />
                  {user && user.wishlist.includes(game.id) ? 'Desejado ✓' : 'Desejados'}
                </button>

              </div>

            </div>

          </div>

          {/* PC Hardware configuration test check panel */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-800/10 dark:border-slate-850 pb-2">
              Verificador de Requisitos para seu PC
            </h3>
            
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition ${compResult.color}`}>
              <div className="flex items-start gap-2.5">
                {compResult.status === 'gold' ? (
                  <ShieldCheck className="w-5.5 h-5.5 text-green-400 flex-shrink-0 animate-bounce" />
                ) : compResult.status === 'fail' ? (
                  <AlertTriangle className="w-5.5 h-5.5 text-red-400 flex-shrink-0" />
                ) : (
                  <Monitor className="w-5.5 h-5.5 text-indigo-500 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-sm font-bold">{compResult.label}</h4>
                  {compResult.details && <p className="text-[11px] opacity-80 mt-0.5 leading-normal">{compResult.details}</p>}
                </div>
              </div>

              {!user && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenVipModal();
                  }}
                  className="bg-indigo-600/10 border border-indigo-500/25 hover:bg-indigo-650 hover:text-slate-100 text-indigo-400 text-[10px] font-black uppercase px-3.5 py-1.5 rounded transition"
                >
                  Criar Perfil VIP
                </button>
              )}
            </div>

            {/* Side-by-side technical requirement hardware block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-850">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold block mb-2">Requisitos Mínimos</span>
                <ul className="space-y-1.5 font-mono text-[11px] text-slate-400">
                  <li><strong className="text-slate-350 font-bold">OS:</strong> {game.minRequirements.os}</li>
                  <li><strong className="text-slate-350 font-bold">Processador:</strong> {game.minRequirements.cpu}</li>
                  <li><strong className="text-slate-350 font-bold">Placa de Vídeo:</strong> {game.minRequirements.gpu}</li>
                  <li><strong className="text-slate-350 font-bold">RAM:</strong> {game.minRequirements.ram} GB</li>
                  <li><strong className="text-slate-350 font-bold">Espaço SSD:</strong> {game.minRequirements.storage}</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-850">
                <span className="text-[10px] text-amber-500 uppercase tracking-wider font-mono font-bold block mb-2">Requisitos Recomendados</span>
                <ul className="space-y-1.5 font-mono text-[11px] text-slate-400">
                  <li><strong className="text-slate-350 font-bold">OS:</strong> {game.recRequirements.os}</li>
                  <li><strong className="text-slate-350 font-bold">Processador:</strong> {game.recRequirements.cpu}</li>
                  <li><strong className="text-slate-350 font-bold">Placa de Vídeo:</strong> {game.recRequirements.gpu}</li>
                  <li><strong className="text-slate-350 font-bold">RAM:</strong> {game.recRequirements.ram} GB</li>
                  <li><strong className="text-slate-350 font-bold">Espaço SSD:</strong> {game.recRequirements.storage}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Real-time price comparator */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800/10 dark:border-slate-850 pb-2">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                Comparador Nuvem-Preços NKG em Tempo Real
              </h3>
              <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                ✓ ATUALIZADO HOJE
              </span>
            </div>

            {/* Store rows with Cheapest highlights */}
            <div className="divide-y divide-slate-800/60 bg-slate-950/30 border border-slate-850 rounded-xl overflow-hidden">
              {game.stores.map((store) => {
                const isPromo = store.promoPrice !== undefined;
                const finalP = isPromo ? store.promoPrice : store.price;
                
                // Check if this store has the cheapest price amongst store options that are fully "Em Estoque"
                const activeInStock = game.stores.filter(s => s.stockStatus !== 'Esgotado');
                const cheapestInStock = activeInStock.length > 0 
                  ? Math.min(...activeInStock.map(s => s.promoPrice !== undefined ? s.promoPrice : s.price))
                  : 9999;
                const isBestDeal = finalP === cheapestInStock && store.stockStatus !== 'Esgotado';

                return (
                  <div key={store.id} className="p-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                    
                    {/* Store Title */}
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        store.storeName === 'Steam' ? 'bg-indigo-500' : store.storeName === 'Epic Games' ? 'bg-slate-300' : 'bg-orange-500'
                      }`} />
                      <span className="font-bold text-slate-200">{store.storeName}</span>
                      {isBestDeal ? (
                        <span className="text-[8px] bg-green-500 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase font-bold tracking-wide animate-pulse">
                          Melhor Oferta
                        </span>
                      ) : null}
                    </div>

                    {/* Stock level status */}
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase italic border ${
                      store.stockStatus === 'Em Estoque'
                        ? 'text-green-500 border-green-500/10 bg-green-500/5'
                        : store.stockStatus === 'Chaves Limitadas'
                        ? 'text-amber-500 border-amber-500/10 bg-amber-500/5'
                        : 'text-red-500 border-red-500/10 bg-red-500/5'
                    }`}>
                      {store.stockStatus}
                    </span>

                    {/* Price section */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        {isPromo ? (
                          <div className="flex items-center gap-1.5 justify-end">
                            <span className="text-[9px] line-through text-slate-500">R$ {store.price.toFixed(2)}</span>
                            <span className="text-[9px] text-red-400 font-bold font-mono">
                              -{Math.round(((store.price - store.promoPrice!) / store.price) * 100)}%
                            </span>
                          </div>
                        ) : null}
                        <div className={`font-black font-semibold ${isBestDeal ? 'text-green-400 font-bold' : 'text-slate-300'}`}>
                          R$ {finalP.toFixed(2)}
                        </div>
                      </div>

                      {/* Go to store link */}
                      <a
                        href={store.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-lg cursor-pointer border transition flex items-center justify-center ${
                          store.stockStatus === 'Esgotado'
                            ? 'opacity-40 pointer-events-none text-slate-600 border-slate-800'
                            : isBestDeal
                            ? 'bg-green-500 hover:bg-green-600 text-slate-950 border-green-600'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-800'
                        }`}
                      >
                        <ShoppingCart className="w-4.5 h-4.5" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Long Description detail block */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-805 pb-1">
              Sobre de {game.title}
            </h3>
            <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed font-sans">{game.longDescription}</p>
          </div>

          {/* Comments list & post feedback reviews system */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-805 pb-1">
              Avaliações e Comentários da Comunidade ({gameComments.length})
            </h3>

            {/* List comments */}
            <div className="space-y-3 font-sans">
              {gameComments.length === 0 ? (
                <div className="text-center p-6 bg-slate-950/20 border border-slate-850 rounded-xl text-xs text-slate-500 italic">
                  Sem comentários postados ainda. Seja o primeiro a opinar!
                </div>
              ) : (
                gameComments.map((comment) => (
                  <div key={comment.id} className="p-3.5 bg-slate-950/20 border border-slate-850 rounded-xl flex gap-3 align-top">
                    <img src={comment.avatar} alt={comment.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-grow">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-slate-200">{comment.author}</span>
                        {comment.vip && <span className="bg-amber-500 text-slate-950 text-[8px] font-black px-1 rounded uppercase">VIP</span>}
                        <div className="flex text-amber-400 ml-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < comment.stars ? 'fill-current' : 'opacity-20'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono ml-auto">{comment.date}</span>
                      </div>
                      <p className="text-xs text-slate-450 dark:text-slate-350 leading-relaxed mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add feedback write form */}
            {user && user.isVip ? (
              <form onSubmit={handlePostComment} className="p-4 bg-slate-950/30 border border-slate-850 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Deixe sua Avaliação Gamers:</h4>
                  
                  {/* Interactive Stars selector */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRatingInput(i + 1)}
                        className="p-0.5 cursor-pointer hover:scale-110 transition"
                      >
                        <Star className={`w-5 h-5 ${i < ratingInput ? 'text-amber-400 fill-current' : 'text-slate-650'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    required
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Quais foram seus sentimentos ao jogar? Prós, contras, dica técnica de requisitos..."
                    className="flex-grow bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-xs text-slate-100 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-indigo-600 hover:bg-indigo-505 text-slate-100 rounded-lg flex items-center justify-center transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 border border-amber-500/15 bg-amber-500/5 rounded-xl text-center">
                <p className="text-xs text-slate-400">Quer participar dos comentários e avaliar esse jogo de 1 a 5 estrelas?</p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenVipModal();
                  }}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition"
                >
                  Inscrever-se no VIP R$ 14,90
                </button>
              </div>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
