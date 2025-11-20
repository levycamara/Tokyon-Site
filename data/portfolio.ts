
import { PortfolioItem } from '../types';

export interface LocalPortfolioItem extends PortfolioItem {
  language: 'pt' | 'en';
}

// ==============================================================================
// 📢 BANCO DE DADOS DE PORTFOLIO (CMS MANUAL)
// ==============================================================================

export const PORTFOLIO_DATA: LocalPortfolioItem[] = [
  
  // --- CASE ADEGA: VISUAL INTEGRATION ---
  {
    slug: 'casa-adega',
    serviceIds: ['brand-core', 'orange-identity'],
    language: 'pt',
    client: 'Casa Adega',
    project: 'Visual Integration',
    description: 'A Casa Adega é um projeto que busca transformar a relação entre o consumidor e o vinho, trazendo uma estética sofisticada, intimista e contemporânea. A proposta visual foi construída para transmitir aconchego, exclusividade e a sensação de pertencimento a um espaço privado dedicado ao prazer de degustar bons rótulos. Toda a identidade foi pensada para refletir a união entre tradição e modernidade, com elementos que remetem à arquitetura de adegas e à cultura do vinho.',
    imageColor: 'bg-gray-900',
    heroImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/196a7e237008339.68f7ee2a6c1f6.jpg',
    challenge: `O principal desafio era criar uma identidade que fugisse dos estereótipos clássicos de vinícolas como selos tradicionais, brasões ou elementos óbvios e entregasse um visual moderno, minimalista e elegante.
A marca precisava equilibrar sofisticação e simplicidade, proporcionando uma experiência visual premium, mas ainda assim acolhedora para o público jovem-adulto que aprecia vinho no contexto cotidiano.
Outro desafio foi desenvolver um sistema visual facilmente aplicável em diferentes superfícies: madeira, vidro, rótulos, embalagens e materiais digitais.`,
    solution: `A solução criativa partiu da essência do nome “Casa Adega”: um espaço íntimo, pessoal e cuidadosamente curado.
Criamos um logotipo com linhas limpas e geometria equilibrada, inspirado na arquitetura de adegas modernas e na curva elegante das garrafas de vinho. A paleta cromática combina tons terrosos, bordô profundo e nuances amadeiradas, reforçando a atmosfera de acolhimento premium.
A tipografia foi escolhida para transmitir modernidade com um toque clássico, um equilíbrio perfeito entre tradição e contemporaneidade.
Como resultado, a identidade visual tornou-se versátil, sofisticada e fortemente reconhecível, podendo ser aplicada em peças decorativas, embalagens, redes sociais e propostas comerciais sem perder consistência.`,
    gallery: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5fd343237008339.68f7ee2a6aefe.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/97473f237008339.68f7ee2a6a55d.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/1d0952237008339.68f7ee2a69dc3.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/35a77e237008339.68f7ee2a676fb.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/1ea081237008339.68f7ee2a68154.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/9fa5fb237008339.68f7ee2a6b8fe.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/f726b6237008339.68f7ee2a6671d.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/4c4478237008339.68f7ee2a66c45.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/9f5887237008339.68f7ee2a68ae4.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/13523a237008339.68f7ee2a693eb.jpg'
    ]
  },

  // --- CASE REAL: ALPHA INVEST ---
  {
    slug: 'alpha-invest-repositioning',
    serviceIds: ['brand-core', 'orange-identity'],
    language: 'pt',
    client: 'VS3 Sistemas',
    project: 'Redesign de Id. Visual',
    description: 'A VS3 Sistemas solicitou uma atualização integral de sua identidade visual e de interface para refletir seu posicionamento como fornecedor de tecnologia ágil, confiável e moderno. O objetivo foi criar uma linguagem visual que comunicasse eficiência e inovação, sem perder a familiaridade necessária para usuários empresariais. O trabalho contemplou desde o redesenho do logotipo até a aplicação em telas de software, site, material comercial e system UI.',
    imageColor: 'bg-gray-800',
    heroImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/de68bb237008183.68f7ed7416bee.jpg',
    challenge: 'A marca precisava equilibrar dois polos: o da solidez e segurança (esperado para softwares de gestão) e o da inovação e leveza (uma demanda dos usuários mais modernos). A interface dos sistemas da VS3 estava visualmente datada, com inconsistências de design, baixa usabilidade e pouco alinhamento com os dispositivos móveis. Era necessário criar elementos visuais e um sistema de design que fosse escalável, fácil de aplicar em diferentes plataformas (web, desktop, mobile) e responsivo às próximas evoluções do produto.',
    solution: 'Desenvolvemos um logotipo minimalista e alinhado com a era digital, usando formas geométricas que ressaltam as iniciais “V”, “S” e “3”, e uma paleta de cores que mescla azul-tecnologia com verde-progressivo, transmitindo confiabilidade e crescimento. Para a interface, construímos um Design System com componentes reutilizáveis, tipografia legível para contextos corporativos, ícones próprios e uma hierarquia visual clara. As telas ganharam maior responsividade e usabilidade, reduzindo o tempo de aprendizado para novos usuários. Como resultado, a nova identidade reforçou a marca da VS3 como mais contemporânea e competitiva, e a aplicação da interface modernizada elevou a experiência do usuário, reduzindo erros e melhorando a eficiência operacional.',
    gallery: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/304800237008183.68f7ed7417593.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/3a90d8237008183.68f7ed741b077.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2f90ba237008183.68f7ed74194b1.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/aa87b8237008183.68f7ed7418857.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/f8b62a237008183.68f7ed7416031.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7fdc04237008183.68f7ed7417f04.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/3f4345237008183.68f7ed741a09c.jpg'
    ]
  },
  {
    slug: 'alpha-invest-repositioning',
    serviceIds: ['brand-core', 'monthly-review'],
    language: 'en',
    client: 'Alpha Invest',
    project: 'Repositioning',
    description: 'Strategic redefinition for the merger of two investment funds.',
    imageColor: 'bg-gray-800',
    challenge: 'The merger of two financial market giants created an identity conflict. The challenge was to create a new brand that kept the tradition of one and the innovation of the other.',
    solution: 'We developed the Brand Core focused on the Ruler archetype. We unified visual and verbal communication, creating a solid brand that conveyed immediate institutional security.',
    gallery: []
  },

  // --- CASE REAL: CONSTRUCT ---
  {
    slug: 'construct-naming',
    serviceIds: ['brand-core', 'orange-identity'],
    language: 'pt',
    client: 'Construct',
    project: 'Naming & Core',
    description: 'Criação do zero de uma construtora de alto padrão.',
    imageColor: 'bg-tokyon-orange',
    challenge: 'Entrar em um mercado saturado de construtoras genéricas. O nome precisava soar internacional e a identidade visual precisava gritar "luxo" sem ser clichê.',
    solution: 'Criamos o nome "Construct" com uma identidade visual minimalista, baseada em grids arquitetônicos e tipografia suíça. O resultado foi uma percepção de valor 3x maior que a concorrência.',
    gallery: []
  },

  // --- CASE REAL: NEXCORP ---
  {
    slug: 'nexcorp-rebrand',
    serviceIds: ['orange-identity', 'social-presence', 'web-evolution'],
    language: 'pt',
    client: 'NexCorp',
    project: 'Global Rebrand',
    description: 'Aplicação estratégica de Orange Identity para expansão LATAM.',
    imageColor: 'bg-gradient-to-br from-gray-800 to-gray-900',
    challenge: 'A marca antiga não conversava com o público jovem da tecnologia na América Latina. Precisávamos modernizar sem perder a seriedade corporativa.',
    solution: 'Implementamos o Orange Identity com um sistema de cores vibrantes sobre bases escuras (Dark Mode). Expandimos a linguagem para redes sociais e redesenhamos o portal web.',
    gallery: []
  },
  {
    slug: 'nexcorp-rebrand',
    serviceIds: ['orange-identity', 'social-presence', 'web-evolution'],
    language: 'en',
    client: 'NexCorp',
    project: 'Global Rebrand',
    description: 'Strategic application of Orange Identity for LATAM expansion.',
    imageColor: 'bg-gradient-to-br from-gray-800 to-gray-900',
    challenge: 'The old brand did not resonate with the young tech audience in Latin America. We needed to modernize without losing corporate seriousness.',
    solution: 'We implemented Orange Identity with a vibrant color system on dark bases (Dark Mode). We expanded the language to social media and redesigned the web portal.',
    gallery: []
  },

  // --- PLACEHOLDERS PARA GARANTIR QUE NENHUMA PÁGINA FIQUE VAZIA ---
  {
    slug: 'partner-corp-automation',
    serviceIds: ['orange-automations', 'touch-points', 'orange-support'],
    language: 'pt',
    client: 'Partner Corp',
    project: 'Automação CRM',
    description: 'Otimização de fluxo de vendas e integração de sistemas.',
    imageColor: 'bg-white/10'
  },
  {
    slug: 'sales-enablement-deck',
    serviceIds: ['sales-kit', 'creative-engine'],
    language: 'pt',
    client: 'Elevate',
    project: 'Series B Deck',
    description: 'Estruturação visual para rodada de investimento.',
    imageColor: 'bg-gradient-to-br from-tokyon-orange to-black'
  },
  {
    slug: 'brand-protection-audit',
    serviceIds: ['brand-guard'],
    language: 'pt',
    client: 'Velox Logistics',
    project: 'Auditoria INPI',
    description: 'Monitoramento e defesa de marca registrada.',
    imageColor: 'bg-zinc-900'
  }
];
