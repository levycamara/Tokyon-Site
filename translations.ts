
import { ServiceItem } from './types';

interface TranslationStructure {
  hero: {
    subtitle: string;
    description: string;
    est: string;
    global: string;
  };
  clients: {
    label: string;
  };
  program: {
    label: string;
    title_prefix: string;
    title_highlight: string;
    title_suffix: string;
    description: string;
    card1_title: string;
    card1_desc: string;
    card2_title: string;
    card2_desc: string;
    cta: string;
  };
  services: {
    label: string;
    title: string;
    category: string;
    cta: string;
    back: string;
    next_service: string;
    list: ServiceItem[];
  };
  methodology: {
    label: string;
    title_prefix: string;
    title_suffix: string;
    intro_highlight: string;
    intro_text: string;
    description: string;
    pillar1_title: string;
    pillar1_desc: string;
    pillar2_title: string;
    pillar2_desc: string;
    pillar3_title: string;
    pillar3_desc: string;
    cycle_label: string;
    cycle_title: string;
    step1_title: string;
    step1_desc: string;
    step2_title: string;
    step2_desc: string;
    step3_title: string;
    step3_desc: string;
    step4_title: string;
    step4_desc: string;
    cta_title: string;
    cta_button: string;
  };
  contact: {
    label: string;
    title_prefix: string;
    title_suffix: string;
    description: string;
    form_company: string;
    form_email: string;
    form_whatsapp: string;
    form_challenge: string;
    form_submit: string;
  };
  consultant: {
    button: string;
    title: string;
    welcome: string;
    placeholder: string;
    footer: string;
  };
  nav: {
    methodology: string;
    services: string;
    start: string;
  };
}

// Helper to generate generic portfolio items for services not fully populated yet
const getGenericPortfolio = (serviceName: string) => [
  { client: "NexCorp", project: "Global Rebrand", description: `Aplicação estratégica de ${serviceName} para expansão LATAM.`, imageColor: "bg-gradient-to-br from-gray-800 to-gray-900" },
  { client: "Vanguard", project: "Tech Integration", description: "Otimização de processos criativos e visuais.", imageColor: "bg-gradient-to-br from-tokyon-orange to-black" },
  { client: "Elevate", project: "Series B Deck", description: "Estruturação visual para rodada de investimento.", imageColor: "bg-gradient-to-br from-white/20 to-black" },
];

const getGenericPortfolioEn = (serviceName: string) => [
  { client: "NexCorp", project: "Global Rebrand", description: `Strategic application of ${serviceName} for LATAM expansion.`, imageColor: "bg-gradient-to-br from-gray-800 to-gray-900" },
  { client: "Vanguard", project: "Tech Integration", description: "Optimization of creative and visual processes.", imageColor: "bg-gradient-to-br from-tokyon-orange to-black" },
  { client: "Elevate", project: "Series B Deck", description: "Visual structuring for investment round.", imageColor: "bg-gradient-to-br from-white/20 to-black" },
];

