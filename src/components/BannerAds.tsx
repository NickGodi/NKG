/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Sparkles } from 'lucide-react';

interface BannerAdsProps {
  onUnlockVip: () => void;
  layout?: 'sidebar' | 'inline';
}

export default function BannerAds({ onUnlockVip, layout = 'inline' }: BannerAdsProps) {
  const adCampaigns = [
    {
      title: 'Monitore Gamer Extremo',
      desc: 'Sua gameplay a 360Hz com tempo de resposta de 0.5ms. Compre agora com 15% de desconto no cupom NKG360.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=200',
      brand: 'TitanVision'
    },
    {
      title: 'Cadeira Ergonômica Throne-X',
      desc: 'Ergonomia de nível premium para sessões longas de gameplay. Testado e aprovado por streamers profissionais.',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fce6e?auto=format&fit=crop&q=80&w=200',
      brand: 'Aerocool Pro'
    }
  ];

  const campaign = adCampaigns[0];

  if (layout === 'sidebar') {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-500/30 p-4 rounded-xl flex flex-col justify-between h-full relative overflow-hidden group">
        <div className="absolute top-2 right-2 bg-amber-500/20 text-amber-300 text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
          Patrocinado
        </div>
        <div>
          <div className="text-xs font-mono text-amber-400 font-bold mb-1">{campaign.brand}</div>
          <h4 className="text-sm font-sans font-bold text-slate-100 group-hover:text-amber-300 transition-colors">{campaign.title}</h4>
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-24 object-cover my-2 rounded-lg border border-slate-700/50"
            referrerPolicy="no-referrer"
          />
          <p className="text-xs text-slate-400 leading-relaxed font-sans">{campaign.desc}</p>
        </div>
        <button
          onClick={onUnlockVip}
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          Remover Anúncios (VIP)
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/20 border border-slate-700/50 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden shadow-md">
      <div className="absolute top-2 right-2 bg-slate-700 text-slate-300 text-[9px] uppercase tracking-widest font-mono px-1 rounded-sm">
        Anúncio Limitado (Conta Grátis)
      </div>
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-16 h-16 object-cover rounded-lg border border-slate-700 flex-shrink-0"
        referrerPolicy="no-referrer"
      />
      <div className="text-center sm:text-left flex-grow">
        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-bold mb-0.5 block">{campaign.brand}</span>
        <h4 className="text-sm font-sans font-bold text-slate-200">{campaign.title}</h4>
        <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-1 sm:line-clamp-none">{campaign.desc}</p>
      </div>
      <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
        <button
          onClick={onUnlockVip}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-extrabold rounded-lg flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          Seja VIP para Remover
        </button>
      </div>
    </div>
  );
}
