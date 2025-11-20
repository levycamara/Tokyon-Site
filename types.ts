export type Language = 'pt' | 'en';

export interface PortfolioItem {
  client: string;
  project: string;
  description: string;
  imageColor: string; // Using simple colors/gradients for now as placeholders
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