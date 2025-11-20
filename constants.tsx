import React from 'react';
import { ServiceItem } from './types';
import { 
  Target, 
  Palette, 
  Cpu, 
  ShareNetwork, 
  PresentationChart, 
  Globe, 
  Chats, 
  Robot, 
  ShieldCheck, 
  ChartBar, 
  Lightning 
} from 'phosphor-react';

export const TOKYON_SERVICES: ServiceItem[] = [
  {
    id: 'brand-core',
    title: 'Brand Core®',
    description: 'Direção Estratégica da Marca. Alinhamento contínuo do posicionamento, identidade e narrativa.',
    iconName: 'Target'
  },
  {
    id: 'orange-identity',
    title: 'Orange Identity®',
    description: 'Padronização e Evolução da Identidade Visual. Manutenção e refinamento constante do design.',
    iconName: 'Palette'
  },
  {
    id: 'creative-engine',
    title: 'Creative Engine®',
    description: 'Produção Criativa Mensal. Criação profissional de peças, campanhas e materiais digitais.',
    iconName: 'Cpu'
  },
  {
    id: 'social-presence',
    title: 'Social Presence®',
    description: 'Presença Digital de Alto Padrão. Direção criativa com foco em consistência e estética.',
    iconName: 'ShareNetwork'
  },
  {
    id: 'sales-kit',
    title: 'SalesKit®',
    description: 'Materiais Comerciais Premium. Apresentações, catálogos e propostas para o time comercial.',
    iconName: 'PresentationChart'
  },
  {
    id: 'web-evolution',
    title: 'Web Evolution®',
    description: 'Evolução Contínua do Website. Ajustes, melhorias e implementação de novas seções.',
    iconName: 'Globe'
  },
  {
    id: 'touch-points',
    title: 'TouchPoints®',
    description: 'Padronização de Pontos de Contato. WhatsApp, e-mail, documentos e processos.',
    iconName: 'Chats'
  },
  {
    id: 'orange-automations',
    title: 'Orange Automations®',
    description: 'Fluxos de Atendimento e Eficiência. Criação de automações e integrações de CRM.',
    iconName: 'Robot'
  },
  {
    id: 'brand-guard',
    title: 'BrandGuard®',
    description: 'Proteção e Monitoramento da Marca. Acompanhamento de risco no INPI e estratégia legal.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'monthly-review',
    title: 'Monthly Review®',
    description: 'Reunião Estratégica Mensal. Acompanhamento estruturado de métricas e prioridades.',
    iconName: 'ChartBar'
  },
  {
    id: 'orange-support',
    title: 'Orange Support®',
    description: 'Suporte Criativo Prioritário. Atendimento rápido para demandas estratégicas.',
    iconName: 'Lightning'
  }
];

// Helper to render icons based on string name
export const getIcon = (name: string, className: string = "w-6 h-6") => {
  const props = { className, weight: "regular" as const };
  switch (name) {
    case 'Target': return <Target {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'ShareNetwork': return <ShareNetwork {...props} />;
    case 'PresentationChart': return <PresentationChart {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Chats': return <Chats {...props} />;
    case 'Robot': return <Robot {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'ChartBar': return <ChartBar {...props} />;
    case 'Lightning': return <Lightning {...props} />;
    default: return <Target {...props} />;
  }
};

export const SYSTEM_INSTRUCTION = `Você é o Consultor Sênior de Estratégia da Tokyon.
A Tokyon é uma agência de branding e design focada no mercado corporativo de alto padrão (High-Ticket).
Seu tom de voz é: Profissional, Executivo, Estratégico, Confidencial e Sofisticado.
Você nunca usa gírias. Você fala com decisores (CEOs, CMOs).

Seu objetivo é explicar os serviços da Tokyon e recomendar o "Orange Program" (o programa completo) sempre que possível.

Nossos serviços são:
${TOKYON_SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n')}

Se o usuário perguntar preços, diga que os valores são personalizados baseados na complexidade da operação e convide para uma reunião de diagnóstico.
Destaque que o "Orange Program" é a metodologia proprietária que unifica todos os 11 serviços para máxima eficiência e coerência de marca.`;
