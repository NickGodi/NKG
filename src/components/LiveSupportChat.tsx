/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, ShieldAlert, Sparkles, User, Monitor } from 'lucide-react';
import { TechSupportMessage, UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LiveSupportChatProps {
  user: UserProfile | null;
  onOpenVipModal: () => void;
}

export default function LiveSupportChat({ user, onOpenVipModal }: LiveSupportChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TechSupportMessage[]>([
    {
      id: 'init',
      sender: 'agent',
      text: 'Olá! Sou o assistente técnico NKG. Como posso ajudar você hoje com dúvidas sobre requisitos de PC, promoções ou fórum?',
      time: 'Agora'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!user || !user.isVip) {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'system',
          text: 'Suporte Técnico via Chat ao Vivo é um benefício exclusivo para assinantes VIP NKG.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setInput('');
      return;
    }

    const userMsgText = input;
    const userMsg: TechSupportMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated reply trigger
    setTimeout(() => {
      let replyText = 'Interessante! O suporte NKG está analisando sua mensagem. Se precisar ajustar a compatibilidade, não esqueça de usar nossa aba "Meu Perfil"!';
      const txt = userMsgText.toLowerCase();

      if (txt.includes('fps') || txt.includes('lento') || txt.includes('gargalo') || txt.includes('desempenho') || txt.includes('trava')) {
        replyText = 'Dica de Desempenho: Instale sempre seus jogos no SSD. Se estiver com baixo FPS, use as configurações do perfil na NKG para verificar se sua RAM ou GPU estão de acordo com as especificações recomendadas.';
      } else if (txt.includes('vip') || txt.includes('assinatura') || txt.includes('recorrente') || txt.includes('pagamento')) {
        replyText = 'Sua assinatura VIP NKG de R$ 14,90/mês está ativa! Ela remove 100% dos anúncios e permite gerenciar favoritos, forum, rede social e receber notificações inteligentes.';
      } else if (txt.includes('requisito') || txt.includes('cpu') || txt.includes('gpu') || txt.includes('placa') || txt.includes('ram')) {
        replyText = `Análise de Hardware: O verificador NKG lê as peças que você salvou no seu perfil (${user.pcSpecs.cpu} | ${user.pcSpecs.gpu} | ${user.pcSpecs.ram}GB RAM) e compara com os dados de sistema mínimos/recomendados dos jogos em tempo real!`;
      } else if (txt.includes('preço') || txt.includes('promo') || txt.includes('desconto') || txt.includes('steam') || txt.includes('epic') || txt.includes('nuuvem') || txt.includes('gog')) {
        replyText = 'Monitoramento do Estoque: Nosso comparador de preços em tempo real atualiza os valores na hora. É comum vermos ofertas excelentes na Nuuvem e GOG agora em 2026. Fique ligado nos badges "Preço Mais Baixo"!';
      } else if (txt.includes('chat') || txt.includes('suporte') || txt.includes('ajuda') || txt.includes('erro')) {
        replyText = 'Estamos aqui pra te ajudar! Se algum título do comparador estiver quebrado, por favor envie o nome que entraremos em contato direto com a publicadora.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-4 py-3 rounded-full shadow-2xl relative group cursor-pointer transition active:scale-[0.97]"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm">Suporte NKG Vivo</span>
            {user?.isVip && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-slate-100 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full border border-indigo-500">
                VIP
              </span>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.93 }}
            className="w-80 sm:w-96 h-[480px] bg-slate-900 border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Thread Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="text-xs font-mono text-slate-300 uppercase tracking-widest">NKG Technical Live</h4>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                    Atendente Suporte
                    {user?.isVip && <Sparkles className="w-3 h-3 text-amber-400 fill-current" />}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800 rounded transition"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat list */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-950/60 font-sans">
              {messages.map((m) => {
                const isAgent = m.sender === 'agent';
                const isSystem = m.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={m.id} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
                      <ShieldAlert className="w-4.5 h-4.5 text-amber-400 mx-auto mb-1" />
                      <p className="text-xs text-amber-300 font-medium">{m.text}</p>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenVipModal();
                        }}
                        className="mt-2 text-[10px] font-bold uppercase underline text-amber-400 hover:text-amber-300 transition"
                      >
                        Assine NKG VIP agora
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mb-0.5">
                      {isAgent ? (
                        <>
                          <Monitor className="w-2.5 h-2.5 text-amber-500" />
                          <span>Analista NKG • {m.time}</span>
                        </>
                      ) : (
                        <>
                          <span>Você ({user?.name || 'Visitante'}) • {m.time}</span>
                          <User className="w-2.5 h-2.5 text-indigo-400" />
                        </>
                      )}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                        isAgent
                          ? 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/50'
                          : 'bg-indigo-600 text-slate-100 rounded-tr-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mb-0.5">
                    <Monitor className="w-2.5 h-2.5 text-amber-500" />
                    <span>Digitando resposta...</span>
                  </div>
                  <div className="bg-slate-800/60 px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-850 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
              <input
                type="text"
                placeholder={user?.isVip ? "Digite sua dúvida de hardware/promoções..." : "Chat reservado para usuários VIP..."}
                disabled={!user?.isVip}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-850 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 rounded-xl focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!user?.isVip && !input?.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 text-slate-100 p-2.5 rounded-xl transition flex items-center justify-center cursor-pointer disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
