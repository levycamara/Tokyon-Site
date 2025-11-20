
import { PortfolioItem } from '../types';

export interface LocalPortfolioItem extends PortfolioItem {
  serviceId: string;
  language: 'pt' | 'en';
}

const getGeneric = (id: string, lang: 'pt' | 'en'): LocalPortfolioItem => ({
  serviceId: id,
  language: lang,
  client: lang === 'pt' ? 'Cliente Confidencial' : 'Confidential Client',
  project: 'Tokyon Enterprise',
  description: lang === 'pt' ? 'Projeto estratégico de alto impacto desenvolvido sob NDA.' : 'High impact strategic project developed under NDA.',
  imageColor: 'bg-white/5'
});

export const PORTFOLIO_DATA: LocalPortfolioItem[] = [
  // Brand Core Cases
  {
    serviceId: 'brand-core',
    language: 'pt',
    client: 'Alpha Invest',
    project: 'Reposicionamento',
    description: 'Redefinição estratégica para fusão de dois fundos de investimento.',
    imageColor: 'bg-gray-800'
  },
  {
    serviceId: 'brand-core',
    language: 'en',
    client: 'Alpha Invest',
    project: 'Repositioning',
    description: 'Strategic redefinition for the merger of two investment funds.',
    imageColor: 'bg-gray-800'
  },
  {
    serviceId: 'brand-core',
    language: 'pt',
    client: 'Construct',
    project: 'Naming & Core',
    description: 'Criação do zero de uma construtora de alto padrão.',
    imageColor: 'bg-tokyon-orange'
  },
  {
    serviceId: 'brand-core',
    language: 'en',
    client: 'Construct',
    project: 'Naming & Core',
    description: 'Creation from scratch of a high-end construction company.',
    imageColor: 'bg-tokyon-orange'
  },
  
  // Orange Identity
  {
    serviceId: 'orange-identity',
    language: 'pt',
    client: 'NexCorp',
    project: 'Global Rebrand',
    description: 'Aplicação estratégica de Orange Identity para expansão LATAM.',
    imageColor: 'bg-gradient-to-br from-gray-800 to-gray-900'
  },
  {
    serviceId: 'orange-identity',
    language: 'en',
    client: 'NexCorp',
    project: 'Global Rebrand',
    description: 'Strategic application of Orange Identity for LATAM expansion.',
    imageColor: 'bg-gradient-to-br from-gray-800 to-gray-900'
  },

  // Fill remaining services with generic data to ensure UI doesn't break
  ...['creative-engine', 'social-presence', 'sales-kit', 'web-evolution', 'touch-points', 'orange-automations', 'brand-guard', 'monthly-review', 'orange-support'].flatMap(id => [
      getGeneric(id, 'pt'),
      getGeneric(id, 'en'),
      { ...getGeneric(id, 'pt'), client: 'Partner Corp', imageColor: 'bg-tokyon-orange/10' },
      { ...getGeneric(id, 'en'), client: 'Partner Corp', imageColor: 'bg-tokyon-orange/10' }
  ])
];
