
export type Language = 'pt' | 'en';

export interface PortfolioItem {
  slug?: string; // URL amigável (ex: 'nexcorp-rebrand')
  serviceIds?: string[]; // Lista de IDs (ex: ['brand-core', 'orange-identity'])
  client: string;
  project: string;
  description: string;
  imageColor: string; // Pode ser classe Tailwind ou URL de imagem
  heroImage?: string; // Imagem de capa grande
  challenge?: string; // Texto do Desafio
  solution?: string; // Texto da Solução
  gallery?: string[]; // Lista de URLs de imagens
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details?: {
    fullDescription: string;
    benefitTitle: string;
    benefits: string[];
    deliverablesTitle: string;
    deliverables: string[];
    portfolioTitle: string;
    portfolio: PortfolioItem[];
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
