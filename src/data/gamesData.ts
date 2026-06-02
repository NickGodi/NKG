/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Game } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    description: 'Um RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.',
    longDescription: 'Cyberpunk 2077 é uma história de ação e aventura em mundo aberto ambientada em Night City, uma megalópole obcecada por poder, glamour e biomodificações. Você joga como V, um mercenário fora da lei atrás de um implante único que carrega a chave da imortalidade. Você pode personalizar aparatos cibernéticos, conjunto de habilidades e estilo de jogo de seu personagem para explorar uma vasta cidade onde as decisões tomadas definem a história e o mundo ao seu redor.',
    trailerUrl: 'https://www.youtube.com/embed/8X2kIfS6fb8', // Cyberpunk 2077 official trailer
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['RPG', 'Ficção Científica', 'Mundo Aberto', 'Ação', 'Tiro'],
    rating: 4.6,
    ratingCount: 154,
    releaseDate: '2020-12-10',
    isUpcoming: false,
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Mid-End i5/Ryzen 5',
      gpu: 'GTX 1660 / RX 580 (Média)',
      ram: 12,
      storage: '70 GB SSD'
    },
    recRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'High-End i7/Ryzen 7',
      gpu: 'RTX 3060 / RX 6600 (Recomendada)',
      ram: 16,
      storage: '70 GB SSD'
    },
    stores: [
      { id: 'cp-steam', storeName: 'Steam', price: 199.90, promoPrice: 99.95, url: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/', stockStatus: 'Em Estoque' },
      { id: 'cp-epic', storeName: 'Epic Games', price: 199.90, promoPrice: 119.94, url: 'https://store.epicgames.com/pt-BR/p/cyberpunk-2077', stockStatus: 'Em Estoque' },
      { id: 'cp-gog', storeName: 'GOG', price: 199.00, promoPrice: 99.00, url: 'https://www.gog.com/game/cyberpunk_2077', stockStatus: 'Chaves Limitadas' },
      { id: 'cp-nuuvem', storeName: 'Nuuvem', price: 189.90, promoPrice: 89.90, url: 'https://www.nuuvem.com', stockStatus: 'Em Estoque' }
    ]
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    description: 'Levante-se, Maculado, e seja guiado pela graça para portar o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias.',
    longDescription: 'O NOVO RPG DE AÇÃO E FANTASIA. Levante-se, Maculado, e seja guiado pela graça para portar o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias. Um mundo vasto e emocionante onde campos abertos com uma variedade de situações e masmorras gigantescas com designs tridimensionais complexos se conectam perfeitamente. Conforme explora, a alegria de descobrir ameaças desconhecidas e impressionantes aguarda você, levando a uma grande sensação de conquista.',
    trailerUrl: 'https://www.youtube.com/embed/E3Huy2cdih0',
    coverImage: 'https://images.unsplash.com/photo-1655821888788-6107699e173b?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1655821888788-6107699e173b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['RPG', 'Fantasia', 'Souls-like', 'Difícil', 'Mundo Aberto'],
    rating: 4.9,
    ratingCount: 312,
    releaseDate: '2022-02-25',
    isUpcoming: false,
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Mid-End i5/Ryzen 5',
      gpu: 'GTX 1050 / RX 560 (Fraca)',
      ram: 12,
      storage: '60 GB'
    },
    recRequirements: {
      os: 'Windows 10/11 64-bit',
      cpu: 'High-End i7/Ryzen 7',
      gpu: 'RTX 3060 / RX 6600 (Recomendada)',
      ram: 16,
      storage: '60 GB SSD'
    },
    stores: [
      { id: 'er-steam', storeName: 'Steam', price: 229.90, promoPrice: 160.93, url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/', stockStatus: 'Em Estoque' },
      { id: 'er-epic', storeName: 'Epic Games', price: 229.90, url: 'https://store.epicgames.com', stockStatus: 'Esgotado' },
      { id: 'er-nuuvem', storeName: 'Nuuvem', price: 219.00, promoPrice: 155.00, url: 'https://www.nuuvem.com', stockStatus: 'Chaves Limitadas' },
      { id: 'er-gog', storeName: 'GOG', price: 229.90, url: 'https://www.gog.com', stockStatus: 'Esgotado' }
    ]
  },
  {
    id: 'hades-2',
    title: 'Hades II',
    description: 'Enfrente o Titã do Tempo na primeira sequência da premiada masmorra roguelike, usando magias antigas em batalhas pelo Submundo.',
    longDescription: 'Batalhe além do Submundo usando feitiçaria sombria para enfrentar o Titã do Tempo nesta sequência eletrizante do premiado roguelike de masmorras. Como Melinoë, a Princesa do Submundo, você explorará um mundo mitológico maior e mais profundo, derrotando as forças do Titã com todo o poder do Olimpo às suas costas, em uma história contínua que se desdobra a cada vitória e derrota.',
    trailerUrl: 'https://www.youtube.com/embed/6m6SnoR61bQ',
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['Roguelike', 'Indie', 'Ação', 'Mitologia', 'Rápido'],
    rating: 4.8,
    ratingCount: 89,
    releaseDate: '2024-05-06',
    isUpcoming: false,
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Low-End i3',
      gpu: 'GTX 1050 / RX 560 (Fraca)',
      ram: 8,
      storage: '10 GB'
    },
    recRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Mid-End i5/Ryzen 5',
      gpu: 'GTX 1660 / RX 580 (Média)',
      ram: 16,
      storage: '10 GB SSD'
    },
    stores: [
      { id: 'h2-steam', storeName: 'Steam', price: 88.99, url: 'https://store.steampowered.com/app/1145350/Hades_II/', stockStatus: 'Em Estoque' },
      { id: 'h2-epic', storeName: 'Epic Games', price: 88.99, url: 'https://store.epicgames.com', stockStatus: 'Em Estoque' }
    ]
  },
  {
    id: 'gta-6',
    title: 'Grand Theft Auto VI',
    description: 'O jogo mais aguardado de todos os tempos. Explore o estado ensolarado de Leonida, lar das ruas banhadas a neon de Vice City.',
    longDescription: 'Grand Theft Auto VI se passa no estado de Leonida, sede das ruas de Vice City repletas de neon e muito além, na maior e mais envolvente evolução da franquia Grand Theft Auto até hoje. Acompanhe a história de Lucia e Jason em um mundo de assaltos, conspirações e sátira extrema da sociedade moderna.',
    trailerUrl: 'https://www.youtube.com/embed/QdBZY2fkU-0',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['Ação', 'Mundo Aberto', 'Crime', 'Tiro', 'Lançamento'],
    rating: 5.0,
    ratingCount: 3120,
    releaseDate: '2026-11-20',
    isUpcoming: true,
    minRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'High-End i7/Ryzen 7',
      gpu: 'RTX 3060 / RX 6600 (Recomendada)',
      ram: 16,
      storage: '150 GB SSD'
    },
    recRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Ultra-End i9/Ryzen 9',
      gpu: 'RTX 4080 / RX 7900 XTX (Cortes Rápidos)',
      ram: 32,
      storage: '150 GB NVMe'
    },
    stores: [
      { id: 'gta-steam', storeName: 'Steam', price: 349.90, url: 'https://store.steampowered.com', stockStatus: 'Chaves Limitadas' },
      { id: 'gta-epic', storeName: 'Epic Games', price: 349.90, url: 'https://store.epicgames.com', stockStatus: 'Em Estoque' }
    ]
  },
  {
    id: 'silksong',
    title: 'Hollow Knight: Silksong',
    description: 'Explore uma vasta e antiga terra governada por seda e canções na sequência do aclamado metroidvania indie.',
    longDescription: 'Jogue como Hornet, princesa protetora de Hallownest, em sua própria aventura rumo a um reino totalmente novo, governado por seda e música! Capturada e levada para esta terra desconhecida, Hornet deve combater adversários e resolver mistérios enquanto sobe em uma peregrinação mortal até o topo cintilante do reino.',
    trailerUrl: 'https://www.youtube.com/embed/pFAknD_DXSM',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['Metroidvania', 'Difícil', 'Indie', 'Aventura', 'Plataforma', 'Lançamento'],
    rating: 4.9,
    ratingCount: 1240,
    releaseDate: '2026-09-15',
    isUpcoming: true,
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Low-End i3',
      gpu: 'GTX 1050 / RX 560 (Fraca)',
      ram: 8,
      storage: '15 GB'
    },
    recRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Mid-End i5/Ryzen 5',
      gpu: 'GTX 1660 / RX 580 (Média)',
      ram: 16,
      storage: '15 GB SSD'
    },
    stores: [
      { id: 'sk-steam', storeName: 'Steam', price: 99.00, url: 'https://store.steampowered.com', stockStatus: 'Em Estoque' },
      { id: 'sk-gog', storeName: 'GOG', price: 95.00, url: 'https://www.gog.com', stockStatus: 'Em Estoque' }
    ]
  },
  {
    id: 'witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    description: 'Geralt de Rívia, um caçador de monstros mercenário, deve encontrar a Criança da Profecia neste aclamado mundo aberto de fantasia.',
    longDescription: 'Você é Geralt de Rívia, caçador de monstros mercenário. Diante de você se encontra um continente devastado pela guerra e infestado de monstros, que você pode explorar como quiser. Seu contrato atual? Encontrar Ciri — a Criança da Profecia, uma arma viva capaz de alterar o formato do mundo.',
    trailerUrl: 'https://www.youtube.com/embed/53MyR_Z3i1w',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['RPG', 'Mitologia', 'Mundo Aberto', 'Rica em História', 'Fantasia'],
    rating: 4.9,
    ratingCount: 5410,
    releaseDate: '2015-05-18',
    isUpcoming: false,
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Low-End i3',
      gpu: 'GTX 1050 / RX 560 (Fraca)',
      ram: 8,
      storage: '50 GB'
    },
    recRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Mid-End i5/Ryzen 5',
      gpu: 'GTX 1660 / RX 580 (Média)',
      ram: 16,
      storage: '50 GB SSD'
    },
    stores: [
      { id: 'tw-steam', storeName: 'Steam', price: 129.90, promoPrice: 32.47, url: 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/', stockStatus: 'Em Estoque' },
      { id: 'tw-gog', storeName: 'GOG', price: 129.90, promoPrice: 29.90, url: 'https://www.gog.com', stockStatus: 'Em Estoque' },
      { id: 'tw-epic', storeName: 'Epic Games', price: 129.90, promoPrice: 32.47, url: 'https://store.epicgames.com', stockStatus: 'Em Estoque' }
    ]
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    description: 'Herde o antigo lote de fazenda do seu avô em Stardew Valley. Aprenda a viver da terra e transformar campos áridos em um lar próspero.',
    longDescription: 'Stardew Valley é um RPG de vida no campo sem fim! Você herdou o antigo lote de fazenda de seu avô. Armado com ferramentas de segunda mão e algumas moedas, você parte para começar sua nova vida. Você conseguirá aprender a viver da terra e transformar esses campos cobertos de mato em um lar próspero?',
    trailerUrl: 'https://www.youtube.com/embed/ot7uXNQskhs',
    coverImage: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['Simulação', 'Indie', 'Fofo', 'Casual', 'Multijogador'],
    rating: 4.9,
    ratingCount: 1980,
    releaseDate: '2016-02-26',
    isUpcoming: false,
    minRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Low-End i3',
      gpu: 'GTX 1050 / RX 560 (Fraca)',
      ram: 2,
      storage: '500 MB'
    },
    recRequirements: {
      os: 'Windows 10/11 64-bit',
      cpu: 'Low-End i3',
      gpu: 'GTX 1050 / RX 560 (Fraca)',
      ram: 4,
      storage: '1 GB'
    },
    stores: [
      { id: 'sv-steam', storeName: 'Steam', price: 24.99, promoPrice: 19.99, url: 'https://store.steampowered.com/app/413150/Stardew_Valley/', stockStatus: 'Em Estoque' },
      { id: 'sv-gog', storeName: 'GOG', price: 24.99, url: 'https://www.gog.com', stockStatus: 'Em Estoque' }
    ]
  },
  {
    id: 'doom-dark-ages',
    title: 'Doom: The Dark Ages',
    description: 'A prequela de ação em primeira pessoa que conta a fúria original do Slayer neste épico sombrio de ficção de fantasia científica.',
    longDescription: 'DOOM: The Dark Ages é o jogo de ação em primeira pessoa de ficção científica que conta a história de origem da fúria do Slayer. Você é a superarma definitiva dos deuses e reis nesta prequela nunca antes contada da fúria sombria que estabeleceu a lenda do Doomguy.',
    trailerUrl: 'https://www.youtube.com/embed/4yUvHdfI6fM',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200'
    ],
    tags: ['FPS', 'Ação', 'Brutal', 'Ficção Científica', 'Lançamento'],
    rating: 4.8,
    ratingCount: 340,
    releaseDate: '2026-12-05',
    isUpcoming: true,
    minRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'High-End i7/Ryzen 7',
      gpu: 'RTX 3060 / RX 6600 (Recomendada)',
      ram: 16,
      storage: '100 GB SSD'
    },
    recRequirements: {
      os: 'Windows 11 64-bit',
      cpu: 'Ultra-End i9/Ryzen 9',
      gpu: 'RTX 4080 / RX 7900 XTX (Cortes Rápidos)',
      ram: 32,
      storage: '100 GB NVMe'
    },
    stores: [
      { id: 'doom-steam', storeName: 'Steam', price: 299.00, url: 'https://store.steampowered.com', stockStatus: 'Em Estoque' }
    ]
  }
];

