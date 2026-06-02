/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SocialPost, SocialReply, UserProfile } from '../types';
import { Heart, MessagesSquare, Send, Sparkles, Trophy, MessageCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialFeedProps {
  user: UserProfile | null;
  socialPosts: SocialPost[];
  onAddNewPost: (content: string, gameTitle?: string, achieveTitle?: string) => void;
  onLikePost: (postId: string) => void;
  onPostSocialComment: (postId: string, text: string) => void;
  onOpenVipModal: () => void;
  darkMode: boolean;
}

export default function SocialFeed({
  user,
  socialPosts,
  onAddNewPost,
  onLikePost,
  onPostSocialComment,
  onOpenVipModal,
  darkMode
}: SocialFeedProps) {

  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Form states to write a post
  const [newPostText, setNewPostText] = useState('');
  const [postGameTitle, setPostGameTitle] = useState('');
  const [postAchievement, setPostAchievement] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.isVip) {
      onOpenVipModal();
      return;
    }
    if (!newPostText.trim()) return;

    onAddNewPost(newPostText, postGameTitle || undefined, postAchievement || undefined);
    setNewPostText('');
    setPostGameTitle('');
    setPostAchievement('');
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!user || !user.isVip) {
      onOpenVipModal();
      return;
    }
    if (!commentInput.trim()) return;

    onPostSocialComment(postId, commentInput);
    setCommentInput('');
    setActiveReplyPostId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
      
      {/* Post creator form */}
      <div className="lg:col-span-1 space-y-4">
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="border-b border-slate-800/10 dark:border-slate-800 pb-3 mb-4">
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
              <Trophy className="w-5 h-5 text-amber-400" />
              Compartilhar Conquista
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Mostre para a NKG que você detonou o chefe mais difícil ou platinou aquele título fantástico!
            </p>
          </div>

          {user && user.isVip ? (
            <form onSubmit={handlePostSubmit} className="space-y-3 font-sans">
              
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">O que você realizou? *</label>
                <textarea
                  rows={3}
                  required
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Ex: Peguei nível máximo e completei todas as missões lendárias!"
                  className="w-full bg-slate-950 border border-slate-850 p-3 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">Nome do Jogo (Opcional)</label>
                <input
                  type="text"
                  value={postGameTitle}
                  onChange={(e) => setPostGameTitle(e.target.value)}
                  placeholder="Ex: Elden Ring"
                  className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-slate-100 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">Título da Conquista / Troféu (Opcional)</label>
                <input
                  type="text"
                  value={postAchievement}
                  onChange={(e) => setPostAchievement(e.target.value)}
                  placeholder="Ex: 🏆 Platina Pura"
                  className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-slate-100 text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold py-2.5 rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5"
                >
                  Postar no Feed Social
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center p-4 border border-amber-500/25 bg-amber-500/5 rounded-xl">
              <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <h4 className="text-xs font-black text-slate-150 uppercase tracking-widest">Acesso de Rede Limitado</h4>
              <p className="text-xs text-slate-400 my-2 leading-relaxed">Apenas membros com cadastro VIP NKG conseguem postar e participar da rede social.</p>
              <button
                onClick={onOpenVipModal}
                className="mt-1 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-2 rounded-lg transition"
              >
                Ativar NKG VIP
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Social post list */}
      <div className="lg:col-span-2 space-y-4">
        
        {socialPosts.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/20 border border-slate-800 rounded-xl">
            Sem posts ainda. Publique algo para estrear a rede social NKG!
          </div>
        ) : (
          <div className="space-y-4 font-sans">
            {socialPosts.map((post) => (
              <div
                key={post.id}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                
                {/* Header author info */}
                <div className="flex gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-800 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-200">{post.author}</span>
                      {post.authorVip && (
                        <span className="bg-amber-500 text-slate-950 text-[8px] font-black px-1.5 rounded uppercase tracking-wider">
                          VIP
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{post.date}</span>
                  </div>
                </div>

                {/* Badges Game/Achievement */}
                {(post.gameTitle || post.achievementTitle) && (
                  <div className="mt-3 flex gap-2 flex-wrap text-[10px] font-mono leading-none align-middle font-bold">
                    {post.gameTitle && (
                      <span className="bg-slate-950/60 border border-slate-800 text-slate-400 px-2 py-1 rounded">
                        🎮 {post.gameTitle}
                      </span>
                    )}
                    {post.achievementTitle && (
                      <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded flex items-center gap-1">
                        🏆 {post.achievementTitle}
                      </span>
                    )}
                  </div>
                )}

                {/* Content text */}
                <div className="mt-4 text-sm text-slate-300 dark:text-slate-300 leading-relaxed font-sans pl-1 border-l-2 border-indigo-500/20 bg-slate-950/10 p-3 rounded-r-lg relative">
                  <Quote className="absolute top-1 right-2 w-10 h-10 opacity-5 text-slate-400" />
                  {post.content}
                </div>

                {/* Footer Reactions counters */}
                <div className="flex gap-4 items-center justify-start mt-4 pt-3 border-t border-slate-800/10 dark:border-slate-800/60 text-xs font-mono">
                  
                  {/* Like Action */}
                  <button
                    onClick={() => {
                      if (!user || !user.isVip) {
                        onOpenVipModal();
                        return;
                      }
                      onLikePost(post.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer transition ${
                      user && post.likedBy.includes(user.name)
                        ? 'bg-rose-500/10 text-rose-500 font-bold'
                        : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${user && post.likedBy.includes(user.name) ? 'fill-current' : ''}`} />
                    <span>{post.likes} Curtidas</span>
                  </button>

                  {/* Comment Action Toggle */}
                  <button
                    onClick={() => {
                      if (activeReplyPostId === post.id) {
                        setActiveReplyPostId(null);
                      } else {
                        setActiveReplyPostId(post.id);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 cursor-pointer transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies.length} Comentários</span>
                  </button>

                </div>

                {/* Sub Comments Thread */}
                {post.replies.length > 0 && (
                  <div className="mt-3 bg-slate-950/20 rounded-xl p-3.5 border border-slate-850 space-y-2.5 font-sans">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2.5 border-b border-slate-900/10 dark:border-slate-800/20 pb-2 last:border-0 last:pb-0">
                        <img src={reply.authorAvatar} alt={reply.author} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <span className="font-bold text-slate-300">{reply.author}</span>
                            {reply.authorVip && (
                              <span className="text-[7px] bg-amber-500 text-slate-950 font-black px-1 rounded uppercase">VIP</span>
                            )}
                            <span className="text-slate-500 font-mono">{reply.date}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-normal mt-0.5">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment typings form */}
                {activeReplyPostId === post.id && (
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, post.id)}
                    className="mt-3 flex gap-2 pt-2 border-t border-slate-900/10 dark:border-slate-800/35"
                  >
                    <input
                      type="text"
                      required
                      placeholder={user?.isVip ? "Digite um comentário camarada..." : "Apenas VIPs podem comentar..."}
                      disabled={!user?.isVip}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="flex-grow bg-slate-950 border border-slate-850 px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 rounded-lg focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!user?.isVip}
                      className="bg-indigo-600 text-slate-100 hover:bg-indigo-500 p-2 rounded-lg transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
