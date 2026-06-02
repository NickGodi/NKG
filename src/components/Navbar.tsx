/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Sun, Moon, Sparkles, User, LogOut, Code, Flame, Calendar, Gamepad2, Users2, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'games' | 'upcoming' | 'forum' | 'social' | 'profile';
  setActiveTab: (tab: 'games' | 'upcoming' | 'forum' | 'social' | 'profile') => void;
  user: UserProfile | null;
  onOpenVipModal: () => void;
  onLogout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  user,
  onOpenVipModal,
  onLogout,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode
}: NavbarProps) {

  return (
    <header className={`sticky top-0 z-30 transition-colors duration-200 border-b ${
      darkMode ? 'bg-slate-900/95 backdrop-blur-md border-slate-800 text-slate-100' : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Brand */}
          <div className="flex lg:hidden items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => setActiveTab('games')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-lg text-slate-100 italic tracking-tighter shadow-md shadow-indigo-600/20 hover:scale-105 transition-transform duration-200">
              NKG
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-lg tracking-wider font-sans bg-gradient-to-r from-indigo-500 to-amber-500 bg-clip-text text-transparent">
                NKG PORTAL
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1 font-bold">Gaming Hub 2026</span>
            </div>
          </div>

          {/* Core Navigation Items */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1 font-semibold text-sm">
            <button
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition ${
                activeTab === 'games'
                  ? 'bg-indigo-600/10 text-indigo-500'
                  : 'hover:bg-slate-100 font-normal dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Jogos
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition ${
                activeTab === 'upcoming'
                  ? 'bg-indigo-600/10 text-indigo-500'
                  : 'hover:bg-slate-100 font-normal dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Lançamentos
            </button>
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition ${
                activeTab === 'forum'
                  ? 'bg-indigo-600/10 text-indigo-500'
                  : 'hover:bg-slate-100 font-normal dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Users2 className="w-4 h-4" />
              Fóruns
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition ${
                activeTab === 'social'
                  ? 'bg-indigo-600/10 text-indigo-500'
                  : 'hover:bg-slate-100 font-normal dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Flame className="w-4 h-4" />
              Rede Social
            </button>
          </nav>

          {/* Search bar inside header when 'games' is showing */}
          <div className="flex-grow max-w-xs relative hidden md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Buscar jogo por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full text-xs pl-9 pr-4 py-2 rounded-xl focus:outline-none transition border ${
                darkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-600'
                  : 'bg-slate-100 border-slate-200 text-slate-900 focus:border-indigo-500'
              }`}
            />
          </div>

          {/* Settings & Profile Area */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 cursor-pointer ${
                darkMode ? 'bg-slate-950 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
              title={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Account controls */}
            {user && user.isVip ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition duration-200 cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                      : darkMode ? 'bg-slate-950 border-slate-800 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                  <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-1 py-0.5 rounded uppercase">VIP</span>
                </button>
                
                <button
                  onClick={onLogout}
                  className={`p-2 rounded-xl transition cursor-pointer ${
                    darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-red-400' : 'hover:bg-slate-100 text-slate-400 hover:text-red-600'
                  }`}
                  title="Sair do Perfil"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenVipModal}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-extrabold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10 transition active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                Criar Perfil VIP
              </button>
            )}

          </div>

        </div>

        {/* Mobile menu rail for active tabs */}
        <div className="flex lg:hidden justify-around items-center border-t border-slate-800/10 dark:border-slate-800/60 py-2.5 font-bold text-xs font-sans">
          <button
            onClick={() => setActiveTab('games')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'games' ? 'text-indigo-500' : 'text-slate-400'}`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Jogos</span>
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'upcoming' ? 'text-indigo-500' : 'text-slate-400'}`}
          >
            <Calendar className="w-4 h-4" />
            <span>Lançamentos</span>
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'forum' ? 'text-indigo-500' : 'text-slate-400'}`}
          >
            <Users2 className="w-4 h-4" />
            <span>Fórum</span>
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'social' ? 'text-indigo-500' : 'text-slate-400'}`}
          >
            <Flame className="w-4 h-4" />
            <span>Social</span>
          </button>
          {user && (
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'profile' ? 'text-indigo-500' : 'text-slate-400'}`}
            >
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
