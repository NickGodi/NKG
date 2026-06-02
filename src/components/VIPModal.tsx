/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Flame, X, ShieldAlert, Award, Gamepad2, Settings } from 'lucide-react';

interface VIPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeSuccess: (name: string, email: string) => void;
}

export default function VIPModal({ isOpen, onClose, onSubscribeSuccess }: VIPModalProps) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [cardNo, setCardNo] = useState('4444 •••• •••• 8888');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'benefits' | 'checkout'>('benefits');

  const benefits = [
    { title: 'Remoção de Anúncios', desc: 'Navegação 100% limpa, rápida e sem popups disruptivos.', icon: Sparkles, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { title: 'Criação de Perfil Customizado', desc: 'Histórico de conquistas, bio customizada, avatar gamer único.', icon: Award, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { title: 'Verificador de Requisitos PC', desc: 'Defina suas peças e veja se qualquer jogo roda na sua máquina!', icon: Settings, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Salvar Favoritos & Lista de Desejos', desc: 'Monitore estoques, descontos de lojas e organize seus jogos.', icon: Gamepad2, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { title: 'Fórum de Discussão & Rede Social', desc: 'Publique ótimos tópicos, compartilhe suas mídias e conquistas gamers.', icon: Flame, color: 'text-violet-400 bg-violet-500/10 border-violet-500/10' },
    { title: 'Suporte Técnico em Chat Vivo', desc: 'Tire dúvidas sobre erros de jogos com nosso analista técnico NKG.', icon: ShieldAlert, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      alert('Por favor, preencha o seu nome e e-mail!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onSubscribeSuccess(userName, userEmail);
      setIsSubmitting(false);
      setStep('benefits');
      setUserName('');
      setUserEmail('');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80">
        {/* Backdrop dismiss */}
        <div className="absolute inset-0 cursor-default" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-amber-500/20 to-indigo-500/10 border-b border-slate-800 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h2 className="text-xl font-bold font-sans text-slate-100 uppercase tracking-wide">
                NKG VIP Club — Plano Mensal
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 px-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[80vh] font-sans">
            {step === 'benefits' ? (
              <div>
                <div className="text-center mb-6">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
                    Acesso Premium Exclusivo
                  </span>
                  <h3 className="text-2xl font-black text-slate-100 mt-2">Personalize, Monitore e Compartilhe</h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
                    Conecte-se com a comunidade, verifique compatibilidade de PC instantaneamente e salve seus melhores títulos por apenas <strong className="text-amber-400">R$ 14,90/mês</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="flex gap-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 align-top">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 ${b.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">{b.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-slate-800 pt-5 mt-4">
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-slate-400 font-mono">Assinatura mensal recorrente</span>
                    <div className="text-2xl font-black text-slate-200">
                      R$ 14,90 <span className="text-xs font-normal text-slate-400">/mês</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-md shadow-amber-500/10"
                  >
                    Ativar Assinatura NKG VIP
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-slate-100">Finalizar Conta VIP NKG</h3>
                  <p className="text-xs text-slate-400">Insira as informações de cadastro e simulação de pagamento.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Nome de Usuário Gamer *</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm p-3 rounded-lg focus:outline-none focus:border-amber-500/50"
                      placeholder="Ex: RangerVoz, ShadowBlade99"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">E-mail para Alertas de Jogos *</label>
                    <input
                      type="email"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm p-3 rounded-lg focus:outline-none focus:border-amber-500/50"
                      placeholder="seuemail@exemplo.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-mono text-slate-400 mb-1">Número de Cartão Simulado</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-400 text-sm p-3 rounded-lg focus:outline-none"
                        value={cardNo}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex gap-2.5 items-start mt-2">
                    <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-amber-300 leading-normal">
                      Esta é uma transação de simulação. Ao confirmar, seu e-mail será ativado com os direitos virtuais do NKG VIP Club e você poderá usufruir de todas as ferramentas de comunidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep('benefits')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition"
                    disabled={isSubmitting}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        Processando...
                      </>
                    ) : (
                      <>
                        Confirmar R$ 14,90 / mês
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
