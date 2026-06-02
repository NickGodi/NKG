/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ForumTopic, ForumReply, UserProfile } from '../types';
import { MessageSquare, MessageCircle, Eye, User, Sparkles, FolderOpen, ArrowLeft, Plus, CornerDownRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ForumPanelProps {
  user: UserProfile | null;
  forumTopics: ForumTopic[];
  onAddNewTopic: (title: string, channel: any) => void;
  onPostReply: (topicId: string, text: string) => void;
  onOpenVipModal: () => void;
  darkMode: boolean;
}

export default function ForumPanel({
  user,
  forumTopics,
  onAddNewTopic,
  onPostReply,
  onOpenVipModal,
  darkMode
}: ForumPanelProps) {
  const [activeTopic, setActiveTopic] = useState<ForumTopic | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>('Todos');
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);

  // New topic state
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicChannel, setNewTopicChannel] = useState<'Geral' | 'Hardware/PC' | 'RPGs' | 'FPS/Competitivo' | 'Modding e Rumores'>('Geral');

  // New reply state
  const [replyText, setReplyText] = useState('');

  const channels = ['Todos', 'Geral', 'Hardware/PC', 'RPGs', 'FPS/Competitivo', 'Modding e Rumores'];

  const filteredTopics = selectedChannel === 'Todos'
    ? forumTopics
    : forumTopics.filter(t => t.channel === selectedChannel);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.isVip) {
      onOpenVipModal();
      return;
    }
    if (!newTopicTitle.trim()) return;

    onAddNewTopic(newTopicTitle, newTopicChannel);
    setNewTopicTitle('');
    setIsCreatingTopic(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.isVip) {
      onOpenVipModal();
      return;
    }
    if (!replyText.trim() || !activeTopic) return;

    onPostReply(activeTopic.id, replyText);
    setReplyText('');

    // Update active view after local post
    const updatedTopic = forumTopics.find(t => t.id === activeTopic.id);
    if (updatedTopic) {
      setActiveTopic(updatedTopic);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {activeTopic ? (
        /* Discussion Detail view */
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          
          {/* Back to Forum List */}
          <button
            onClick={() => setActiveTopic(null)}
            className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold hover:underline mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            Voltar para a Lista de Fóruns
          </button>

          {/* Topic header */}
          <div className="border-b border-slate-800/10 dark:border-slate-800 pb-4 mb-4">
            <span className="text-[10px] bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 px-2 py-0.5 rounded font-bold font-mono uppercase">
              {activeTopic.channel}
            </span>
            <h2 className="text-xl font-black mt-2 text-slate-100">{activeTopic.title}</h2>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
              <img
                src={activeTopic.authorAvatar}
                alt={activeTopic.author}
                className="w-5 h-5 rounded-full object-cover border border-indigo-500/35"
              />
              <span className="font-bold text-slate-300">{activeTopic.author}</span>
              {activeTopic.authorVip && (
                <span className="bg-amber-500 text-slate-950 font-black text-[8px] px-1 rounded uppercase">VIP</span>
              )}
              <span>• Criado em {activeTopic.date}</span>
            </div>
          </div>

          {/* Replies thread */}
          <div className="space-y-4 mb-6 pt-2">
            {activeTopic.replies.map((reply, i) => (
              <div key={reply.id} className="flex gap-4 p-4 rounded-xl bg-slate-950/20 border border-slate-850">
                <img
                  src={reply.authorAvatar}
                  alt={reply.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-800 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5 text-xs mb-1">
                    <span className="font-bold text-slate-200">{reply.author}</span>
                    {reply.authorVip && (
                      <span className="bg-amber-500 text-slate-950 text-[8px] font-black px-1 rounded uppercase">VIP Member</span>
                    )}
                    <span className="text-slate-500 font-mono text-[10px] ml-auto">{reply.date}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{reply.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Reply box */}
          {user && user.isVip ? (
            <form onSubmit={handlePostReply} className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <CornerDownRight className="w-4 h-4 text-indigo-500" />
                <span>Responder a este tópico como <strong className="text-indigo-400">{user.name}</strong></span>
              </div>
              <textarea
                rows={3}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escreva sua opinião, dica técnica ou reply respeitoso..."
                className="w-full bg-slate-950 border border-slate-850 p-4 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold rounded-xl transition"
                >
                  Enviar Resposta
                </button>
              </div>
            </form>
          ) : (
            <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-4 text-center">
              <MessageSquare className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
              <h4 className="text-sm font-bold text-slate-150">Gostaria de responder a esta discussão?</h4>
              <p className="text-xs text-slate-400 mt-1 mb-3">Apenas assinantes do NKG VIP Club conseguem publicar no fórum.</p>
              <button
                onClick={onOpenVipModal}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-lg transition"
              >
                Comprar NKG VIP R$14,90
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Topic list view */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Filter Sidebar */}
          <div className={`p-4 rounded-2xl border h-fit space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold pb-2 border-b border-slate-800/10 dark:border-slate-800/60">
              Categorias Fórum
            </h3>
            <div className="flex flex-col gap-1">
              {channels.map((chan) => (
                <button
                  key={chan}
                  onClick={() => setSelectedChannel(chan)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    selectedChannel === chan
                      ? 'bg-indigo-600/10 text-indigo-500'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{chan}</span>
                  <span className="text-[10px] font-mono font-medium text-slate-500">
                    ({chan === 'Todos' ? forumTopics.length : forumTopics.filter(t => t.channel === chan).length})
                  </span>
                </button>
              ))}
            </div>

            {user && user.isVip ? (
              <button
                onClick={() => setIsCreatingTopic(true)}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow transition"
              >
                <Plus className="w-4 h-4" />
                Criar Novo Tópico
              </button>
            ) : (
              <button
                onClick={onOpenVipModal}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow transition"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                Criar Tópico (VIP)
              </button>
            )}
          </div>

          {/* Topic feed */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Create Topic Modal Form (Inline) */}
            {isCreatingTopic && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border border-indigo-500/30 ${
                  darkMode ? 'bg-indigo-950/10' : 'bg-indigo-50/20'
                }`}
              >
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mb-3">
                  <MessageCircle className="w-4.5 h-4.5 text-indigo-500" />
                  Novo Tópico de Discussão
                </h3>
                <form onSubmit={handleCreateTopic} className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Título do seu Tópico</label>
                    <input
                      type="text"
                      required
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                      placeholder="Ex: Melhor placa pra jogar Cyberpunk em 2026?"
                      className="w-full bg-slate-950 border border-slate-850 p-3 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Canal de Discussão</label>
                    <select
                      value={newTopicChannel}
                      onChange={(e: any) => setNewTopicChannel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-300 text-xs p-3 rounded-xl"
                    >
                      <option value="Geral">Geral</option>
                      <option value="Hardware/PC">Hardware/PC</option>
                      <option value="RPGs">RPGs</option>
                      <option value="FPS/Competitivo">FPS/Competitivo</option>
                      <option value="Modding e Rumores">Modding e Rumores</option>
                    </select>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingTopic(false)}
                      className="px-3.5 py-1.5 text-slate-400 text-xs font-bold hover:bg-slate-800 rounded transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold rounded"
                    >
                      Criar Tópico
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {filteredTopics.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/20 rounded-xl border border-dashed border-slate-800">
                <FolderOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-semibold">Nenhum tópico encontrado neste canal.</p>
                <p className="text-xs text-slate-500 mt-1">Seja o primeiro a abrir um tópico clicando em Criar Novo Tópico acima!</p>
              </div>
            ) : (
              <div className="space-y-3 font-sans">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setActiveTopic(topic)}
                    className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer transition ${
                      darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/60' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider mr-2 font-mono">
                          {topic.channel}
                        </span>
                        <h4 className="text-sm font-bold text-slate-100 mt-1.5 hover:text-indigo-500 transition-colors">
                          {topic.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono">
                          <span>Criado por: {topic.author}</span>
                          {topic.authorVip && <span className="bg-amber-500 text-slate-950 text-[8px] font-black px-1 rounded uppercase">VIP</span>}
                          <span>• {topic.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono w-full md:w-auto mt-2 md:mt-0 justify-end flex-shrink-0 border-t border-slate-800/10 md:border-transparent pt-2 md:pt-0">
                      <div className="flex items-center gap-1.5" title="Visualizações">
                        <Eye className="w-4 h-4 text-slate-450" />
                        <span>{topic.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-indigo-500 font-bold" title="Respostas de Usuários">
                        <MessageCircle className="w-4 h-4 text-indigo-400" />
                        <span>{topic.repliesCount} replies</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