export const INITIAL_FORUMS = [
  {
    id: 'f-1',
    title: 'Qual a melhor GPU custo-benefício de 2026?',
    channel: 'Hardware/PC',
    author: 'GamerVortex',
    authorVip: true,
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80',
    date: '2026-05-20',
    views: 456,
    repliesCount: 3,
    replies: [
      { id: 'fr-1', author: 'DrHardware', authorVip: true, authorAvatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=80', date: '2026-05-20', text: 'Com certeza a RX 7600 ou a RTX 4060 Ti estão com excelente preço na Nuuvem e Kabum agora em 2026. Vale cada centavo para rodar tudo em 1080p ultra!' },
      { id: 'fr-2', author: 'SiliconMaster', authorVip: false, authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80', date: '2026-05-21', text: 'Eu juntaria um pouco mais de orçamento para pegar a RTX 4070 Super para ficar tranquilo com Raytracing.' },
      { id: 'fr-3', author: 'GamerVortex', authorVip: true, authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80', date: '2026-05-22', text: 'Obrigado pelas respostas, pessoal! Vou ficar de olho nas promoções de RTX 4060.' }
    ]
  },
  {
    id: 'f-2',
    title: 'Alguém ainda joga modificado The Witcher 3 com gráficos next-gen?',
    channel: 'Modding e Rumores',
    author: 'LoreHunter',
    authorVip: true,
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80',
    date: '2026-05-22',
    views: 231,
    repliesCount: 1,
    replies: [
      { id: 'fr-4', author: 'WitcherFan99', authorVip: true, authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80', date: '2026-05-23', text: 'Sim! Com o mod de iluminação HD Reworked Project e algumas texturas de 4K o jogo fica maravilhoso, parece feito em 2026.' }
    ]
  },
  {
    id: 'f-3',
    title: 'Expectativas reais para os requisitos de GTA 6 no PC',
    channel: 'Geral',
    author: 'ViceCityBoY',
    authorVip: false,
    authorAvatar: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?auto=format&fit=crop&w=80',
    date: '2026-05-26',
    views: 890,
    repliesCount: 2,
    replies: [
      { id: 'fr-5', author: 'NKG_Staff', authorVip: true, authorAvatar: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=80', date: '2026-05-26', text: 'Com certeza o jogo vai exigir SSD por padrão e pelo menos 16GB de RAM. Nossos requisitos simulados aqui na NKG estimam que uma RTX 3060 será o mínimo para rodar em 1080p a 30 FPS estável.' },
      { id: 'fr-6', author: 'HeavyGamer', authorVip: true, authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80', date: '2026-05-27', text: 'Espero que venha otimizado desde o primeiro dia. Jogar GTA com engasgo de shader vai ser bem frustrante.' }
    ]
  }
];

export const INITIAL_SOCIAL_FEED = [
  {
    id: 's-1',
    author: 'LoreHunter',
    authorVip: true,
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80',
    content: 'CONQUISTA SUADA! Acabei de platinar Elden Ring no PC. A luta final contra a Malenia levou 47 tentativas, mas desviei de tudo perfeitamente!',
    gameTitle: 'Elden Ring',
    achievementTitle: '🏆 Elden Lord (Platina)',
    likes: 42,
    likedBy: ['GamerVortex', 'WitcherFan99'],
    date: '2026-05-27 18:30',
    replies: [
      { id: 'sr-1', author: 'GamerVortex', authorVip: true, authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80', text: 'Parabéns demais, cara! Malenia é um pesadelo se esquivar daquele ataque das lâminas giratórias.', date: '2026-05-27 18:45' }
    ]
  },
  {
    id: 's-2',
    author: 'CosplayPrincess',
    authorVip: true,
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80',
    content: 'Night City continua maravilhosa. CompreiCyberpunk na promoção incrível da Nuuvem indicada pelo comparador de preços da NKG por R$89,90 e mal posso esperar para passar a noite jogando a dlc Phantom Liberty!',
    gameTitle: 'Cyberpunk 2077',
    likes: 18,
    likedBy: ['DrHardware'],
    date: '2026-05-28 01:10',
    replies: []
  }
];

export const INITIAL_COMMENTS = [
  { id: 'c-1', gameId: 'cyberpunk-2077', author: 'GamerVortex', vip: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80', date: '2026-05-24', text: 'Melhorou 200% em relação ao lançamento. Hoje em dia é um dos melhores RPGs do mercado, a ambientação é insuperável.', stars: 5, likes: 14 },
  { id: 'c-2', gameId: 'cyberpunk-2077', author: 'LowSpecsGamer', vip: false, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80', date: '2026-05-25', text: 'Pesado que dói no meu PC, mas a jogabilidade e a dublagem PT-BR compensam de forma magnífica.', stars: 4, likes: 3 },
  { id: 'c-3', gameId: 'elden-ring', author: 'LoreHunter', vip: true, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80', date: '2026-05-26', text: 'Obra de arte impecável. Level design excelente e segredos maravilhosos pra todo lado. FromSoftware no seu auge!', stars: 5, likes: 25 }
];