export const translations: Record<'pt' | 'en', TranslationStructure> = {
  pt: {
    nav: {
      methodology: "Metodologia",
      services: "Serviços",
      start: "Iniciar Projeto"
    },
    hero: {
      subtitle: "Agência de Branding Estratégico",
      description: "Design, estratégia e inteligência para grandes corporações.",
      est: "EST. 2024",
      global: "OPERAÇÃO GLOBAL"
    },
    clients: {
      label: "Empresas que já foram impactadas pela TOKYON"
    },
    program: {
      label: "01 — METODOLOGIA",
      title_prefix: "O",
      title_highlight: "ORANGE",
      title_suffix: "PROGRAM",
      description: "Não vendemos apenas design. Vendemos valor de mercado. O Orange Program integra 11 frentes estratégicas em um ecossistema único.",
      card1_title: "Unificação",
      card1_desc: "Centralização total da comunicação visual e verbal da sua marca.",
      card2_title: "Performance",
      card2_desc: "Processos validados para reduzir custos e aumentar velocidade.",
      cta: "Entender a Metodologia"
    },
    services: {
      label: "02 — ÍNDICE",
      title: "Serviços",
      category: "ESTRATÉGICO & CRIATIVO",
      cta: "Ver Detalhes & Cases",
      back: "Voltar para Início",
      next_service: "Próximo Serviço",
      list: [
        {
          id: 'brand-core',
          title: 'Brand Core®',
          description: 'Direção Estratégica da Marca. Alinhamento contínuo do posicionamento, identidade e narrativa.',
          iconName: 'Target',
          details: {
            fullDescription: "O Brand Core® é a constituição da sua marca. Antes de qualquer pixel ser desenhado, definimos a alma do negócio. Não é apenas sobre missão e valores, mas sobre definir o inimigo, o território de fala, a personalidade e a estratégia de guerra comercial da marca. É o documento vivo que garante que todos na empresa saibam quem são.",
            benefitTitle: "Impacto Estratégico",
            benefits: [
              "Clareza absoluta para tomadas de decisão.",
              "Alinhamento cultural interno.",
              "Diferenciação real no mercado saturado."
            ],
            deliverablesTitle: "Entregáveis Técnicos",
            deliverables: [
              "BrandBook Estratégico (PDF Interativo)",
              "Definição de Arquétipo e Tom de Voz",
              "Manifesto da Marca",
              "Guia de Mensagens Chave"
            ],
            portfolioTitle: "Cases de Estratégia",
            portfolio: [
              { client: "Alpha Invest", project: "Reposicionamento", description: "Redefinição estratégica para fusão de dois fundos de investimento.", imageColor: "bg-gray-800" },
              { client: "Construct", project: "Naming & Core", description: "Criação do zero de uma construtora de alto padrão.", imageColor: "bg-tokyon-orange" },
              { client: "Velox Logistics", project: "Brand Culture", description: "Alinhamento de cultura interna para 500 funcionários.", imageColor: "bg-white/10" }
            ]
          }
        },
        {
          id: 'orange-identity',
          title: 'Orange Identity®',
          description: 'Padronização e Evolução da Identidade Visual. Manutenção e refinamento constante do design.',
          iconName: 'Palette',
           details: {
            fullDescription: "A identidade visual não é estática; ela evolui. O Orange Identity® garante que sua marca visual esteja sempre afiada, moderna e funcional. Criamos sistemas visuais modulares que funcionam tanto em um cartão de visita quanto em um outdoor gigante, garantindo que a estética 'Premium' seja percebida instantaneamente.",
            benefitTitle: "O Que Resolvemos",
            benefits: [
              "Fim da fragmentação visual.",
              "Percepção de alto valor agregado.",
              "Flexibilidade para novos produtos."
            ],
            deliverablesTitle: "O Escopo",
            deliverables: [
              "Logotipia e Variações",
              "Paleta Cromática Expandida",
              "Tipografia Institucional",
              "Elementos de Apoio e Patterns",
              "Guia de Aplicação"
            ],
            portfolioTitle: "Design Systems",
            portfolio: getGenericPortfolio("Orange Identity")
          }
        },
        {
          id: 'creative-engine',
          title: 'Creative Engine®',
          description: 'Produção Criativa Mensal. Criação profissional de peças, campanhas e materiais digitais.',
          iconName: 'Cpu',
          details: {
            fullDescription: "O Creative Engine® é a sua fábrica criativa terceirizada. Eliminamos o gargalo de produção interna. Você demanda, nós executamos com qualidade de agência boutique e velocidade de startup. De key visuals para campanhas a banners para performance, mantemos sua marca ativa e visualmente impecável.",
            benefitTitle: "Por que contratar",
            benefits: [
              "Escala de produção sem headcount extra.",
              "Qualidade visual de nível internacional.",
              "Agilidade na entrega de campanhas."
            ],
            deliverablesTitle: "Produção Recorrente",
            deliverables: [
              "Key Visuals de Campanhas",
              "Peças para Mídia Paga (Ads)",
              "Design de E-mail Marketing",
              "Materiais para Endomarketing"
            ],
            portfolioTitle: "Produção Criativa",
            portfolio: getGenericPortfolio("Creative Engine")
          }
        },
        {
          id: 'social-presence',
          title: 'Social Presence®',
          description: 'Presença Digital de Alto Padrão. Direção criativa com foco em consistência e estética.',
          iconName: 'ShareNetwork',
          details: {
            fullDescription: "Sua vitrine digital precisa refletir o tamanho da sua empresa. O Social Presence® não é sobre 'postar todo dia', é sobre postar com intenção e estética impecável. Cuidamos da direção de arte do seu feed, stories e LinkedIn, garantindo que quem visite seu perfil entenda imediatamente que se trata de uma empresa líder.",
            benefitTitle: "Objetivos",
            benefits: ["Autoridade visual imediata.", "Consistência de narrativa.", "Diferenciação dos concorrentes amadores."],
            deliverablesTitle: "Escopo Mensal",
            deliverables: ["Direção de Arte para Feed", "Templates para Stories", "Capas para Destaques", "Design para LinkedIn Company Page"],
            portfolioTitle: "Social Media Cases",
             portfolio: getGenericPortfolio("Social Presence")
          }
        },
        {
          id: 'sales-kit',
          title: 'SalesKit®',
          description: 'Materiais Comerciais Premium. Apresentações, catálogos e propostas para o time comercial.',
          iconName: 'PresentationChart',
          details: {
            fullDescription: "O time comercial precisa de munição de alto calibre. O SalesKit® transforma documentos de word e powerpoints feios em ferramentas de venda persuasivas e visualmente impactantes. Uma proposta comercial bem desenhada aumenta a percepção de valor do seu serviço e justifica um ticket mais alto.",
            benefitTitle: "Impacto em Vendas",
            benefits: ["Aumento na conversão.", "Justificativa de preço premium.", "Confiança para o vendedor."],
            deliverablesTitle: "Ferramentas de Venda",
            deliverables: ["Deck Comercial (Apresentação)", "Modelos de Proposta", "One-Pagers de Produto", "Catálogos Digitais"],
            portfolioTitle: "Materiais de Venda",
             portfolio: getGenericPortfolio("SalesKit")
          }
        },
        {
          id: 'web-evolution',
          title: 'Web Evolution®',
          description: 'Evolução Contínua do Website. Ajustes, melhorias e implementação de novas seções.',
          iconName: 'Globe',
          details: {
            fullDescription: "Um site nunca está 'pronto'. Ele é um organismo vivo. O Web Evolution® garante que seu site não fique obsoleto. Criamos landing pages para novas ofertas, atualizamos o design da home, melhoramos a performance e garantimos que sua 'sede digital' esteja sempre à altura da sede física.",
            benefitTitle: "Benefícios",
            benefits: ["Site sempre atualizado.", "Landing Pages rápidas para campanhas.", "Melhoria contínua de UX/UI."],
            deliverablesTitle: "O que fazemos",
            deliverables: ["Design de Landing Pages", "Atualização de Home Page", "Criação de Páginas de Captura", "Manutenção Visual"],
            portfolioTitle: "Web Projects",
             portfolio: getGenericPortfolio("Web Evolution")
          }
        },
        {
          id: 'touch-points',
          title: 'TouchPoints®',
          description: 'Padronização de Pontos de Contato. WhatsApp, e-mail, documentos e processos.',
          iconName: 'Chats',
           details: {
            fullDescription: "A experiência da marca quebra quando o cliente recebe um boleto feio ou uma mensagem de WhatsApp mal formatada. O TouchPoints® mapeia e desenha todos os pontos de contato invisíveis. Assinaturas de e-mail, fundos de reunião virtual, faturas, envelopes. Tudo comunica.",
            benefitTitle: "Onde Atuamos",
            benefits: ["Profissionalismo em cada detalhe.", "Experiência de marca 360º.", "Padronização do atendimento."],
            deliverablesTitle: "Itens Padronizados",
            deliverables: ["Assinaturas de E-mail", "Papelaria Corporativa", "Modelos de Mensagem WhatsApp", "Backgrounds de Videoconferência"],
            portfolioTitle: "Pontos de Contato",
             portfolio: getGenericPortfolio("TouchPoints")
          }
        },
        {
          id: 'orange-automations',
          title: 'Orange Automations®',
          description: 'Fluxos de Atendimento e Eficiência. Criação de automações e integrações de CRM.',
          iconName: 'Robot',
           details: {
            fullDescription: "Eficiência é a nova criatividade. O Orange Automations® usa tecnologia para garantir que leads não esfriem. Configuramos CRMs, criamos fluxos de e-mail automáticos e respostas inteligentes para garantir que a máquina de vendas nunca pare, mesmo quando sua equipe descansa.",
            benefitTitle: "Ganhos",
            benefits: ["Velocidade de resposta.", "Organização de dados.", "Menor erro humano."],
            deliverablesTitle: "Implementação",
            deliverables: ["Fluxos de Cadência de Email", "Chatbots Simples", "Organização de Pipeline de Vendas", "Automação de Boas-vindas"],
            portfolioTitle: "Automações",
             portfolio: getGenericPortfolio("Orange Automations")
          }
        },
        {
          id: 'brand-guard',
          title: 'BrandGuard®',
          description: 'Proteção e Monitoramento da Marca. Acompanhamento de risco no INPI e estratégia legal.',
          iconName: 'ShieldCheck',
          details: {
            fullDescription: "Você constrói, nós vigiamos. O BrandGuard® é o serviço de inteligência e proteção. Monitoramos semanalmente o INPI para garantir que ninguém esteja tentando copiar sua marca ou registrar nomes similares. Oferecemos consultoria estratégica sobre classes de registro e expansão de proteção.",
            benefitTitle: "Segurança",
            benefits: ["Sono tranquilo.", "Proteção do ativo financeiro.", "Ação rápida contra cópias."],
            deliverablesTitle: "Monitoramento",
            deliverables: ["Relatório Mensal de Colidências", "Acompanhamento de Processos INPI", "Consultoria de Viabilidade de Nomes"],
            portfolioTitle: "Proteção de Marca",
             portfolio: getGenericPortfolio("BrandGuard")
          }
        },
        {
          id: 'monthly-review',
          title: 'Monthly Review®',
          description: 'Reunião Estratégica Mensal. Acompanhamento estruturado de métricas e prioridades.',
          iconName: 'ChartBar',
           details: {
            fullDescription: "O coração da nossa parceria. O Monthly Review® não é uma reunião para 'falar mal'. É uma reunião de board. Analisamos o que foi feito, o que funcionou e definimos as prioridades do próximo ciclo. É aqui que a estratégia se ajusta à realidade do mercado.",
            benefitTitle: "Importância",
            benefits: ["Alinhamento total.", "Correção rápida de rota.", "Sentimento de parceria real."],
            deliverablesTitle: "A Rotina",
            deliverables: ["Apresentação de Resultados", "Planejamento do Próximo Sprint", "Definição de Metas"],
            portfolioTitle: "Gestão",
             portfolio: getGenericPortfolio("Monthly Review")
          }
        },
        {
          id: 'orange-support',
          title: 'Orange Support®',
          description: 'Suporte Criativo Prioritário. Atendimento rápido para demandas estratégicas.',
          iconName: 'Lightning',
           details: {
            fullDescription: "O mundo corporativo tem urgências. O Orange Support® é sua linha direta para resolver problemas rápidos. Precisa de um ajuste na apresentação para amanhã cedo? Uma imagem para um press release urgente? Clientes do programa têm prioridade na fila de produção.",
            benefitTitle: "Vantagem",
            benefits: ["Segurança operacional.", "Agilidade em crises.", "Time estendido sempre disponível."],
            deliverablesTitle: "Canal Exclusivo",
            deliverables: ["SLA de Atendimento Reduzido", "Canal Direto no WhatsApp/Slack", "Gerente de Conta Dedicado"],
            portfolioTitle: "Suporte",
             portfolio: getGenericPortfolio("Orange Support")
          }
        }
      ]
    },
    methodology: {
      label: "Framework Proprietário",
      title_prefix: "A",
      title_suffix: "Arquitetura",
      intro_highlight: "ativo financeiro",
      intro_text: "Branding não é apenas um logo. É um",
      description: "O Orange Program® foi desenvolvido para eliminar o gap entre planejamento estratégico e execução criativa. Tratamos sua marca como um ecossistema que precisa de evolução constante, proteção e aceleração.",
      pillar1_title: "ESTRATÉGIA",
      pillar1_desc: "Antes de desenhar, nós definimos. Quem é você? Quem é o inimigo? Qual é a narrativa? Construímos o 'Brand Core' para garantir que cada ativo visual tenha um propósito comercial.",
      pillar2_title: "VISUAL",
      pillar2_desc: "Consistência gera confiança. Confiança gera valor. Mantemos sua identidade visual com precisão militar em todos os pontos de contato, das redes sociais às apresentações de vendas.",
      pillar3_title: "CRESCIMENTO",
      pillar3_desc: "Uma marca deve sobreviver e se adaptar. Protegemos sua PI, automatizamos seus processos e evoluímos sua presença na web continuamente para que você nunca se torne obsoleto.",
      cycle_label: "O CICLO",
      cycle_title: "O LOOP CONTÍNUO",
      step1_title: "Revisar & Alinhar",
      step1_desc: "Reunião estratégica mensal para analisar métricas e definir prioridades do sprint.",
      step2_title: "Sprint de Produção",
      step2_desc: "Nosso motor criativo produz todos os ativos (Social, Web, Vendas) definidos no escopo.",
      step3_title: "Controle de Qualidade",
      step3_desc: "Verificação rigorosa contra o Brand Core para garantir consistência antes do lançamento.",
      step4_title: "Entrega & Dados",
      step4_desc: "Ativos entregues. Performance rastreada. Os dados alimentam a próxima Revisão.",
      cta_title: "PARE DE JOGAR PEQUENO.",
      cta_button: "Aplicar para o Programa"
    },
    contact: {
      label: "03 — CONTATO",
      title_prefix: "PRONTO PARA",
      title_suffix: "EVOLUIR?",
      description: "Agende um diagnóstico estratégico. Descubra como o Orange Program pode reposicionar sua marca no mercado.",
      form_company: "Nome da Empresa",
      form_email: "Email Corporativo",
      form_whatsapp: "WhatsApp / Telefone",
      form_challenge: "O Desafio",
      form_submit: "Enviar Solicitação"
    },
    consultant: {
      button: "Consultor AI",
      title: "Tokyon Intelligence",
      welcome: "Olá. Sou o consultor virtual da Tokyon. Como posso ajudar a elevar o patamar da sua marca hoje?",
      placeholder: "Pergunte sobre nossos serviços...",
      footer: "Powered by Gemini AI. Tokyon © 2024"
    }
  },
  en: {
    nav: {
      methodology: "Methodology",
      services: "Services",
      start: "Start Project"
    },
    hero: {
      subtitle: "Strategic Branding Agency",
      description: "Design, strategy and intelligence for high-ticket companies.",
      est: "EST. 2024",
      global: "GLOBAL OPERATION"
    },
    clients: {
      label: "Companies impacted by TOKYON"
    },
    program: {
      label: "01 — METHODOLOGY",
      title_prefix: "THE",
      title_highlight: "ORANGE",
      title_suffix: "PROGRAM",
      description: "We don't just sell design. We sell market value. The Orange Program integrates 11 strategic fronts into a single ecosystem.",
      card1_title: "Unification",
      card1_desc: "Total centralization of your brand's visual and verbal communication.",
      card2_title: "Performance",
      card2_desc: "Validated processes to reduce costs and increase speed.",
      cta: "Understand the Methodology"
    },
    services: {
      label: "02 — INDEX",
      title: "Services",
      category: "STRATEGIC & CREATIVE",
      cta: "View Details & Cases",
      back: "Back to Home",
      next_service: "Next Service",
      list: [
        {
          id: 'brand-core',
          title: 'Brand Core®',
          description: 'Strategic Brand Direction. Continuous alignment of positioning, identity, and narrative.',
          iconName: 'Target',
          details: {
            fullDescription: "Brand Core® is your brand's constitution. Before any pixel is drawn, we define the soul of the business. It's not just about mission and values, but about defining the enemy, the territory, the personality, and the commercial war strategy. It is the living document that ensures everyone in the company knows who they are.",
            benefitTitle: "Strategic Impact",
            benefits: [
              "Absolute clarity for decision making.",
              "Internal cultural alignment.",
              "Real differentiation in a saturated market."
            ],
            deliverablesTitle: "Technical Deliverables",
            deliverables: [
              "Strategic BrandBook (Interactive PDF)",
              "Archetype & Tone of Voice Definition",
              "Brand Manifesto",
              "Key Messaging Guide"
            ],
            portfolioTitle: "Strategy Cases",
            portfolio: [
              { client: "Alpha Invest", project: "Repositioning", description: "Strategic redefinition for the merger of two investment funds.", imageColor: "bg-gray-800" },
              { client: "Construct", project: "Naming & Core", description: "Creation from scratch of a high-end construction company.", imageColor: "bg-tokyon-orange" },
              { client: "Velox Logistics", project: "Brand Culture", description: "Internal culture alignment for 500 employees.", imageColor: "bg-white/10" }
            ]
          }
        },
        {
          id: 'orange-identity',
          title: 'Orange Identity®',
          description: 'Visual Identity Standardization & Evolution. Constant maintenance and design refinement.',
          iconName: 'Palette',
          details: {
            fullDescription: "Visual identity is not static; it evolves. Orange Identity® ensures your visual brand is always sharp, modern, and functional. We create modular visual systems that work on both a business card and a giant billboard, ensuring the 'Premium' aesthetic is perceived instantly.",
            benefitTitle: "What We Solve",
            benefits: [
              "End of visual fragmentation.",
              "Perception of high added value.",
              "Flexibility for new products."
            ],
            deliverablesTitle: "The Scope",
            deliverables: [
              "Logotype and Variations",
              "Expanded Color Palette",
              "Institutional Typography",
              "Support Elements and Patterns",
              "Application Guide"
            ],
            portfolioTitle: "Design Systems",
            portfolio: getGenericPortfolioEn("Orange Identity")
          }
        },
        {
          id: 'creative-engine',
          title: 'Creative Engine®',
          description: 'Monthly Creative Production. Professional creation of assets, campaigns, and digital materials.',
          iconName: 'Cpu',
          details: {
            fullDescription: "Creative Engine® is your outsourced creative factory. We eliminate the internal production bottleneck. You demand, we execute with boutique agency quality and startup speed. From campaign key visuals to performance banners, we keep your brand active and visually impeccable.",
            benefitTitle: "Why Hire",
            benefits: [
              "Production scale without extra headcount.",
              "International level visual quality.",
              "Agility in campaign delivery."
            ],
            deliverablesTitle: "Recurring Production",
            deliverables: [
              "Campaign Key Visuals",
              "Paid Media Assets (Ads)",
              "Email Marketing Design",
              "Internal Marketing Materials"
            ],
            portfolioTitle: "Creative Production",
            portfolio: getGenericPortfolioEn("Creative Engine")
          }
        },
        {
          id: 'social-presence',
          title: 'Social Presence®',
          description: 'High-End Digital Presence. Creative direction focused on consistency and aesthetics.',
          iconName: 'ShareNetwork',
          details: {
            fullDescription: "Your digital showcase needs to reflect the size of your company. Social Presence® is not about 'posting every day', it's about posting with intention and impeccable aesthetics. We take care of the art direction of your feed, stories, and LinkedIn, ensuring that whoever visits your profile immediately understands that it is a leading company.",
            benefitTitle: "Objectives",
            benefits: ["Immediate visual authority.", "Narrative consistency.", "Differentiation from amateur competitors."],
            deliverablesTitle: "Monthly Scope",
            deliverables: ["Feed Art Direction", "Story Templates", "Highlight Covers", "LinkedIn Company Page Design"],
            portfolioTitle: "Social Media Cases",
            portfolio: getGenericPortfolioEn("Social Presence")
          }
        },
        {
          id: 'sales-kit',
          title: 'SalesKit®',
          description: 'Premium Sales Materials. Presentations, catalogs, and proposals for the commercial team.',
          iconName: 'PresentationChart',
          details: {
            fullDescription: "The sales team needs high-caliber ammunition. SalesKit® transforms Word documents and ugly PowerPoints into persuasive and visually impactful sales tools. A well-designed commercial proposal increases the perceived value of your service and justifies a higher ticket.",
            benefitTitle: "Impact on Sales",
            benefits: ["Increase in conversion.", "Justification for premium pricing.", "Confidence for the salesperson."],
            deliverablesTitle: "Sales Tools",
            deliverables: ["Sales Deck (Presentation)", "Proposal Templates", "Product One-Pagers", "Digital Catalogs"],
            portfolioTitle: "Sales Materials",
            portfolio: getGenericPortfolioEn("SalesKit")
          }
        },
        {
          id: 'web-evolution',
          title: 'Web Evolution®',
          description: 'Continuous Website Evolution. Adjustments, improvements, and implementation of new sections.',
          iconName: 'Globe',
          details: {
            fullDescription: "A website is never 'done'. It is a living organism. Web Evolution® ensures your website never becomes obsolete. We create landing pages for new offers, update the home design, improve performance, and ensure your 'digital headquarters' matches your physical headquarters.",
            benefitTitle: "Benefits",
            benefits: ["Website always updated.", "Fast Landing Pages for campaigns.", "Continuous UX/UI improvement."],
            deliverablesTitle: "What We Do",
            deliverables: ["Landing Page Design", "Home Page Updates", "Squeeze Page Creation", "Visual Maintenance"],
            portfolioTitle: "Web Projects",
            portfolio: getGenericPortfolioEn("Web Evolution")
          }
        },
        {
          id: 'touch-points',
          title: 'TouchPoints®',
          description: 'Touchpoint Standardization. WhatsApp, email, documents, and processes.',
          iconName: 'Chats',
          details: {
            fullDescription: "Brand experience breaks when the client receives an ugly invoice or a poorly formatted WhatsApp message. TouchPoints® maps and designs all invisible touchpoints. Email signatures, virtual meeting backgrounds, invoices, envelopes. Everything communicates.",
            benefitTitle: "Where We Act",
            benefits: ["Professionalism in every detail.", "360º brand experience.", "Service standardization."],
            deliverablesTitle: "Standardized Items",
            deliverables: ["Email Signatures", "Corporate Stationery", "WhatsApp Message Templates", "Video Conference Backgrounds"],
            portfolioTitle: "Touchpoints",
            portfolio: getGenericPortfolioEn("TouchPoints")
          }
        },
        {
          id: 'orange-automations',
          title: 'Orange Automations®',
          description: 'Efficiency & Service Flows. Creation of automations and CRM integrations.',
          iconName: 'Robot',
          details: {
            fullDescription: "Efficiency is the new creativity. Orange Automations® uses technology to ensure leads don't go cold. We configure CRMs, create automatic email flows, and intelligent responses to ensure the sales machine never stops, even when your team rests.",
            benefitTitle: "Gains",
            benefits: ["Response speed.", "Data organization.", "Less human error."],
            deliverablesTitle: "Implementation",
            deliverables: ["Email Cadence Flows", "Simple Chatbots", "Sales Pipeline Organization", "Welcome Automation"],
            portfolioTitle: "Automations",
            portfolio: getGenericPortfolioEn("Orange Automations")
          }
        },
        {
          id: 'brand-guard',
          title: 'BrandGuard®',
          description: 'Brand Protection & Monitoring. Risk monitoring at IP offices and strategic legal consulting.',
          iconName: 'ShieldCheck',
          details: {
            fullDescription: "You build, we watch. BrandGuard® is the intelligence and protection service. We monitor IP offices weekly to ensure no one is trying to copy your brand or register similar names. We offer strategic consulting on registration classes and protection expansion.",
            benefitTitle: "Security",
            benefits: ["Peace of mind.", "Financial asset protection.", "Quick action against copies."],
            deliverablesTitle: "Monitoring",
            deliverables: ["Monthly Conflict Reports", "IP Process Tracking", "Name Feasibility Consulting"],
            portfolioTitle: "Brand Protection",
            portfolio: getGenericPortfolioEn("BrandGuard")
          }
        },
        {
          id: 'monthly-review',
          title: 'Monthly Review®',
          description: 'Monthly Strategic Meeting. Structured tracking of metrics and priorities.',
          iconName: 'ChartBar',
          details: {
            fullDescription: "The heart of our partnership. Monthly Review® is not a meeting to 'complain'. It is a board meeting. We analyze what was done, what worked, and define the priorities for the next cycle. This is where strategy adjusts to market reality.",
            benefitTitle: "Importance",
            benefits: ["Total alignment.", "Quick course correction.", "Feeling of real partnership."],
            deliverablesTitle: "The Routine",
            deliverables: ["Results Presentation", "Next Sprint Planning", "Goal Definition"],
            portfolioTitle: "Management",
            portfolio: getGenericPortfolioEn("Monthly Review")
          }
        },
        {
          id: 'orange-support',
          title: 'Orange Support®',
          description: 'Priority Creative Support. Fast response for strategic demands.',
          iconName: 'Lightning',
          details: {
            fullDescription: "The corporate world has emergencies. Orange Support® is your direct line to solve urgent problems. Need a presentation tweak for tomorrow morning? An image for an urgent press release? Program clients have priority in the production queue.",
            benefitTitle: "Advantage",
            benefits: ["Operational security.", "Agility in crises.", "Extended team always available."],
            deliverablesTitle: "Exclusive Channel",
            deliverables: ["Reduced Service SLA", "Direct Channel on WhatsApp/Slack", "Dedicated Account Manager"],
            portfolioTitle: "Support",
            portfolio: getGenericPortfolioEn("Orange Support")
          }
        }
      ]
    },
    methodology: {
      label: "Proprietary Framework",
      title_prefix: "The",
      title_suffix: "Architecture",
      intro_highlight: "financial asset",
      intro_text: "Branding is not just a logo. It is a",
      description: "The Orange Program® was developed to eliminate the gap between strategic planning and creative execution. We treat your brand as an ecosystem that needs constant evolution, protection, and acceleration.",
      pillar1_title: "STRATEGY",
      pillar1_desc: "Before we design, we define. Who are you? Who is the enemy? What is the narrative? We build the 'Brand Core' to ensure every visual asset has a commercial purpose.",
      pillar2_title: "VISUAL",
      pillar2_desc: "Consistency builds trust. Trust builds value. We maintain your visual identity with military precision across all touchpoints, from social media to sales decks.",
      pillar3_title: "GROWTH",
      pillar3_desc: "A brand must survive and adapt. We protect your IP, automate your processes, and evolve your web presence continuously so you never become obsolete.",
      cycle_label: "THE CYCLE",
      cycle_title: "THE CONTINUOUS LOOP",
      step1_title: "Review & Align",
      step1_desc: "Monthly strategic meeting to analyze metrics and define the sprint priorities.",
      step2_title: "Production Sprint",
      step2_desc: "Our creative engine produces all assets (Social, Web, Sales) defined in the scope.",
      step3_title: "Quality Assurance",
      step3_desc: "Rigorous check against the Brand Core to ensure consistency before release.",
      step4_title: "Delivery & Data",
      step4_desc: "Assets delivered. Performance tracked. Data feeds into the next Review.",
      cta_title: "STOP PLAYING SMALL.",
      cta_button: "Apply for the Program"
    },
    contact: {
      label: "03 — CONTACT",
      title_prefix: "READY TO",
      title_suffix: "EVOLUIR?",
      description: "Schedule a strategic diagnosis. Discover how the Orange Program can reposition your brand in the market.",
      form_company: "Company Name",
      form_email: "Business Email",
      form_whatsapp: "WhatsApp / Phone",
      form_challenge: "Challenge",
      form_submit: "Submit Request"
    },
    consultant: {
      button: "AI Consultant",
      title: "Tokyon Intelligence",
      welcome: "Hello. I am Tokyon's virtual consultant. How can I help elevate your brand today?",
      placeholder: "Ask about our services...",
      footer: "Powered by Gemini AI. Tokyon © 2024"
    }
  }
};