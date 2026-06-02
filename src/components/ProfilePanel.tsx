/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { UserProfile, PCSpecs, Game } from '../types';
import { Settings, User, Monitor, Bell, History, Sparkles, Save, Heart, ShoppingBag, EyeOff, Mail, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfilePanelProps {
  user: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  gamesList: Game[];
  onSelectGame: (gameId: string) => void;
  darkMode: boolean;
}

export default function ProfilePanel({ user, onUpdateProfile, gamesList, onSelectGame, darkMode }: ProfilePanelProps) {
  const [subTab, setSubTab] = useState<'profile' | 'pc' | 'notifications' | 'wishlist' | 'hidden' | 'history'>('profile');
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // PC specifications state
  const [pcSpecs, setPcSpecs] = useState<PCSpecs>(user.pcSpecs);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80',
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80'
  ];

  const handleSaveProfile = () => {
    onUpdateProfile({
      ...user,
      name,
      bio,
      avatar,
      pcSpecs
    });
    triggerSaved();
  };

  const handleToggleEmailAlerts = () => {
    const updated = { ...user, emailAlerts: !user.emailAlerts };
    onUpdateProfile(updated);
    addHistoryItem('notifications', `Alterou as preferências de notificações por e-mail para: ${updated.emailAlerts ? 'Ativado' : 'Desativado'}`);
    triggerSaved();
  };

  const handleTogglePushAlerts = () => {
    const updated = { ...user, pushAlerts: !user.pushAlerts };
    onUpdateProfile(updated);
    addHistoryItem('notifications', `Alterou o alerta de lançamentos compatíveis IA para: ${updated.pushAlerts ? 'Ativado' : 'Desativado'}`);
    triggerSaved();
  };

  const handlePCSpecChange = (key: keyof PCSpecs, value: any) => {
    const updatedSpecs = { ...pcSpecs, [key]: value };
    setPcSpecs(updatedSpecs);
    onUpdateProfile({
      ...user,
      pcSpecs: updatedSpecs
    });
    triggerSaved();
  };

  const triggerSaved = () => {
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2000);
  };

  const addHistoryItem = (type: string, desc: string) => {
    const newItem = {
      id: `act-${Date.now()}`,
      type: 'achievement' as any,
      desc,
      date: new Date().toLocaleDateString('pt-BR')
    };
    onUpdateProfile({
      ...user,
      activityHistory: [newItem, ...user.activityHistory]
    });
  };

  const handleRemoveFavorite = (gameId: string) => {
    onUpdateProfile({
      ...user,
      favorites: user.favorites.filter(id => id !== gameId)
    });
  };

  const handleRemoveWishlist = (gameId: string) => {
    onUpdateProfile({
      ...user,
      wishlist: user.wishlist.filter(id => id !== gameId)
    });
  };

  const handleUnhideGame = (gameId: string) => {
    onUpdateProfile({
      ...user,
      hidden: user.hidden.filter(id => id !== gameId)
    });
  };

  const favoriteGames = gamesList.filter(g => user.favorites.includes(g.id));
  const wishlistGames = gamesList.filter(g => user.wishlist.includes(g.id));
  const hiddenGames = gamesList.filter(g => user.hidden.includes(g.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-sans">
      
      {/* Profile Sidebar */}
      <div className={`lg:col-span-1 p-5 rounded-2xl border flex flex-col items-center text-center h-fit ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="relative">
          <img
            src={avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 shadow-md"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-0 right-0 bg-amber-500 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded-full border-2 border-slate-900">
            VIP
          </span>
        </div>

        <h2 className="text-xl font-bold mt-4 text-slate-100 dark:text-slate-100 dark:bg-transparent bg-slate-900 bg-clip-text">
          {name || 'Gamer VIP Nome'}
        </h2>
        
        <p className="text-xs text-indigo-500 font-mono font-bold mt-1 uppercase tracking-wider">
          Membro desde {user.emailAlerts ? 'Maio, 2026' : 'Maio, 2026'}
        </p>

        <p className="text-sm text-slate-400 dark:text-slate-400 mt-2 px-2 max-w-[200px] line-clamp-3 italic">
          "{bio || 'Sem bio cadastrada. Clique em editar perfil!'}"
        </p>

        <div className="w-full h-px bg-slate-800/10 dark:bg-slate-800/60 my-5"></div>

        {/* Vertical Sub-NavTabs */}
        <div className="w-full flex flex-col gap-1 text-xs">
          <button
            onClick={() => setSubTab('profile')}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold tracking-wide cursor-pointer transition ${
              subTab === 'profile'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/25'
                : 'text-slate-400 dark:text-slate-400 dark:hover:bg-slate-800/55 hover:bg-slate-100'
            }`}
          >
            <User className="w-4.5 h-4.5" />
            Editar Perfil
          </button>
          <button
            onClick={() => setSubTab('pc')}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold tracking-wide cursor-pointer transition ${
              subTab === 'pc'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/25'
                : 'text-slate-400 dark:text-slate-400 dark:hover:bg-slate-800/55 hover:bg-slate-100'
            }`}
          >
            <Monitor className="w-4.5 h-4.5" />
            Configuração do PC
          </button>
          <button
            onClick={() => setSubTab('notifications')}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold tracking-wide cursor-pointer transition ${
              subTab === 'notifications'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/25'
                : 'text-slate-400 dark:text-slate-400 dark:hover:bg-slate-800/55 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4.5 h-4.5" />
            Notificações E-mail/Push
          </button>
          <button
            onClick={() => setSubTab('wishlist')}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold tracking-wide cursor-pointer transition ${
              subTab === 'wishlist'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/25'
                : 'text-slate-400 dark:text-slate-400 dark:hover:bg-slate-800/55 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            Lista de Desejos ({wishlistGames.length})
          </button>
          <button
            onClick={() => setSubTab('hidden')}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold tracking-wide cursor-pointer transition ${
              subTab === 'hidden'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/25'
                : 'text-slate-400 dark:text-slate-400 dark:hover:bg-slate-800/55 hover:bg-slate-100'
            }`}
          >
            <EyeOff className="w-4.5 h-4.5" />
            Jogos Ocultados ({hiddenGames.length})
          </button>
          <button
            onClick={() => setSubTab('history')}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold tracking-wide cursor-pointer transition ${
              subTab === 'history'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/25'
                : 'text-slate-400 dark:text-slate-400 dark:hover:bg-slate-800/55 hover:bg-slate-100'
            }`}
          >
            <History className="w-4.5 h-4.5" />
            Histórico de Atividade
          </button>
        </div>
      </div>

      {/* Profile Form Details Tab Panel Content */}
      <div className={`lg:col-span-3 p-6 rounded-2xl border flex flex-col justify-between ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          {subTab === 'profile' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-150 flex items-center gap-1.5">
                  <User className="w-5 h-5 text-indigo-500" />
                  Editar Preferências do Perfil VIP "NKG"
                </h3>
                <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  PLANO RECORRENTE ATIVO
                </span>
              </div>

              <div className="space-y-3">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-semibold">Nome para Visualização Gamer</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-150 text-sm p-3 rounded-xl focus:outline-none focus:border-indigo-600 transition"
                    placeholder="Ex: GhostRider"
                  />
                </div>

                {/* Subtag Select Avatar */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase font-semibold">Selecione seu Avatar Gamer</label>
                  <div className="flex gap-3">
                    {sampleAvatars.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAvatar(url)}
                        className={`p-1.5 rounded-full border-2 transition cursor-pointer ${
                          avatar === url ? 'border-amber-500 scale-110' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt="avatar sample" className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Biography Editor */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-semibold">Sua Biografia / Slogan</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-150 text-sm p-3 rounded-xl focus:outline-none focus:border-indigo-600 transition resize-none leading-relaxed"
                    placeholder="Deixe os outros jogadores da comunidade conhecerem mais sobre suas conquistas..."
                  />
                </div>

              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-slate-100 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-indigo-600/10"
                >
                  <Save className="w-4 h-4" />
                  Salvar Perfil VIP
                </button>
              </div>

            </div>
          )}

          {subTab === 'pc' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-150 flex items-center gap-1.5">
                  <Monitor className="w-5 h-5 text-indigo-500" />
                  Especificações de Hardware do seu PC
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Configure as peças do seu PC abaixo. Nossa tecnologia NKG fará a verificação em tempo real nos jogos cadastrados para alertar se sua máquina atende às exigências mínimas e recomendadas de hardware!
                </p>
              </div>

              <div className="space-y-4">
                
                {/* OS */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-semibold">Sistema Operacional (OS)</label>
                  <select
                    value={pcSpecs.os}
                    onChange={(e) => handlePCSpecChange('os', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs p-3 rounded-xl focus:outline-none"
                  >
                    <option value="Windows 10 64-bit">Windows 10 64-bit</option>
                    <option value="Windows 11 64-bit">Windows 11 64-bit</option>
                    <option value="macOS Big Sur 64-bit">macOS Big Sur 64-bit</option>
                    <option value="Linux Debian / Ubuntu 64-bit">Linux Debian/Ubuntu 64-bit</option>
                  </select>
                </div>

                {/* Processor (CPU) */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-semibold">Processador (CPU)</label>
                  <select
                    value={pcSpecs.cpu}
                    onChange={(e) => handlePCSpecChange('cpu', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs p-3 rounded-xl focus:outline-none"
                  >
                    <option value="Low-End i3">Low-End Intel Core i3 / AMD Ryzen 3 (Fraco)</option>
                    <option value="Mid-End i5/Ryzen 5">Mid-End Intel Core i5 / AMD Ryzen 5 (Médio)</option>
                    <option value="High-End i7/Ryzen 7">High-End Intel Core i7 / AMD Ryzen 7 (Forte / Recomendado)</option>
                    <option value="Ultra-End i9/Ryzen 9">Ultra-End Intel Core i9 / AMD Ryzen 9 (Poder Máximo)</option>
                  </select>
                </div>

                {/* Graphics Card (GPU) */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-semibold">Placa de Vídeo (GPU)</label>
                  <select
                    value={pcSpecs.gpu}
                    onChange={(e) => handlePCSpecChange('gpu', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs p-3 rounded-xl focus:outline-none"
                  >
                    <option value="GTX 1050 / RX 560 (Fraca)">NVIDIA GTX 1050 / AMD RX 560 (Superando Mínimo de Entrada)</option>
                    <option value="GTX 1660 / RX 580 (Média)">NVIDIA GTX 1660 / AMD RX 580 (Intermediária / 1080p Completo)</option>
                    <option value="RTX 3060 / RX 6600 (Recomendada)">NVIDIA RTX 3060 / AMD RX 6600 (Excelente / Raytracing / DLSS)</option>
                    <option value="RTX 4080 / RX 7900 XTX (Cortes Rápidos)">NVIDIA RTX 4080 / AMD RX 7900 (Sem limites / 4K Ultra e Traçado de Caminho)</option>
                  </select>
                </div>

                {/* RAM Quantity */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-mono text-slate-400 uppercase font-semibold">Memória RAM Cadastrada</label>
                    <span className="text-sm font-black font-mono text-indigo-500">{pcSpecs.ram} GB DDR4/DDR5</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={64}
                    step={4}
                    value={pcSpecs.ram}
                    onChange={(e) => handlePCSpecChange('ram', parseInt(e.target.value))}
                    className="w-full accent-indigo-600 bg-slate-950 cursor-pointer h-1.5 rounded-lg border border-slate-850"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-1">
                    <span>4 GB (Mínimo de Escritório)</span>
                    <span>16 GB (Recomendado Gamers)</span>
                    <span>32 GB (Trabalho/Ultra Jogos)</span>
                    <span>64 GB (Servidores/Desenvolvedor)</span>
                  </div>
                </div>

              </div>

              <div className="bg-indigo-600/10 border border-indigo-500/25 rounded-xl p-3.5 flex gap-2.5 items-start mt-3">
                <AlertCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <p className="text-xs text-indigo-300 leading-normal">
                  Seu PC está atualmente classificado como <strong className="text-indigo-400 font-bold">Gamer de Alta Performance</strong>! Ao navegar pela lista de jogos na plataforma, o NKG listará automaticamente em cada card se a máquina é elegível para rodar as configurações recomendadas.
                </p>
              </div>

            </div>
          )}

          {subTab === 'notifications' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-150 flex items-center gap-1.5">
                  <Bell className="w-5 h-5 text-indigo-500" />
                  Central de Notificações e Alertas Gamers
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Gerencie seus canais de alerta pessoal da plataforma NKG para receber novidades no e-mail ou no navegador.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                
                {/* Switch Email Alerts */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition ${
                  darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-150'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Notificações por E-mail Personalizadas</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5 max-w-md">
                        Envia alertas em tempo real no seu e-mail cadastrado (<span className="text-indigo-400 underline">{user.email}</span>) quando jogos na sua **Lista de Desejos** entrarem em promoção ou tiverem queda de preço nas lojas monitoradas.
                      </p>
                    </div>
                  </div>
                  
                  {/* Toggle button */}
                  <button
                    onClick={handleToggleEmailAlerts}
                    className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer ${
                      user.emailAlerts ? 'bg-indigo-600 flex justify-end' : 'bg-slate-800 flex justify-start'
                    }`}
                  >
                    <span className="w-4.5 h-4.5 rounded-full bg-slate-100 float-right"></span>
                  </button>
                </div>

                {/* Switch Push Alerts */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition ${
                  darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-150'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Notificações Push Inteligentes de Compatibilidade</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5 max-w-md">
                        O algoritmo NKG analisará novos lançamentos no calendário de jogos. Se houver novas saídas de jogos e elas forem 100% compatíveis com suas peças do PC, você receberá um push virtual contendo o selo de validação!
                      </p>
                    </div>
                  </div>
                  
                  {/* Toggle button */}
                  <button
                    onClick={handleTogglePushAlerts}
                    className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer ${
                      user.pushAlerts ? 'bg-indigo-600 flex justify-end' : 'bg-slate-800 flex justify-start'
                    }`}
                  >
                    <span className="w-4.5 h-4.5 rounded-full bg-slate-100 float-right"></span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {subTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100 dark:text-slate-150 flex items-center gap-1.5">
                    <ShoppingBag className="w-5 h-5 text-indigo-500" />
                    Lista de Desejos ({wishlistGames.length})
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Monitore estoque de chaves de lançamento e preços baixos em tempo real das maiores vitrines.
                  </p>
                </div>
              </div>

              {wishlistGames.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/20 rounded-xl border border-dashed border-slate-800">
                  <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Sua lista de desejos NKG está vazia.</p>
                  <p className="text-xs text-slate-500 mt-1">Ao visualizar qualquer game de nosso catálogo, clique em "Adicionar à Lista de Desejos" para monitorar descontos!</p>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  {wishlistGames.map((game) => {
                    const sortedStores = [...game.stores].sort((a,b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
                    const bestDeals = sortedStores[0];
                    const activePromo = bestDeals.promoPrice !== undefined;

                    return (
                      <div key={game.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition ${
                        darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-150'
                      }`}>
                        
                        {/* Game overview info */}
                        <div className="flex items-center gap-3">
                          <img src={game.coverImage} alt={game.title} className="w-12 h-14 object-cover rounded-lg" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="text-sm font-bold text-slate-100">{game.title}</h4>
                            <div className="flex gap-1.5 items-center mt-1">
                              {game.tags.slice(0, 2).map((t, idx) => (
                                <span key={idx} className="text-[9px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase font-bold">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Inventory & Lowest prices monitor */}
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-1.5 sm:justify-end text-[10px] font-mono mb-1">
                            <span className="text-slate-400">Chaves:</span>
                            <span className={`px-2 py-0.5 font-bold rounded uppercase tracking-wider text-[8px] ${
                              bestDeals.stockStatus === 'Em Estoque'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {bestDeals.stockStatus}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5 justify-start sm:justify-end">
                            <span className="text-xs text-slate-500 font-mono">Melhor Loja: {bestDeals.storeName}</span>
                            <span className="text-sm font-black font-semibold text-green-400 font-mono">
                              R$ {(bestDeals.promoPrice !== undefined ? bestDeals.promoPrice : bestDeals.price).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => onSelectGame(game.id)}
                            className="flex-grow sm:flex-grow-0 text-center px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold rounded-lg transition"
                          >
                            Ver Ofertas
                          </button>
                          <button
                            onClick={() => handleRemoveWishlist(game.id)}
                            className="p-2 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition cursor-pointer"
                            title="Remover da Lista"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {subTab === 'hidden' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-150 flex items-center gap-1.5">
                  <EyeOff className="w-5 h-5 text-indigo-500" />
                  Histórico de Jogos Ocultados (Ocultar futuro)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Estes títulos listados foram marcados com "Não quero ver futuramente". Eles foram ocultados do seu catálogo central e não aparecerão mais na sua página inicial!
                </p>
              </div>

              {hiddenGames.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/20 rounded-xl border border-dashed border-slate-800">
                  <EyeOff className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Nenhum jogo ocultado na sua lista.</p>
                  <p className="text-xs text-slate-500 mt-1">Você pode ignorar qualquer jogo clicando em "Ver detalhes" e escolhendo "Esconder este Jogo".</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {hiddenGames.map((game) => (
                    <div key={game.id} className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={game.coverImage} alt={game.title} className="w-8 h-10 object-cover rounded-lg opacity-60" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-350">{game.title}</h4>
                          <span className="text-[9px] font-mono text-slate-500 uppercase">Bloqueado para recomendações</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnhideGame(game.id)}
                        className="text-xs font-bold text-indigo-500 hover:text-indigo-400 underline cursor-pointer pr-2"
                      >
                        Desbloquear / Mostrar Novamente
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {subTab === 'history' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-150 flex items-center gap-1.5">
                  <History className="w-5 h-5 text-indigo-500" />
                  Seu Histórico de Atividades NKG
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Linha do tempo registrando suas conquistas compartilhadas, comentários e configurações de hardware ao longo da conta.
                </p>
              </div>

              {user.activityHistory.length === 0 ? (
                <div className="text-center p-8 text-slate-500 bg-slate-950/25 rounded-xl">
                  Histórico vazio. Suas atividades farão log aqui na hora!
                </div>
              ) : (
                <div className="relative pl-4 space-y-4 border-l border-slate-800">
                  {user.activityHistory.map((item) => (
                    <div key={item.id} className="relative">
                      {/* Circle bullet */}
                      <span className="absolute -left-[20.5px] top-1.5 w-3 h-3 rounded-full bg-indigo-600 border border-slate-900 ring-2 ring-indigo-505"></span>
                      <span className="text-[10px] font-mono text-slate-500 block mb-0.5">{item.date}</span>
                      <p className="text-xs text-slate-200 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {isSavedAlert && (
          <div className="mt-4 p-2.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl text-center font-bold">
            ✓ Configurações salvas e aplicadas com sucesso pelo servidor NKG!
          </div>
        )}

      </div>
    </div>
  );
}
